# ZahnPrep Platform

ZahnPrep is a two-part application:

- `frontend/`: Next.js app for signup, login, dashboard uploads, and revision flows
- `backend/`: FastAPI app for authenticated MCQ generation and credit handling

## Development

### Frontend

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

Required frontend environment variables:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
python run_server.py
```

Required backend environment variables:

- `ENVIRONMENT`
- `SUPABASE_URL`
- `SUPABASE_KEY`
- `GEMINI_API_KEY`
- `BACKEND_CORS_ORIGINS` as a JSON array, for example `["https://app.example.com"]`

## Production

### Frontend release commands

```bash
cd frontend
npm ci
npm run build
npm run start
```

### Backend release commands

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000
```

## CI Baseline

GitHub Actions in `.github/workflows/ci.yml` now runs:

- frontend `npm ci`
- frontend lint
- frontend production build
- backend dependency install
- backend import smoke test
- backend `/health` smoke test

This creates a minimum release gate so broken installs, missing runtime imports, and frontend build regressions fail before deployment.
