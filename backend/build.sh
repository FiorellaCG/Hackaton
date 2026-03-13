#!/usr/bin/env bash
# exit on error
set -o errexit

# Navegar a la carpeta donde está el script (backend)
cd "$(dirname "$0")"

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Installing frontend dependencies..."
cd ../frontend
npm install

echo "Building frontend..."
npm run build

echo "Regresando al backend..."
cd ../backend

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput
