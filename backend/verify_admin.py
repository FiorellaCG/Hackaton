import os
import django
from django.contrib.auth.hashers import check_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

u = Usuario.objects.filter(correo='admin@gmail.com').first()
if u:
    match = check_password('admin123', u.contrasena_hash)
    print(f"Password 'admin123' for 'admin@gmail.com' matches: {match}")
else:
    print("User 'admin@gmail.com' not found.")
