import logging
from functools import lru_cache

logger = logging.getLogger(__name__)

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


async def ensure_user_profile(user_id: str, email: str | None) -> dict:
    try:
        existing = (
            get_supabase_client()
            .table('profiles')
            .select('id, email, free_mcqs_remaining')
            .eq('id', user_id)
            .limit(1)
            .execute()
        )

        if existing.data:
            return existing.data[0]

        if not email:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail='User email is missing, so the profile could not be created.',
            )

        created = (
            get_supabase_client()
            .table('profiles')
            .insert({'id': user_id, 'email': email})
            .execute()
        )

        if created.data:
            return created.data[0]

        reloaded = (
            get_supabase_client()
            .table('profiles')
            .select('id, email, free_mcqs_remaining')
            .eq('id', user_id)
            .single()
            .execute()
        )
        if not reloaded.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail='Profile could not be created.',
            )
        return reloaded.data
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception('ensure_user_profile failed for user_id=%s', user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'Profile lookup failed: {exc}',
        ) from exc


async def get_user_profile(user_id: str) -> dict:
    try:
        result = (
            get_supabase_client()
            .table('profiles')
            .select('id, email, free_mcqs_remaining')
            .eq('id', user_id)
            .single()
            .execute()
        )
        if not result.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail='User profile not found.',
            )
        return result.data
    except HTTPException:
        raise
    except Exception as exc:
        logger.exception('get_user_profile failed for user_id=%s', user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'Profile lookup failed: {exc}',
        ) from exc


async def get_free_mcqs_remaining(user_id: str) -> int:
    profile = await get_user_profile(user_id)
    return max(int(profile.get('free_mcqs_remaining') or 0), 0)


async def consume_free_mcqs(user_id: str, amount: int) -> None:
    if amount <= 0:
        return

    profile = await get_user_profile(user_id)
    remaining = max(int(profile.get('free_mcqs_remaining') or 0), 0)

    if remaining < amount:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail='Not enough free MCQs remaining.',
        )

    try:
        get_supabase_client().table('profiles').update(
            {'free_mcqs_remaining': remaining - amount}
        ).eq('id', user_id).execute()
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail='Free MCQ usage update failed.',
        ) from exc


async def get_user_credit_balance(user_id: str) -> int:
    try:
        result = get_supabase_client().rpc(
            'get_user_credit_balance',
            {'target_user_id': user_id},
        ).execute()
        return int(result.data or 0)
    except Exception as exc:
        logger.exception('get_user_credit_balance failed for user_id=%s', user_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'Credit lookup failed: {exc}',
        ) from exc


async def deduct_credits(user_id: str, amount: int, transaction_type: str) -> None:
    if amount <= 0:
        return

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