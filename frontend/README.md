ZahnPrep frontend for authentication, dashboard uploads, and practice flows.

## Development

Install dependencies and start the app:

```bash
npm ci
npm run dev
```

The frontend expects:

- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Copy `frontend/.env.example` to `frontend/.env.local` and fill in the values for your environment.

## Production

Build and run:

```bash
npm ci
npm run build
npm run start
```

Use `npm ci` in CI and deployments so installs match `package-lock.json`.

See the repository root `README.md` for the full-stack production setup.
