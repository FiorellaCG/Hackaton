import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

print("USUARIOS EN LA BASE DE DATOS:")
for u in Usuario.objects.all():
    print(f"ID: {u.id}, Correo: {u.correo}, Rol: {u.rol}")
