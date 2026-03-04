import os
import django
from django.contrib.auth.hashers import check_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

email = 'nairiosfwd@gmail.com'
passwords = ['2345', '23456789', '1234', 'admin123']

users = Usuario.objects.filter(correo__iexact=email)

for u in users:
    print(f"--- User ID: {u.id} ---")
    for p in passwords:
        match = check_password(p, u.contrasena_hash)
        print(f"Password '{p}' match: {match}")
