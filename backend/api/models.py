from django.db import models
import uuid


class Usuario(models.Model):
    ROL_CHOICES = [('admin', 'Admin'), ('empresa', 'Empresa'), ('aspirante', 'Aspirante')]
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    correo = models.CharField(max_length=255)
    telefono = models.CharField(max_length=20)
    contrasena_hash = models.CharField(max_length=255)
    google_id = models.CharField(max_length=255, null=True, blank=True)
    rol = models.CharField(max_length=20, choices=ROL_CHOICES)
    activo = models.BooleanField(default=True)
    consentimiento = models.BooleanField(default=False)
    fecha_consentimiento = models.DateTimeField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)
    preferencias = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'usuarios'

class Persona(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    cedula = models.CharField(max_length=20)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    genero = models.CharField(max_length=20)
    nacionalidad = models.CharField(max_length=80)
    telefono = models.CharField(max_length=80)
    telefono_alterno = models.CharField(max_length=20, null=True, blank=True)
    provincia = models.CharField(max_length=100)
    canton = models.CharField(max_length=100)
    foto_url = models.CharField(max_length=500, null=True, blank=True)
    qr_url = models.CharField(max_length=500, null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'personas'

class AreaTrabajo(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    nombre = models.CharField(max_length=100)
    slug = models.CharField(max_length=100)

    class Meta:
        db_table = 'areas_trabajo'

class Carrera(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    nombre = models.CharField(max_length=150)

    class Meta:
        db_table = 'carreras'

class Institucion(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    titulo = models.CharField(max_length=150)
    tipo = models.CharField(max_length=50)
    nombre_contacto = models.CharField(max_length=150)
    correo_contacto = models.CharField(max_length=255)
    activa = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'instituciones'

class Empresa(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(null=True, blank=True)
    datos_globales = models.TextField(null=True, blank=True)
    servicios_cr = models.TextField(null=True, blank=True)
    nombre_contacto = models.CharField(max_length=150)
    correo_contacto = models.CharField(max_length=255)
    url_externa = models.CharField(max_length=500, null=True, blank=True)
    gestiona_en_plataforma = models.BooleanField(default=True)
    activa = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'empresas'

class Aspirante(models.Model):
    NIVEL_EDUCATIVO_CHOICES = [
        ('secundaria', 'Secundaria'),
        ('tecnico', 'Técnico'),
        ('universitario', 'Universitario'),
        ('licenciatura', 'Licenciatura'),
        ('maestria', 'Maestría'),
    ]

    ESTADO_LABORAL_CHOICES = [
        ('buscando', 'Buscando empleo'),
        ('empleado', 'Empleado'),
        ('desempleado', 'Desempleado'),
    ]

    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)
    persona = models.OneToOneField(Persona, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.SET_NULL, null=True)
    institucion_origen = models.ForeignKey(Institucion, on_delete=models.SET_NULL, null=True, blank=True)
    nivel_educativo = models.CharField(max_length=50, choices=NIVEL_EDUCATIVO_CHOICES)
    estado_laboral = models.CharField(max_length=50, choices=ESTADO_LABORAL_CHOICES)
    sobre_mi = models.TextField(null=True, blank=True)
    foto_url = models.ImageField(upload_to='perfiles/', null=True, blank=True)
    habilidades_tecnicas = models.JSONField(null=True, blank=True, default=list)
    habilidades_blandas = models.JSONField(null=True, blank=True, default=list)
    experiencia = models.JSONField(null=True, blank=True, default=list)
    embedding = models.JSONField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'aspirantes'

class ProgramaFormacion(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200)
    descripcion = models.TextField(null=True, blank=True)
    tipo_programa = models.CharField(max_length=100)
    duracion_meses = models.SmallIntegerField(null=True, blank=True)
    activo = models.BooleanField(default=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'programas_formacion'

class Vacante(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, null=True, blank=True)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE, null=True, blank=True)
    area_trabajo = models.ForeignKey(AreaTrabajo, on_delete=models.SET_NULL, null=True)
    titulo = models.CharField(max_length=200)
    descripcion = models.TextField(null=True, blank=True)
    nivel_educativo = models.CharField(max_length=50)
    tipo_vacante = models.CharField(max_length=50)
    url_externa = models.CharField(max_length=500, null=True, blank=True)
    embedding = models.JSONField(null=True, blank=True)
    publicado_en = models.DateTimeField(null=True, blank=True)
    cerrado_en = models.DateTimeField(null=True, blank=True)
    creado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'vacantes'

class Postulacion(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    aspirante = models.ForeignKey(Aspirante, on_delete=models.CASCADE)
    vacante = models.ForeignKey(Vacante, on_delete=models.CASCADE)
    curriculo = models.ForeignKey('Curriculo', on_delete=models.SET_NULL, null=True)
    estado = models.CharField(max_length=50)
    visto = models.BooleanField(default=False)
    contratado = models.BooleanField(default=False)
    puntaje_ia = models.DecimalField(max_digits=5, decimal_places=2, null=True)
    postulado_en = models.DateTimeField(auto_now_add=True)
    actualizado_en = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'postulaciones'

class Curriculo(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    aspirante = models.ForeignKey(Aspirante, on_delete=models.CASCADE)
    titulo = models.CharField(max_length=150)
    predeterminado = models.BooleanField(default=False)
    archivo_url = models.CharField(max_length=500, null=True, blank=True)
    tipo = models.CharField(max_length=50)
    extraido_por_ia = models.BooleanField(default=False)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'curriculos'

class Practicante(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    aspirante = models.ForeignKey(Aspirante, on_delete=models.CASCADE)
    institucion = models.ForeignKey(Institucion, on_delete=models.CASCADE)
    carrera = models.ForeignKey(Carrera, on_delete=models.SET_NULL, null=True)
    nombre_programa = models.CharField(max_length=200)
    nivel_academico = models.CharField(max_length=50)
    periodo_practica = models.CharField(max_length=100)
    horas_requeridas = models.SmallIntegerField()
    estado_pasantia = models.CharField(max_length=50)
    fecha_inicio = models.DateField(null=True, blank=True)
    fecha_fin = models.DateField(null=True, blank=True)

    class Meta:
        db_table = 'practicantes'

class Notificacion(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    tipo = models.CharField(max_length=80)
    titulo = models.CharField(max_length=200)
    cuerpo = models.TextField()
    canal = models.CharField(max_length=50)
    leido = models.BooleanField(default=False)
    enviado_en = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'notificaciones'

class Auditoria(models.Model):
    id = models.CharField(max_length=36, primary_key=True, default=uuid.uuid4)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    accion = models.CharField(max_length=100)
    tipo_entidad = models.CharField(max_length=80)
    entidad_id = models.CharField(max_length=36)
    detalles = models.JSONField(null=True, blank=True)
    ip_direccion = models.CharField(max_length=45)
    creado_en = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'auditoria'
