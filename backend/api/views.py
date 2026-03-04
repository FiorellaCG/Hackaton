from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils import timezone
import openpyxl
import uuid

from .models import (
    Usuario, Persona, AreaTrabajo, Carrera, Institucion,
    Empresa, ProgramaFormacion, Aspirante, Vacante, Postulacion, Curriculo,
    Practicante, Notificacion, Auditoria
)

from .serializers import (
    UsuarioSerializer, PersonaSerializer, AreaTrabajoSerializer,
    CarreraSerializer, InstitucionSerializer, EmpresaSerializer,
    ProgramaFormacionSerializer, AspiranteSerializer, VacanteSerializer,
    PostulacionSerializer, CurriculoSerializer, PracticanteSerializer,
    NotificacionSerializer, AuditoriaSerializer,
    CrearPerfilAspiranteSerializer, CrearPerfilEmpresaSerializer, LoginSerializer, MiPerfilSerializer
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

        if usuario.rol == 'empresa':
            empresa = usuario.empresa_set.first()
            if not empresa:
                return Response({"usuario_id": usuario.id, "perfil_completo": False}, status=status.HTTP_200_OK)
            return Response({
                "usuario_id": usuario.id,
                "empresa_id": empresa.id,
                "nombre": empresa.nombre,
                "descripcion": empresa.descripcion,
                "nombre_contacto": empresa.nombre_contacto,
                "correo_contacto": empresa.correo_contacto,
                "url_externa": empresa.url_externa,
                "perfil_completo": True,
                "rol": "empresa"
            }, status=status.HTTP_200_OK)

        try:
            persona = usuario.persona
            aspirante = usuario.aspirante
        except (Persona.DoesNotExist, Aspirante.DoesNotExist):
            # Perfil incompleto: devolver 200 con datos seguros y banderas para que el frontend no estalle con 404
            return Response({
                "usuario_id": usuario.id,
                "persona_id": None,
                "aspirante_id": None,
                "nombre": "Usuario",
                "apellidos": "Registrado",
                "cedula": "",
                "foto_url": None,
                "sobre_mi": "Aún no has completado tu perfil.",
                "carrera": "No definida",
                "carrera_id": None,
                "nivel_educativo": "",
                "estado_laboral": "",
                "telefono": usuario.telefono,
                "provincia": "",
                "canton": "",
                "genero": "",
                "nacionalidad": "",
                "fecha_nacimiento": None,
                "habilidades_tecnicas": [],
                "habilidades_blandas": [],
                "experiencia": [],
                "practicante": False,
                "postulaciones": [],
                "preferencias": usuario.preferencias,
                "perfil_completo": False
            }, status=status.HTTP_200_OK)

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
# CREAR PERFIL EMPRESA
# =====================================================

class CrearPerfilEmpresaView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = CrearPerfilEmpresaSerializer(data=request.data)
        if serializer.is_valid():
            empresa = serializer.save()
            return Response({
                "mensaje": "Perfil de empresa creado correctamente",
                "empresa_id": empresa.id
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

    @action(detail=True, methods=['post'])
    def dar_consentimiento(self, request, pk=None):
        usuario = self.get_object()
        usuario.consentimiento = True
        usuario.fecha_consentimiento = timezone.now()
        usuario.save()
        return Response({'status': 'Consentimiento registrado'})

    @action(detail=True, methods=['delete'])
    def eliminar_cuenta(self, request, pk=None):
        usuario = self.get_object()
        usuario.activo = False
        usuario.save()
        return Response({'status': 'Cuenta desactivada'})


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

    @action(detail=True, methods=['get'])
    def plantilla_excel(self, request, pk=None):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Estudiantes"
        headers = ['Nombre', 'Apellidos', 'Cedula', 'Correo', 'Telefono', 'Nivel Educativo', 'Carrera ID']
        ws.append(headers)
        
        response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        response['Content-Disposition'] = 'attachment; filename=plantilla_estudiantes.xlsx'
        wb.save(response)
        return response

    @action(detail=True, methods=['post'])
    def cargar_excel(self, request, pk=None):
        institucion = self.get_object()
        file = request.FILES.get('file')
        
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            wb = openpyxl.load_workbook(file)
            ws = wb.active
            
            created_count = 0
            errors = []
            
            headers = [cell.value for cell in ws[1]]
            required = ['Nombre', 'Apellidos', 'Cedula', 'Correo', 'Telefono', 'Nivel Educativo']
            if not all(req in headers for req in required):
                 return Response({"error": f"Missing required columns. Expected: {required}"}, status=status.HTTP_400_BAD_REQUEST)

            for row_idx, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
                if not row[0]: continue
                try:
                    nombre, apellidos, cedula, correo, telefono, nivel_educativo, carrera_id = row[:7]
                    
                    usuario = Usuario.objects.create(
                        correo=correo,
                        telefono=telefono,
                        rol='aspirante',
                        contrasena_hash='default_temp_hash'
                    )
                    
                    persona = Persona.objects.create(
                        usuario=usuario,
                        nombre=nombre,
                        apellidos=apellidos,
                        cedula=cedula,
                        telefono=telefono,
                        nacionalidad='Costarricense',
                        genero='No especificado',
                        provincia='San Jose',
                        canton='San Jose'
                    )
                    
                    carrera = None
                    if carrera_id:
                        try:
                            carrera = Carrera.objects.get(id=carrera_id)
                        except Carrera.DoesNotExist:
                            pass
                            
                    Aspirante.objects.create(
                        usuario=usuario,
                        persona=persona,
                        carrera=carrera,
                        institucion_origen=institucion,
                        nivel_educativo=nivel_educativo,
                        estado_laboral='buscando'
                    )
                    created_count += 1
                except Exception as e:
                    errors.append(f"Error en fila {row_idx}: {str(e)}")
            
            return Response({
                "message": f"{created_count} estudiantes cargados exitosamente.",
                "errors": errors if errors else None
            })
            
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['delete'])
    def eliminar_base_datos(self, request, pk=None):
        institucion = self.get_object()
        aspirantes = Aspirante.objects.filter(institucion_origen=institucion)
        count = aspirantes.count()
        usuarios_ids = list(aspirantes.values_list('usuario_id', flat=True))
        Usuario.objects.filter(id__in=usuarios_ids).delete()
        
        return Response({"message": f"Se eliminaron {count} perfiles de estudiantes cargados por la institución."})

    @action(detail=True, methods=['get'])
    def metricas(self, request, pk=None):
        demand = Vacante.objects.values('area_trabajo__nombre').annotate(total=Count('id')).order_by('-total')
        return Response({
            "demanda_laboral": list(demand)
        })


class EmpresaViewSet(viewsets.ModelViewSet):
    queryset = Empresa.objects.all()
    serializer_class = EmpresaSerializer


class ProgramaFormacionViewSet(viewsets.ModelViewSet):
    queryset = ProgramaFormacion.objects.all()
    serializer_class = ProgramaFormacionSerializer


class AspiranteViewSet(viewsets.ModelViewSet):
    queryset = Aspirante.objects.all()
    serializer_class = AspiranteSerializer

    @action(detail=True, methods=['post'])
    def marcar_colocado(self, request, pk=None):
        aspirante = self.get_object()
        aspirante.estado_laboral = 'empleado'
        aspirante.save()
        return Response({'status': 'Estudiante marcado como colocado'})


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