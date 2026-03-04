import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

email = 'nairiosfwd@gmail.com'
users = Usuario.objects.filter(correo__iexact=email).order_by('creado_en')

print(f"Total count for {email}: {users.count()}")
for u in users:
    print(f"ID={u.id}, Created={u.creado_en}, Rol={u.rol}")
