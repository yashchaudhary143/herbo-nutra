# Herbo Nutra Extract Website

Next.js + FastAPI implementation of the Herbo Nutra Extract B2B website.

## Stack
- Frontend: Next.js 16 App Router, TypeScript, Tailwind CSS 4, Vitest
- Backend: FastAPI, SQLAlchemy 2, Alembic, PostgreSQL, JWT cookie auth
- Deployment: Docker Compose with `frontend`, `backend`, `postgres`, and `nginx`

## Local Development
1. Copy `.env.example` to `.env` and fill the secrets/integration values.
2. Backend:
   - `python3.11 -m venv .venv311`
   - `./.venv311/bin/pip install -e './backend[dev]'`
   - `cd backend && ../.venv311/bin/uvicorn app.main:app --reload`
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm run dev`

The frontend proxies `/api/*` to `http://127.0.0.1:8000` by default.

## Validation
- Backend tests: `./.venv311/bin/pytest backend/tests`
- Frontend lint: `cd frontend && npm run lint`
- Frontend tests: `cd frontend && npm test`
- Frontend production build: `cd frontend && npm run build`

## Deployment
- Copy `.env.example` to `.env` on the EC2 host.
- Run `cd backend && alembic upgrade head` before starting or updating the stack.
- Build and start the stack with `docker compose up -d --build`.
- Keep `AUTO_CREATE_TABLES=false` in production so schema changes only flow through Alembic migrations.
- Configure SMTP before launch:
  - Required: `SMTP_HOST`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, `INQUIRY_NOTIFICATION_EMAIL`
  - `INQUIRY_NOTIFICATION_EMAIL` accepts multiple internal recipients separated by commas, semicolons, or new lines. The backend sends separate email copies so recipients do not see each other.
- Put SSL in front of nginx or terminate TLS directly with your preferred reverse proxy/Caddy/Nginx host config.
- Use `scripts/backup_postgres.sh` and `scripts/backup_uploads.sh` from cron/systemd timers for backups.

## Admin Bootstrap
- Default admin creation happens on backend startup using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- You can also run `PYTHONPATH=backend ./.venv311/bin/python scripts/bootstrap_admin.py`.
