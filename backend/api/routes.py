from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
import base64
from typing import Optional

from core.supabase_security import deduct_credits, get_user_credit_balance, verify_supabase_user
from models.schemas import GeneratedAssessment
from services.assessment_engine import generate_mcqs
from services.pdf_processor import extract_text_from_document

router = APIRouter()


@router.post('/generate', response_model=GeneratedAssessment)
async def generate_assessment(
    exam_paper_type: str = Form(...),
    mcq_count: int = Form(10),
    file: Optional[UploadFile] = File(None),
    text_context: Optional[str] = Form(None),
    user=Depends(verify_supabase_user),
):
    user_id = user.id
    balance = await get_user_credit_balance(user_id)
    credits_needed = mcq_count * 15

    if balance < credits_needed:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail=f'Insufficient credits. You have {balance}, need {credits_needed}.',
        )

    if not file and not text_context:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Must provide either a file or text context.',
        )

    extracted_markdown = ''

    if file:
        file_bytes = await file.read()
        b64_str = base64.b64encode(file_bytes).decode('utf-8')
        try:
            extracted_markdown = extract_text_from_document(file.content_type, b64_str)
        except Exception as exc:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail='Document extraction failed.',
            ) from exc

    if text_context:
        extracted_markdown += f'\n{text_context}'

    if not extracted_markdown.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='No extractable text found.',
        )

    try:
        mcqs_json = generate_mcqs(exam_paper_type, extracted_markdown, mcq_count)
        await deduct_credits(user_id, credits_needed, 'mcq_generation')
        return mcqs_json
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Question generation failed.',
        ) from exc