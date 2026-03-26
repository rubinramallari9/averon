#!/bin/bash
set -e

echo "Running database migrations..."
python manage.py migrate --no-input

echo "Starting gunicorn on port ${PORT:-8080}..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:${PORT:-8080} \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -
