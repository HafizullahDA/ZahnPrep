from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "ZahnPrep AI Backend"
    API_V1_STR: str = "/api/v1"

    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""
    GEMINI_API_KEY: str = ""

    BACKEND_CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
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
    MAX_UPLOAD_SIZE_BYTES: int = 30 * 1024 * 1024
    MAX_TEXT_CONTEXT_CHARS: int = 50_000
    MAX_EXTRACTED_CONTEXT_CHARS: int = 120_000

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()