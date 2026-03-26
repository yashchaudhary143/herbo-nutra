#!/usr/bin/env bash
set -euo pipefail

if [[ -f .env ]]; then
  set -a
  source .env
  set +a
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
OUTPUT_DIR="${BACKUP_DIR:-./backups/uploads}"
mkdir -p "$OUTPUT_DIR"

docker compose exec -T backend \
  tar -czf - -C /var/www/herbo-nutra/uploads . > "${OUTPUT_DIR}/herbo-uploads-${STAMP}.tar.gz"

echo "Uploads backup written to ${OUTPUT_DIR}/herbo-uploads-${STAMP}.tar.gz"
