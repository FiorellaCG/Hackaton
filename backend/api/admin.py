from django.contrib import admin
from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, ProgramaFormacion, Aspirante, Vacante, Postulacion,
    Curriculo, Practicante, Notificacion, Auditoria
)

admin.site.register(Usuario)
admin.site.register(Persona)
admin.site.register(AreaTrabajo)
admin.site.register(Carrera)
admin.site.register(Institucion)
admin.site.register(Empresa)
admin.site.register(ProgramaFormacion)
admin.site.register(Aspirante)
admin.site.register(Vacante)
admin.site.register(Postulacion)
admin.site.register(Curriculo)
admin.site.register(Practicante)
admin.site.register(Notificacion)
admin.site.register(Auditoria)
