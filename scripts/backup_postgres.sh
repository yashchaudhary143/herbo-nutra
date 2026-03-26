#!/usr/bin/env bash
set -euo pipefail

if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
OUTPUT_DIR="${BACKUP_DIR:-./backups/postgres}"
mkdir -p "$OUTPUT_DIR"

docker compose exec -T postgres pg_dump -U "${POSTGRES_USER}" "${POSTGRES_DB}" > "${OUTPUT_DIR}/herbo-postgres-${STAMP}.sql"

echo "Postgres backup written to ${OUTPUT_DIR}/herbo-postgres-${STAMP}.sql"
