from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria
)


class RegistroSerializer(serializers.ModelSerializer):
    contrasena = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = Usuario
        fields = ['id', 'correo', 'telefono', 'contrasena', 'rol', 'activo']

    def create(self, validated_data):
        validated_data['contrasena_hash'] = make_password(validated_data.pop('contrasena'))
        usuario = Usuario.objects.create(**validated_data)
        return usuario
    

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    contrasena = serializers.CharField()
    

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

class AspiranteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aspirante
        fields = '__all__'

class VacanteSerializer(serializers.ModelSerializer):
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