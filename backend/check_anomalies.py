import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

print("USUARIOS CON ESPACIOS O MAYUSCULAS:")
for u in Usuario.objects.all():
    if u.correo.strip() != u.correo or any(c.isupper() for c in u.correo):
        print(f"'{u.correo}'")
