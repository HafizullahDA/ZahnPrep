import json
import base64

from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from core.config import settings


class OCRResult(BaseModel):
    markdown_content: str = Field(description="The heavily structured extracted text.")


def _get_client() -> genai.Client:
    if not settings.GEMINI_API_KEY:
        raise RuntimeError('GEMINI_API_KEY must be configured in backend/.env.')

    return genai.Client(api_key=settings.GEMINI_API_KEY)


def extract_text_from_document(mime_type: str, base64_string: str) -> str:
    """Uses Gemini 1.5 Flash for high-speed document OCR ingestion into pure Markdown."""
    instruction = (
        'You are an expert Data Extraction Engine. Extract ALL textual and tabular '
        'information perfectly. Output the raw structured Markdown.'
    )

    file_bytes = base64.b64decode(base64_string)
    response = _get_client().models.generate_content(
        model='gemini-1.5-flash',
        contents=[types.Part.from_bytes(data=file_bytes, mime_type=mime_type)],
        config=types.GenerateContentConfig(
            system_instruction=instruction,
            response_mime_type='application/json',
            response_schema=OCRResult,
        ),
    )
    result = json.loads(response.text)
    return result.get('markdown_content', '')