from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework import generics

from rest_framework import viewsets
from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria,
)

from .serializers import (
     PersonaSerializer, AreaTrabajoSerializer,
    CarreraSerializer, InstitucionSerializer, EmpresaSerializer,
    AspiranteSerializer, VacanteSerializer, PostulacionSerializer,
    CurriculoSerializer, PracticanteSerializer, NotificacionSerializer, RegistroSerializer,
    AuditoriaSerializer,LoginSerializer

)


class RegistroUsuarioView(generics.ListCreateAPIView):
    queryset = Usuario.objects.all()
    serializer_class = RegistroSerializer

class LoginUsuarioView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        correo = serializer.validated_data['correo']
        contrasena = serializer.validated_data['contrasena']

        try:
            usuario = Usuario.objects.get(correo=correo)
            if check_password(contrasena, usuario.contrasena_hash):
                return Response({
                    "success": True,
                    "usuario_id": usuario.id,
                    "rol": usuario.rol
                })
            else:
                return Response({"success": False, "error": "Contraseña incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
        except Usuario.DoesNotExist:
            return Response({"success": False, "error": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)

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