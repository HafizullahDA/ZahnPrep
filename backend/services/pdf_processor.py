import json
import base64

from google import genai
from google.genai import types
from pydantic import BaseModel, Field

from core.config import settings


class Fact(BaseModel):
    subject: str = Field(description="The central topic, entity, or concept.")
    details: str = Field(description="Detailed explanation, date, rule, or definition.")


class KnowledgeMap(BaseModel):
    facts: list[Fact] = Field(description="A comprehensive list of all facts, rules, and concepts extracted.")
    exhaustiveness_check: bool = Field(description="Set to true ONLY if you verify that you have parsed the document completely from page 1 to the final page without skipping any sections or using lazy summarization.")


def extract_text_from_document(mime_type: str, base64_string: str) -> str:
    """Uses Gemini 3 Flash for high-speed document ingestion into a Knowledge Map JSON."""
    if not settings.GEMINI_API_KEY:
        raise RuntimeError('GEMINI_API_KEY must be configured in backend/.env.')

    instruction = (
        'You are Engine A: The Bulk Processor. Your job is to read massive study notes '
        'and extract a highly-dense JSON Knowledge Map. \n'
        'CRITICAL RULE 1: DO NOT SUMMARIZE LAZILY. You MUST extract every single fact, rule, '
        'definition, and date from the ENTIRE document, from page 1 to the absolute final page.\n'
        'CRITICAL RULE 2: If the document is 50 pages, you must process all 50. Do not write "and so on".\n'
        'Ensure exhaustiveness_check is true only if you have obeyed these rules.'
    )

    file_bytes = base64.b64decode(base64_string)
    with genai.Client(api_key=settings.GEMINI_API_KEY) as client:
        response = client.models.generate_content(
            model='gemini-3-flash-preview',
            contents=[types.Part.from_bytes(data=file_bytes, mime_type=mime_type)],
            config=types.GenerateContentConfig(
                system_instruction=instruction,
                response_mime_type='application/json',
                response_schema=KnowledgeMap,
                temperature=0.1,
            ),
        )
    return response.text  # Return the raw JSON string representation of the KnowledgeMap