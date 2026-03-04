import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

u = Usuario.objects.filter(correo__iexact='nairiosfwd@gmail.com').first()
if u:
    print(f"User found: {u.correo}")
    print(f"Hash: {u.contrasena_hash}")
    print(f"Length: {len(u.contrasena_hash)}")
else:
    print("User not found")
