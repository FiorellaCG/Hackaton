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

        serializer = MiPerfilSerializer({
            "usuario": usuario,
            "persona": persona,
            "aspirante": aspirante
        })

        return Response(serializer.data, status=status.HTTP_200_OK)


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