from typing import Literal

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", case_sensitive=True)

    PROJECT_NAME: str = "ZahnPrep AI Backend"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: Literal["development", "staging", "production"] = "development"

    SUPABASE_URL: str
    SUPABASE_KEY: str
    GEMINI_API_KEY: str

    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://zahnprep.com",
        "https://www.zahnprep.com",
    ]

    SUPPORTED_EXAM_TYPES: list[str] = [
        "UPSC_GS_PAPER_1",
        "UPSC_CSAT_PAPER_2",
        "JKPSC_GS_PAPER_1",
        "JKPSC_CSAT_PAPER_2",
        "SSC_CGL_TIER_2", 
        "JKPSC",
    ]
    ALLOWED_DOCUMENT_MIME_TYPES: list[str] = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/webp",
    ]

    MIN_MCQ_COUNT: int = 1
    MAX_MCQ_COUNT: int = 20
    CREDITS_PER_MCQ: int = 15
    FREE_STARTER_MCQ_COUNT: int = 30
    FREE_STARTER_CREDITS: int = 450
    MAX_UPLOAD_SIZE_BYTES: int = 30 * 1024 * 1024
    MAX_TEXT_CONTEXT_CHARS: int = 50_000
    MAX_EXTRACTED_CONTEXT_CHARS: int = 120_000

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value: str | list[str]) -> list[str]:
        if isinstance(value, str):
            return [origin.strip() for origin in value.split(",") if origin.strip()]
        return value

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == "production"


settings = Settings()
