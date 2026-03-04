import os
import django
import uuid
from django.contrib.auth.hashers import make_password

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from api.models import Usuario, Empresa, Vacante, AreaTrabajo

# Create default AreaTrabajo if they don't exist
areas = [
    {'nombre': 'Manufactura Electrónica', 'slug': 'manufactura-electronica'},
    {'nombre': 'Dispositivos Médicos', 'slug': 'dispositivos-medicos'},
    {'nombre': 'Servicios Shelter', 'slug': 'servicios-shelter'},
    {'nombre': 'Automatización Industrial', 'slug': 'automatizacion-industrial'},
]

area_objs = {}
for a in areas:
    obj, _ = AreaTrabajo.objects.get_or_create(nombre=a['nombre'], defaults={'slug': a['slug']})
    area_objs[a['nombre']] = obj

companies_data = [
    {
        "nombre": "Zollner Elektronik AG",
        "descripcion": "Empresa alemana líder en servicios de manufactura electrónica (EMS) y soluciones de ingeniería de alta tecnología.",
        "datos_globales": "Una de las compañías EMS más grandes de Europa, con presencia internacional y múltiples plantas de producción.",
        "servicios_cr": "Manufactura electrónica avanzada y ensamblaje de componentes tecnológicos.",
        "nombre_contacto": "Contacto Zollner",
        "correo_contacto": "hr@zollner.com",
        "url_externa": "https://www.zollner-electronics.com/",
        "area": "Manufactura Electrónica"
    },
    {
        "nombre": "Edwards Lifesciences",
        "descripcion": "Empresa global especializada en dispositivos médicos para el tratamiento de enfermedades cardíacas estructurales.",
        "datos_globales": "Multinacional estadounidense con operaciones en América, Europa y Asia.",
        "servicios_cr": "Manufactura y ensamblaje de dispositivos médicos de alta precisión.",
        "nombre_contacto": "Contacto Edwards",
        "correo_contacto": "recruiting@edwards.com",
        "url_externa": "https://www.edwards.com",
        "area": "Dispositivos Médicos"
    },
    {
        "nombre": "Itek Solutions",
        "descripcion": "Empresa costarricense que ofrece servicios tipo “shelter” y manufactura asistida para compañías extranjeras.",
        "datos_globales": "Especializada en soluciones integrales de manufactura y distribución.",
        "servicios_cr": "Co-ubicación industrial, soporte operativo y manufactura tercerizada.",
        "nombre_contacto": "Contacto Itek",
        "correo_contacto": "info@itek.cr",
        "url_externa": "",
        "area": "Servicios Shelter"
    },
    {
        "nombre": "Coloplast",
        "descripcion": "Multinacional danesa dedicada a productos médicos para ostomía, continencia y cuidado de heridas.",
        "datos_globales": "Presencia en más de 40 países.",
        "servicios_cr": "Manufactura y exportación de dispositivos médicos especializados.",
        "nombre_contacto": "Contacto Coloplast",
        "correo_contacto": "jobs@coloplast.com",
        "url_externa": "https://www.coloplast.com",
        "area": "Dispositivos Médicos"
    },
    {
        "nombre": "Matthews Brand Solutions",
        "descripcion": "Empresa especializada en soluciones de automatización industrial, marcado y codificación.",
        "datos_globales": "Opera a nivel global ofreciendo tecnología industrial avanzada.",
        "servicios_cr": "Manufactura de soluciones de automatización y exportación de equipos industriales.",
        "nombre_contacto": "Contacto Matthews",
        "correo_contacto": "careers@matthews.com",
        "url_externa": "https://www.matthewsbrands.com",
        "area": "Automatización Industrial"
    },
    {
        "nombre": "Heraeus Medical Components",
        "descripcion": "Empresa especializada en diseño y manufactura de componentes para dispositivos médicos.",
        "datos_globales": "Parte del grupo tecnológico alemán Heraeus, con presencia internacional.",
        "servicios_cr": "Producción de electrodos, cables guía y componentes médicos de precisión.",
        "nombre_contacto": "Contacto Heraeus",
        "correo_contacto": "hr@heraeus.com",
        "url_externa": "https://www.heraeus-medical.com",
        "area": "Dispositivos Médicos"
    },
    {
        "nombre": "Align Technology",
        "descripcion": "Empresa global de tecnología médica reconocida por los alineadores dentales Invisalign.",
        "datos_globales": "Líder mundial en ortodoncia digital personalizada.",
        "servicios_cr": "Manufactura y procesamiento digital de alineadores dentales.",
        "nombre_contacto": "Contacto Align",
        "correo_contacto": "talent@aligntech.com",
        "url_externa": "https://www.aligntech.com",
        "area": "Dispositivos Médicos"
    },
    {
        "nombre": "Nextern",
        "descripcion": "Empresa especializada en diseño y manufactura de dispositivos médicos complejos.",
        "datos_globales": "Compañía internacional enfocada en ingeniería de productos médicos avanzados.",
        "servicios_cr": "Desarrollo y producción de dispositivos médicos de alta tecnología.",
        "nombre_contacto": "Gustavo Quesada (Gerente General CR)",
        "correo_contacto": "HRCR@nextern.com",
        "url_externa": "http://nextern.com/",
        "area": "Dispositivos Médicos"
    }
]

for data in companies_data:
    email = data["correo_contacto"]
    if not email or email == "No disponible públicamente":
        email = f"contact@{data['nombre'].split(' ')[0].lower()}.com"
    
    user, created = Usuario.objects.get_or_create(
        correo=email,
        defaults={
            'contrasena_hash': make_password('Pass123!'),
            'rol': 'empresa',
            'telefono': '00000000',
            'activo': True
        }
    )
    
    empresa, created = Empresa.objects.get_or_create(
        usuario=user,
        defaults={
            'nombre': data['nombre'],
            'descripcion': data['descripcion'],
            'datos_globales': data['datos_globales'],
            'servicios_cr': data['servicios_cr'],
            'nombre_contacto': data['nombre_contacto'],
            'correo_contacto': email,
            'url_externa': data['url_externa'],
            'gestiona_en_plataforma': True,
            'activa': True
        }
    )
    
    if created:
        # Create test vacancies
        Vacante.objects.create(
            empresa=empresa,
            area_trabajo=area_objs[data['area']],
            titulo=f"Operario de Manufactura - {data['nombre']}",
            descripcion=f"Buscamos operarios para nuestra planta de {data['nombre']}. Requerimos precisión y compromiso.",
            nivel_educativo="secundaria",
            tipo_vacante="Tiempo completo",
            url_externa=data["url_externa"]
        )
        
        Vacante.objects.create(
            empresa=empresa,
            area_trabajo=area_objs[data['area']],
            titulo=f"Técnico Especializado - {data['nombre']}",
            descripcion=f"Oportunidad para técnicos con experiencia en {data['area']}.",
            nivel_educativo="tecnico",
            tipo_vacante="Tiempo completo",
            url_externa=data["url_externa"]
        )

print("Empresas y vacantes importadas exitosamente.")
