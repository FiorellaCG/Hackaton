import os
import django
from django.contrib.auth.hashers import check_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

email = 'nairiosfwd@gmail.com'
user = Usuario.objects.filter(correo__iexact=email).first()

if user:
    passwords_to_try = [
        '2345',
        '23456789',
        '1234',
        'admin123',
        'Pass123!',
    ]
    for p in passwords_to_try:
        match = check_password(p, user.contrasena_hash)
        print(f"Password '{p}' match: {match}")
else:
    print("User not found")
