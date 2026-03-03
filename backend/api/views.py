from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny

from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria
)

from .serializers import (
    CrearPerfilAspiranteSerializer,
    UsuarioSerializer,
    PersonaSerializer,
    AreaTrabajoSerializer,
    CarreraSerializer,
    InstitucionSerializer,
    EmpresaSerializer,
    AspiranteSerializer,
    VacanteSerializer,
    PostulacionSerializer,
    CurriculoSerializer,
    PracticanteSerializer,
    NotificacionSerializer,
    AuditoriaSerializer,
    LoginSerializer,
    MiPerfilSerializer
)

# =====================================================
# MI PERFIL (GET)
# =====================================================

class MiPerfilView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, usuario_id):
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response(
                {"error": "Usuario no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            persona = usuario.persona
            aspirante = usuario.aspirante
        except:
            return Response(
                {"error": "Perfil incompleto"},
                status=status.HTTP_404_NOT_FOUND
            )

        postulaciones = Postulacion.objects.filter(aspirante=aspirante).select_related('vacante', 'vacante__empresa')
        postulaciones_data = []
        for p in postulaciones:
            postulaciones_data.append({
                "id": p.id,
                "cargo": p.vacante.titulo,
                "empresa": p.vacante.empresa.nombre,
                "estado": p.estado,
                "fecha": p.postulado_en.isoformat() if p.postulado_en else None
            })

        # Aplanamos la respuesta para que sea más fácil de usar en el frontend
        data = {
            "usuario_id": usuario.id,
            "persona_id": persona.id,
            "aspirante_id": aspirante.id,
            "nombre": persona.nombre,
            "apellidos": persona.apellidos,
            "cedula": persona.cedula,
            "foto_url": request.build_absolute_uri(aspirante.foto_url.url) if aspirante.foto_url else None,
            "sobre_mi": aspirante.sobre_mi,
            "carrera": aspirante.carrera.nombre if aspirante.carrera else "Estudiante",
            "carrera_id": aspirante.carrera.id if aspirante.carrera else None,
            "nivel_educativo": aspirante.nivel_educativo,
            "estado_laboral": aspirante.estado_laboral,
            "telefono": persona.telefono,
            "provincia": persona.provincia,
            "canton": persona.canton,
            "genero": persona.genero,
            "nacionalidad": persona.nacionalidad,
            "fecha_nacimiento": persona.fecha_nacimiento.isoformat() if persona.fecha_nacimiento else None,
            "habilidades_tecnicas": aspirante.habilidades_tecnicas,
            "habilidades_blandas": aspirante.habilidades_blandas,
            "experiencia": aspirante.experiencia,
            "practicante": hasattr(aspirante, 'practicante'),
            "postulaciones": postulaciones_data,
            "preferencias": usuario.preferencias
        }

        return Response(data, status=status.HTTP_200_OK)


# =====================================================
# CREAR PERFIL ASPIRANTE
# =====================================================

class CrearPerfilAspiranteView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CrearPerfilAspiranteSerializer(data=request.data)

        if serializer.is_valid():
            aspirante = serializer.save()
            return Response({
                "mensaje": "Perfil creado correctamente",
                "aspirante_id": aspirante.id
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# =====================================================
# CONFIGURACIÓN Y AJUSTES
# =====================================================

class UpdatePreferenciasView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, usuario_id):
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            usuario.preferencias = request.data.get('preferencias', {})
            usuario.save()
            return Response({"mensaje": "Preferencias actualizadas"}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class CambiarPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, usuario_id):
        from django.contrib.auth.hashers import make_password, check_password
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            current_password = request.data.get('current_password')
            new_password = request.data.get('new_password')

            if not check_password(current_password, usuario.contrasena_hash):
                return Response({"error": "La contraseña actual es incorrecta"}, status=status.HTTP_400_BAD_REQUEST)

            usuario.contrasena_hash = make_password(new_password)
            usuario.save()
            return Response({"mensaje": "Contraseña actualizada correctamente"}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class EliminarCuentaView(APIView):
    permission_classes = [AllowAny]

    def delete(self, request, usuario_id):
        try:
            usuario = Usuario.objects.get(id=usuario_id)
            usuario.delete()
            return Response({"mensaje": "Cuenta eliminada correctamente"}, status=status.HTTP_200_OK)
        except Usuario.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

# =====================================================
# LOGIN
# =====================================================

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)


# =====================================================
# CRUD AUTOMÁTICO CON VIEWSETS
# =====================================================

class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


class PersonaViewSet(viewsets.ModelViewSet):
    queryset = Persona.objects.all()
    serializer_class = PersonaSerializer


class AreaTrabajoViewSet(viewsets.ModelViewSet):
    queryset = AreaTrabajo.objects.all()
    serializer_class = AreaTrabajoSerializer


class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.all()
    serializer_class = CarreraSerializer


class InstitucionViewSet(viewsets.ModelViewSet):
    queryset = Institucion.objects.all()
    serializer_class = InstitucionSerializer


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class AspiranteViewSet(viewsets.ModelViewSet):
    queryset = Aspirante.objects.all()
    serializer_class = AspiranteSerializer


class VacanteViewSet(viewsets.ModelViewSet):
    queryset = Vacante.objects.all()
    serializer_class = VacanteSerializer


class PostulacionViewSet(viewsets.ModelViewSet):
    queryset = Postulacion.objects.all()
    serializer_class = PostulacionSerializer


class CurriculoViewSet(viewsets.ModelViewSet):
    queryset = Curriculo.objects.all()
    serializer_class = CurriculoSerializer


class PracticanteViewSet(viewsets.ModelViewSet):
    queryset = Practicante.objects.all()
    serializer_class = PracticanteSerializer


class NotificacionViewSet(viewsets.ModelViewSet):
    queryset = Notificacion.objects.all()
    serializer_class = NotificacionSerializer


class AuditoriaViewSet(viewsets.ModelViewSet):
    queryset = Auditoria.objects.all()
    serializer_class = AuditoriaSerializer