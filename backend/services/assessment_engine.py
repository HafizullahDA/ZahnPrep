import json
from google import genai
from google.genai import types
from pydantic import BaseModel, Field
from core.config import settings
from core.prompt_manager import get_system_instruction
from models.schemas import GeneratedAssessment

client = genai.Client(api_key=settings.GEMINI_API_KEY)

def generate_mcqs(exam_paper_type: str, context_text: str, mcq_count: int) -> dict:
    """Passes the strict Master Prompt constraints to Gemini 1.5 Pro to enforce exam logic."""
    system_instruction = get_system_instruction(exam_paper_type, mcq_count)
    
    response = client.models.generate_content(
        model='gemini-1.5-pro',
        contents=context_text,
        config=types.GenerateContentConfig(
            system_instruction=system_instruction,
            response_mime_type="application/json",
            response_schema=GeneratedAssessment,
            temperature=0.2, # Low temp enforces strict grounding to the user context
        )
    )
    # The response is validated by Pydantic mathematically via the SDK.
    return json.loads(response.text)
