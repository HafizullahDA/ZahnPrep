from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routes import router as api_router
from core.config import settings
from core.supabase_security import get_supabase_client

get_supabase_client()

app = FastAPI(title=settings.PROJECT_NAME, version='1.0.0')

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.BACKEND_CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get('/')
def read_root():
    return {'status': 'ok', 'message': f'{settings.PROJECT_NAME} API is active.'}


@app.get('/health')
def health_check():
    return {'status': 'healthy'}