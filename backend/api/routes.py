from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
import base64
from typing import Optional

from core.config import settings
from core.supabase_security import deduct_credits, get_user_credit_balance, verify_supabase_user
from models.schemas import GeneratedAssessment
from services.assessment_engine import generate_mcqs
from services.pdf_processor import extract_text_from_document

router = APIRouter()


def _validate_generation_request(
    exam_paper_type: str,
    mcq_count: int,
    file: Optional[UploadFile],
    text_context: Optional[str],
) -> str:
    if exam_paper_type not in settings.SUPPORTED_EXAM_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unsupported exam type.',
        )

    if not settings.MIN_MCQ_COUNT <= mcq_count <= settings.MAX_MCQ_COUNT:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f'mcq_count must be between {settings.MIN_MCQ_COUNT} and {settings.MAX_MCQ_COUNT}.',
        )

    normalized_text = (text_context or '').strip()
    if normalized_text and len(normalized_text) > settings.MAX_TEXT_CONTEXT_CHARS:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail='Pasted notes exceed the maximum allowed size.',
        )

    if file and file.content_type not in settings.ALLOWED_DOCUMENT_MIME_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Unsupported file type.',
        )

    if not file and not normalized_text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Must provide either a file or text context.',
        )

    return normalized_text


def _validate_generated_assessment(payload: dict, expected_question_count: int) -> GeneratedAssessment:
    assessment = GeneratedAssessment.model_validate(payload)

    if len(assessment.questions) != expected_question_count:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail='The AI response did not contain the expected number of questions.',
        )

    for question in assessment.questions:
        if len(question.options) != 4:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail='The AI response contained a malformed question option set.',
            )
        if question.correct_answer_index < 0 or question.correct_answer_index >= len(question.options):
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail='The AI response contained an invalid correct answer index.',
            )

    return assessment


@router.post('/generate', response_model=GeneratedAssessment)
async def generate_assessment(
    exam_paper_type: str = Form(...),
    mcq_count: int = Form(10),
    file: Optional[UploadFile] = File(None),
    text_context: Optional[str] = Form(None),
    user=Depends(verify_supabase_user),
):
    normalized_text = _validate_generation_request(exam_paper_type, mcq_count, file, text_context)

    user_id = user.id
    balance = await get_user_credit_balance(user_id)
    credits_needed = mcq_count * 15

    if balance < credits_needed:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f'Insufficient credits. You have {balance}, need {credits_needed}.',
        )

    extracted_markdown = ''

    if file:
        file_bytes = await file.read()
        if len(file_bytes) > settings.MAX_UPLOAD_SIZE_BYTES:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail='Uploaded file exceeds the maximum allowed size.',
            )

        b64_str = base64.b64encode(file_bytes).decode('utf-8')
        try:
            extracted_markdown = extract_text_from_document(file.content_type or '', b64_str)
        except HTTPException:
            raise
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail='Document extraction failed.',
            ) from exc

    if normalized_text:
        extracted_markdown += f'\n{normalized_text}'

    extracted_markdown = extracted_markdown.strip()
    if not extracted_markdown:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='No extractable text found.',
        )

    if len(extracted_markdown) > settings.MAX_EXTRACTED_CONTEXT_CHARS:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail='The extracted study material is too large. Please upload a smaller document or shorter notes.',
        )

    try:
        mcqs_json = generate_mcqs(exam_paper_type, extracted_markdown, mcq_count)
        validated_assessment = _validate_generated_assessment(mcqs_json, mcq_count)
        await deduct_credits(user_id, credits_needed, 'mcq_generation')
        return validated_assessment
    except HTTPException:
        raise
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Question generation failed.',
        ) from exc