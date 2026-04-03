import json

from google import genai
from google.genai import types

from core.config import settings
from core.prompt_manager import get_system_instruction
from models.schemas import GeneratedAssessment


def generate_mcqs(exam_paper_type: str, context_text: str, mcq_count: int) -> dict:
    """Passes the strict Master Prompt constraints to Gemini 1.5 Pro to enforce exam logic."""
    if not settings.GEMINI_API_KEY:
        raise RuntimeError('GEMINI_API_KEY must be configured in backend/.env.')

    system_instruction = get_system_instruction(exam_paper_type, mcq_count)

    with genai.Client(api_key=settings.GEMINI_API_KEY) as client:
        response = client.models.generate_content(
            model='gemini-2.5-pro',
            contents=context_text,
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                response_mime_type='application/json',
                response_schema=GeneratedAssessment,
                temperature=0.2,
            ),
        )
    return json.loads(response.text)