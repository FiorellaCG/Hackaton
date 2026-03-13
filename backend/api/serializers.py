from rest_framework import serializers
from django.contrib.auth.hashers import check_password, make_password

from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria, ProgramaFormacion,
    Capacitacion, Favorito, InscripcionCapacitacion, Entrevista
)

class UsuarioSerializer(serializers.ModelSerializer):
    contrasena = serializers.CharField(write_only=True, required=False)
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
            'nombre_completo',
            'password_plano'
        ]
        read_only_fields = ['id', 'password_plano']

    def get_nombre_completo(self, obj):
        if obj.rol == 'aspirante' or obj.rol == 'admin':
            try:
                persona = obj.persona
                return f"{persona.nombre} {persona.apellidos}"
            except:
                pass
        
        if obj.rol == 'empresa':
            try:
                # Assuming one-to-many or one-to-one, obtaining the first one if it exists
                empresa = obj.empresa_set.first()
                if empresa:
                    return empresa.nombre
            except:
                pass
        
        if obj.rol == 'institucion':
            try:
                institucion = obj.institucion_set.first()
                if institucion:
                    return institucion.nombre
            except:
                pass
                
        return obj.correo

    def create(self, validated_data):
        password = validated_data.pop('contrasena')
        correo = validated_data.get('correo', '').lower().strip()
        if correo:
            validated_data['correo'] = correo
            
        usuario = Usuario.objects.create(
            **validated_data,
            contrasena_hash=make_password(password),
            password_plano=password
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
    nombre = serializers.ReadOnlyField(source='persona.nombre')
    apellidos = serializers.ReadOnlyField(source='persona.apellidos')
    
    password_plano = serializers.ReadOnlyField(source='usuario.password_plano')
    correo = serializers.ReadOnlyField(source='usuario.correo')
    nombre_institucion = serializers.ReadOnlyField(source='institucion_origen.nombre')
    
    class Meta:
        model = Aspirante
        fields = [
            'id', 'usuario', 'correo', 'persona', 'carrera', 'institucion_origen',
            'nombre_institucion', 'password_plano',
            'empresa_recomendada', 'nivel_educativo', 'estado_laboral',
            'sobre_mi', 'foto_url', 'habilidades_tecnicas', 'habilidades_blandas',
            'experiencia', 'creado_en', 'actualizado_en', 'nombre', 'apellidos'
        ]


class VacanteSerializer(serializers.ModelSerializer):
    nombre_empresa = serializers.ReadOnlyField(source='empresa.nombre')
    
    class Meta:
        model = Vacante
        fields = '__all__'


class PostulacionSerializer(serializers.ModelSerializer):
    vacante_obj = VacanteSerializer(source='vacante', read_only=True)
    aspirante_obj = AspiranteSerializer(source='aspirante', read_only=True)
    
    class Meta:
        model = Postulacion
        fields = [
            'id', 'aspirante', 'vacante', 'curriculo', 'estado',
            'visto', 'contratado', 'puntaje_ia', 'postulado_en',
            'actualizado_en', 'vacante_obj', 'aspirante_obj'
        ]


class CapacitacionSerializer(serializers.ModelSerializer):
    nombre_empresa = serializers.ReadOnlyField(source='empresa.nombre')
    nombre_institucion = serializers.ReadOnlyField(source='institucion.nombre')

    class Meta:
        model = Capacitacion
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


class FavoritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favorito
        fields = '__all__'


class InscripcionCapacitacionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InscripcionCapacitacion
        fields = '__all__'

class MiPerfilSerializer(serializers.Serializer):
    usuario = UsuarioSerializer()
    persona = PersonaSerializer()
    aspirante = AspiranteSerializer()
    postulaciones = serializers.ListField(
        child=serializers.DictField(), required=False
    )
    favoritos = serializers.ListField(
        child=serializers.DictField(), required=False
    )
    capacitaciones_inscritas = serializers.ListField(
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
    ubicacion = serializers.CharField(required=False, allow_blank=True)
    sector = serializers.CharField(required=False, allow_blank=True)
    tamano_empresa = serializers.CharField(required=False, allow_blank=True)
    logo_url = serializers.ImageField(required=False, allow_null=True)

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
        
        defaults={
            'nombre': validated_data['nombre'],
            'descripcion': validated_data.get('descripcion', ''),
            'nombre_contacto': validated_data['nombre_contacto'],
            'correo_contacto': validated_data['correo_contacto'],
            'url_externa': validated_data.get('url_externa', ''),
            'ubicacion': validated_data.get('ubicacion', ''),
            'sector': validated_data.get('sector', ''),
            'tamano_empresa': validated_data.get('tamano_empresa', ''),
        }
        
        if validated_data.get('logo_url'):
            defaults['logo_url'] = validated_data['logo_url']

        empresa, _ = Empresa.objects.update_or_create(
            usuario=usuario,
            defaults=defaults
        )
        return empresa

class CrearPerfilInstitucionSerializer(serializers.Serializer):
    usuario_id = serializers.UUIDField()
    nombre = serializers.CharField()
    nombre_contacto = serializers.CharField()
    correo_contacto = serializers.EmailField()
    tipo = serializers.CharField(required=False, default='educativa')
    titulo = serializers.CharField(required=False, default='N/A')

    def validate(self, data):
        try:
            usuario = Usuario.objects.get(id=data['usuario_id'])
        except Usuario.DoesNotExist:
            raise serializers.ValidationError("Usuario no existe")

        if usuario.rol != 'institucion':
            raise serializers.ValidationError("El usuario no tiene rol de institución")
        return data

    def create(self, validated_data):
        usuario = Usuario.objects.get(id=validated_data['usuario_id'])
        
        defaults={
            'nombre': validated_data['nombre'],
            'nombre_contacto': validated_data['nombre_contacto'],
            'correo_contacto': validated_data['correo_contacto'],
            'tipo': validated_data.get('tipo', 'educativa'),
            'titulo': validated_data.get('titulo', 'N/A'),
        }
        
        institucion, _ = Institucion.objects.update_or_create(
            usuario=usuario,
            defaults=defaults
        )
        return institucion

class LoginSerializer(serializers.Serializer):
    correo = serializers.CharField()
    contrasena = serializers.CharField()

    def validate(self, data):
        correo = data['correo'].strip().lower()
        usuario_qs = Usuario.objects.filter(correo__iexact=correo).order_by('-creado_en')
        
        if not usuario_qs.exists():
            raise serializers.ValidationError("Credenciales inválidas")
        
        usuario_valido = None
        usuarios_coincidentes = []
        
        for usuario in usuario_qs:
            if check_password(data['contrasena'], usuario.contrasena_hash):
                usuarios_coincidentes.append(usuario)
        
        if not usuarios_coincidentes:
            raise serializers.ValidationError("Credenciales inválidas")
            
        # Priorizar el que tenga perfil completo (Persona para aspirantes, Empresa para empresas)
        for u in usuarios_coincidentes:
            if u.rol == 'aspirante' and hasattr(u, 'persona'):
                usuario_valido = u
                break
            elif u.rol == 'empresa' and u.empresa_set.exists():
                usuario_valido = u
                break
            elif u.rol == 'institucion' and u.institucion_set.exists():
                usuario_valido = u
                break
        
        # Si ninguno tiene perfil, tomar el más reciente de los que coinciden
        if not usuario_valido:
            usuario_valido = usuarios_coincidentes[0]
        
        response_data = {
            "id": usuario_valido.id,
            "correo": usuario_valido.correo,
            "rol": usuario_valido.rol
        }
        
        # Si es institución, incluir su ID y nombre para el dashboard
        if usuario_valido.rol == 'institucion':
            institucion = usuario_valido.institucion_set.first()
            if institucion:
                response_data["id_institucion"] = institucion.id
                response_data["nombre_institucion"] = institucion.nombre
        elif usuario_valido.rol == 'empresa':
             empresa = usuario_valido.empresa_set.first()
             if empresa:
                 response_data["id_empresa"] = empresa.id
                 response_data["nombre_empresa"] = empresa.nombre
        
        return response_data

class EntrevistaSerializer(serializers.ModelSerializer):
    aspirante_nombre = serializers.SerializerMethodField()
    vacante_titulo = serializers.SerializerMethodField()
    empresa_nombre = serializers.SerializerMethodField()

    class Meta:
        model = Entrevista
        fields = '__all__'

    def get_aspirante_nombre(self, obj):
        try:
            return f"{obj.aspirante.persona.nombre} {obj.aspirante.persona.apellidos}"
        except:
            return "Aspirante"

    def get_vacante_titulo(self, obj):
        try:
            return obj.postulacion.vacante.titulo
        except:
            return "Vacante"

    def get_empresa_nombre(self, obj):
        try:
            return obj.empresa.nombre
        except:
            return "Empresa"
