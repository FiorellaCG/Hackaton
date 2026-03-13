from django.core.management.base import BaseCommand
from api.models import Usuario, Empresa, Institucion, AreaTrabajo
from django.contrib.auth.hashers import make_password

class Command(BaseCommand):
    help = 'Popula la base de datos con datos iniciales para demostración'

    def handle(self, *args, **kwargs):
        self.stdout.write("Iniciando población de datos...")

        # 1. Crear Áreas de Trabajo
        areas = ["Tecnología", "Administración", "Medicina", "Ingeniería", "Servicio al Cliente"]
        for nombre in areas:
            AreaTrabajo.objects.get_or_create(nombre=nombre)

        # 2. Crear Admin
        admin_correo = "admin@gmail.com"
        if not Usuario.objects.filter(correo=admin_correo).exists():
            Usuario.objects.create(
                correo=admin_correo,
                contrasena_hash=make_password("admin123"),
                password_plano="admin123",
                rol="admin",
                activo=True
            )
            self.stdout.write(f"Usuario admin creado: {admin_correo}")

        # 3. Datos de Empresas para demostración
        empresas_data = [
            {"nombre": "Edwards Lifesciences", "correo": "edwards@test.com", "contacto": "Recruitment Team"},
            {"nombre": "Moog Medical", "correo": "moog@test.com", "contacto": "HR Moog"},
            {"nombre": "Abbott", "correo": "abbott@test.com", "contacto": "Talent Acq"},
            {"nombre": "Bridgestone", "correo": "bridgestone@test.com", "contacto": "Sourcing Dept"},
        ]

        for data in empresas_data:
            user, created = Usuario.objects.get_or_create(
                correo=data["correo"],
                defaults={
                    "contrasena_hash": make_password("empresa123"),
                    "password_plano": "empresa123",
                    "rol": "empresa",
                    "activo": True
                }
            )
            if created:
                Empresa.objects.get_or_create(
                    usuario=user,
                    defaults={
                        "nombre": data["nombre"],
                        "nombre_contacto": data["contacto"],
                        "correo_contacto": data["correo"],
                        "descripcion": f"Perfil oficial de {data['nombre']} para GreenTalent."
                    }
                )
                self.stdout.write(f"Empresa creada: {data['nombre']}")

        # 4. Crear Institución de prueba
        inst_correo = "institucion@greentalent.com"
        user_inst, created = Usuario.objects.get_or_create(
            correo=inst_correo,
            defaults={
                "contrasena_hash": make_password("inst123"),
                "password_plano": "inst123",
                "rol": "institucion",
                "activo": True
            }
        )
        if created:
            Institucion.objects.get_or_create(
                usuario=user_inst,
                defaults={
                    "nombre": "ZFL La Lima Academy",
                    "nombre_contacto": "Admin Academia",
                    "correo_contacto": inst_correo,
                    "tipo": "educativa"
                }
            )
            self.stdout.write("Institución creada.")

        self.stdout.write(self.style.SUCCESS("Datos de demostración cargados exitosamente."))
