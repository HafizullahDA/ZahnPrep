from fastapi import APIRouter, HTTPException, UploadFile, File, Form
import base64
from typing import Optional

from models.schemas import GeneratedAssessment
from services.pdf_processor import extract_text_from_document
from services.assessment_engine import generate_mcqs

router = APIRouter()

@router.post("/generate", response_model=GeneratedAssessment)
async def generate_assessment(
    exam_paper_type: str = Form(...),
    mcq_count: int = Form(10),
    file: Optional[UploadFile] = File(None),
    text_context: Optional[str] = Form(None)
):
    """
    Core dual-phase pipeline:
    1. OCR Ingestion (Gemini Flash)
    2. Deep Constraint Generation (Gemini Pro)
    """
    if not file and not text_context:
        raise HTTPException(status_code=400, detail="Must provide either a File or text context.")

    extracted_markdown = ""
    
    # Phase 1: Ingestion
    if file:
        file_bytes = await file.read()
        b64_str = base64.b64encode(file_bytes).decode('utf-8')
        try:
            extracted_markdown = extract_text_from_document(file.content_type, b64_str)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"OCR Exception: {str(e)}")
            
    if text_context:
        extracted_markdown += f"\n{text_context}"

    if not extracted_markdown.strip():
         raise HTTPException(status_code=400, detail="No extractable text found.")

    # Phase 2: Generation via Master Prompts
    try:
        mcqs_json = generate_mcqs(exam_paper_type, extracted_markdown, mcq_count)
        return mcqs_json
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Generation Exception: {str(e)}")
