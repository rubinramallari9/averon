#!/bin/bash

echo "Starting Django Backend..."
cd "$(dirname "$0")/averon_backend"
source venv/bin/activate
python manage.py runserver
