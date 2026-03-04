import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

email_to_check = 'nairiosfwd@gmail.com'
user = Usuario.objects.filter(correo__iexact=email_to_check).first()

if user:
    print(f"User FOUND: ID={user.id}, Email='{user.correo}', Rol={user.rol}, Activo={user.activo}")
else:
    print(f"User NOT FOUND: '{email_to_check}'")

print("\nAll distinct emails in DB:")
for u in Usuario.objects.values_list('correo', flat=True).distinct():
    print(f"'{u}'")
