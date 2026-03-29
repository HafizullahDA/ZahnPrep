import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "ZahnPrep AI Backend"
    API_V1_STR: str = "/api/v1"
    
    # Supabase (Database and Auth)
    SUPABASE_URL: str = os.getenv("SUPABASE_URL", "")
    SUPABASE_KEY: str = os.getenv("SUPABASE_KEY", "")
    
    # Google Gemini AI Keys
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
