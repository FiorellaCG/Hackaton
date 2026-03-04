import os
import django
from django.contrib.auth.hashers import make_password, is_password_usable

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

print("Fixing existing plain-text passwords...")
users = Usuario.objects.all()
fixed_count = 0

for u in users:
    # Si la contraseña no parece un hash de Django (normalmente empieza con pbkdf2_sha256$ o similar)
    if not (u.contrasena_hash.startswith('pbkdf2_sha256$') or 
            u.contrasena_hash.startswith('argon2$') or 
            u.contrasena_hash.startswith('bcrypt_sha256$') or
            u.contrasena_hash.startswith('scrypt$')):
        
        print(f"Hashing password for {u.correo} (was plain text)")
        u.contrasena_hash = make_password(u.contrasena_hash)
        u.save()
        fixed_count += 1

print(f"Fixed {fixed_count} users.")
