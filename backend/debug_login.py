import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario
from django.contrib.auth.hashers import check_password

try:
    user = Usuario.objects.get(correo='institucion@test.com')
    print(f"User found: {user.correo}")
    print(f"Password check for '1234': {check_password('1234', user.contrasena_hash)}")
except Usuario.DoesNotExist:
    print("User not found: institucion@test.com")
except Exception as e:
    print(f"Error: {e}")
