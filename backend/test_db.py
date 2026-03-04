import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario

with open('output_utf8.txt', 'w', encoding='utf-8') as f:
    for u in Usuario.objects.all():
        f.write(f"User: {u.correo}, rol: {u.rol}\n")
        try:
            if hasattr(u, 'persona'):
                f.write(f"  Persona: {u.persona.nombre} {u.persona.apellidos}\n")
            else:
                f.write("  No Persona\n")
            
            if hasattr(u, 'aspirante'):
                f.write(f"  Aspirante: {u.aspirante.id}\n")
                f.write(f"  Carrera: {u.aspirante.carrera_id}\n")
                f.write(f"  Habilidades_tecnicas: {u.aspirante.habilidades_tecnicas}\n")
            else:
                f.write("  No Aspirante\n")
        except Exception as e:
            f.write(f"  Error accessing persona/aspirante: {e}\n")
