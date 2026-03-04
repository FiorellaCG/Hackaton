import os
import django
from django.contrib.auth.hashers import make_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

email = 'nairiosfwd@gmail.com'
user = Usuario.objects.filter(correo__iexact=email).first()

if user:
    new_password = '2345'
    user.contrasena_hash = make_password(new_password)
    user.save()
    print(f"Password for {email} reset to '{new_password}'")
else:
    print(f"User {email} not found")
