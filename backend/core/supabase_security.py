from functools import lru_cache

from fastapi import HTTPException, Security, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from supabase import Client, create_client

from core.config import settings

security = HTTPBearer(auto_error=False)


@lru_cache(maxsize=1)
def get_supabase_client() -> Client:
    if not settings.SUPABASE_URL or not settings.SUPABASE_KEY:
        raise RuntimeError('SUPABASE_URL and SUPABASE_KEY must be configured in backend/.env.')

    return create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)


async def verify_supabase_user(
    credentials: HTTPAuthorizationCredentials = Security(security),
):
    if credentials is None or not credentials.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Missing bearer token.',
        )

    try:
        user_response = get_supabase_client().auth.get_user(credentials.credentials)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token.',
        ) from exc

    if not user_response.user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid or expired token.',
        )

    return user_response.user


async def get_user_credit_balance(user_id: str) -> int:
    try:
        result = get_supabase_client().rpc(
            'get_user_credit_balance',
            {'target_user_id': user_id},
        ).execute()
        return int(result.data or 0)
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Credit lookup failed.',
        ) from exc


async def deduct_credits(user_id: str, amount: int, transaction_type: str) -> None:
    try:
        get_supabase_client().table('credit_transactions').insert(
            {
                'user_id': user_id,
                'amount': -amount,
                'transaction_type': transaction_type,
                'description': f'MCQ generation - {amount} credits used',
            }
        ).execute()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Credit deduction failed.',
        ) from exc