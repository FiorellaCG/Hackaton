from rest_framework import serializers
from django.contrib.auth.hashers import check_password, make_password

from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria, ProgramaFormacion
)

class UsuarioSerializer(serializers.ModelSerializer):
    contrasena = serializers.CharField(write_only=True, required=True)
    nombre_completo = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            'id',
            'correo',
            'telefono',
            'contrasena',
            'rol',
            'activo',
            'consentimiento',
            'nombre_completo'
        ]
        read_only_fields = ['id']

    def get_nombre_completo(self, obj):
        try:
            persona = obj.persona
            return f"{persona.nombre} {persona.apellidos}"
        except:
            return "Sin perfil"

    def create(self, validated_data):
        password = validated_data.pop('contrasena')
        usuario = Usuario.objects.create(
            **validated_data,
            contrasena_hash=make_password(password)
        )
        return usuario

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'


class AreaTrabajoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaTrabajo
        fields = '__all__'


class CarreraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrera
        fields = '__all__'


class InstitucionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Institucion
        fields = '__all__'


class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = '__all__'


class ProgramaFormacionSerializer(serializers.ModelSerializer):
    nombre_institucion = serializers.ReadOnlyField(source='institucion.nombre')

    class Meta:
        model = ProgramaFormacion
        fields = '__all__'


class AspiranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aspirante
        fields = '__all__'


class VacanteSerializer(serializers.ModelSerializer):
    nombre_empresa = serializers.ReadOnlyField(source='empresa.nombre')
    
    class Meta:
        model = Vacante
        fields = '__all__'


class PostulacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Postulacion
        fields = '__all__'


class CurriculoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Curriculo
        fields = '__all__'


class PracticanteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Practicante
        fields = '__all__'


class NotificacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = '__all__'


class AuditoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auditoria
        fields = '__all__'

class MiPerfilSerializer(serializers.Serializer):
    usuario = UsuarioSerializer()
    persona = PersonaSerializer()
    aspirante = AspiranteSerializer()
    postulaciones = serializers.ListField(
        child=serializers.DictField(), required=False
    )

class CrearPerfilAspiranteSerializer(serializers.Serializer):
    usuario_id = serializers.UUIDField()

    # ----- Datos Persona -----
    nombre = serializers.CharField()
    apellidos = serializers.CharField()
    cedula = serializers.CharField()
    genero = serializers.CharField()
    nacionalidad = serializers.CharField()
    telefono = serializers.CharField()
    provincia = serializers.CharField()
    canton = serializers.CharField()
    fecha_nacimiento = serializers.DateField(required=False)

    # ----- Datos Aspirante -----
    carrera_id = serializers.CharField(required=False, allow_null=True)
    nivel_educativo = serializers.ChoiceField(
        choices=Aspirante.NIVEL_EDUCATIVO_CHOICES
    )
    estado_laboral = serializers.ChoiceField(
        choices=Aspirante.ESTADO_LABORAL_CHOICES
    )
    sobre_mi = serializers.CharField(required=False, allow_blank=True)
    foto_url = serializers.ImageField(required=False, allow_null=True)
    habilidades_tecnicas = serializers.JSONField(required=False, default=list)
    habilidades_blandas = serializers.JSONField(required=False, default=list)
    experiencia = serializers.JSONField(required=False, default=list)
    institucion_origen_id = serializers.CharField(required=False, allow_null=True)
    empresa_recomendada_id = serializers.CharField(required=False, allow_null=True)

    def validate(self, data):
        try:
            usuario = Usuario.objects.get(id=data['usuario_id'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no existe")

        if usuario.rol != 'aspirante':
            raise serializers.ValidationError(
                "El usuario no tiene rol aspirante"
            )

        # Permitimos actualizaciones, así que no lanzamos error si ya existe
        return data

    def create(self, validated_data):
        usuario = Usuario.objects.get(id=validated_data['usuario_id'])
        carrera = Carrera.objects.filter(id=validated_data.get('carrera_id')).first() if validated_data.get('carrera_id') else Carrera.objects.first()

        inst_id = validated_data.get('institucion_origen_id')
        emp_id = validated_data.get('empresa_recomendada_id')

        institucion_origen = Institucion.objects.get(id=inst_id) if inst_id else None
        empresa_recomendada = Empresa.objects.get(id=emp_id) if emp_id else None

        persona, _ = Persona.objects.update_or_create(
            usuario=usuario,
            defaults={
                'nombre': validated_data['nombre'],
                'apellidos': validated_data['apellidos'],
                'cedula': validated_data['cedula'],
                'genero': validated_data['genero'],
                'nacionalidad': validated_data['nacionalidad'],
                'telefono': validated_data['telefono'],
                'provincia': validated_data['provincia'],
                'canton': validated_data['canton'],
                'fecha_nacimiento': validated_data.get('fecha_nacimiento')
            }
        )

        aspirante, _ = Aspirante.objects.update_or_create(
            usuario=usuario,
            defaults={
                'persona': persona,
                'carrera': carrera,
                'nivel_educativo': validated_data['nivel_educativo'],
                'estado_laboral': validated_data['estado_laboral'],
                'sobre_mi': validated_data.get('sobre_mi', ''),
                'foto_url': validated_data.get('foto_url', ''),
                'habilidades_tecnicas': validated_data.get('habilidades_tecnicas', []),
                'habilidades_blandas': validated_data.get('habilidades_blandas', []),
                'experiencia': validated_data.get('experiencia', []),
                'institucion_origen': institucion_origen,
                'empresa_recomendada': empresa_recomendada
            }
        )

        return aspirante

class CrearPerfilEmpresaSerializer(serializers.Serializer):
    usuario_id = serializers.UUIDField()
    nombre = serializers.CharField()
    descripcion = serializers.CharField(required=False, allow_blank=True)
    nombre_contacto = serializers.CharField()
    correo_contacto = serializers.EmailField()
    url_externa = serializers.CharField(required=False, allow_blank=True)

    def validate(self, data):
        try:
            usuario = Usuario.objects.get(id=data['usuario_id'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no existe")

        if usuario.rol != 'empresa':
            raise serializers.ValidationError("El usuario no tiene rol de empresa")
        return data

    def create(self, validated_data):
        usuario = Usuario.objects.get(id=validated_data['usuario_id'])
        empresa, _ = Empresa.objects.update_or_create(
            usuario=usuario,
            defaults={
                'nombre': validated_data['nombre'],
                'descripcion': validated_data.get('descripcion', ''),
                'nombre_contacto': validated_data['nombre_contacto'],
                'correo_contacto': validated_data['correo_contacto'],
                'url_externa': validated_data.get('url_externa', '')
            }
        )
        return empresa

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()

    def validate(self, data):
        try:
            usuario = Usuario.objects.get(correo=data['correo'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Credenciales inválidas")

        if not check_password(data['contrasena'], usuario.contrasena_hash):
            raise serializers.ValidationError("Credenciales inválidas")

        return {
            "id": usuario.id,
            "correo": usuario.correo,
            "rol": usuario.rol
        }