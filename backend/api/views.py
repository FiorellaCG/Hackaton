from django.shortcuts import render
from django.http import HttpResponse
from django.db.models import Count
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
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
    ProgramaFormacionSerializer, AspiranteSerializer, VacanteSerializer, PostulacionSerializer,
    CurriculoSerializer, PracticanteSerializer, NotificacionSerializer,
    AuditoriaSerializer
)

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
            
            # Simple validation: Check headers
            headers = [cell.value for cell in ws[1]]
            required = ['Nombre', 'Apellidos', 'Cedula', 'Correo', 'Telefono', 'Nivel Educativo']
            if not all(req in headers for req in required):
                 return Response({"error": f"Missing required columns. Expected: {required}"}, status=status.HTTP_400_BAD_REQUEST)

            for row_idx, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
                if not row[0]: continue # Skip empty rows
                try:
                    # Basic mapping based on supposed template
                    nombre, apellidos, cedula, correo, telefono, nivel_educativo, carrera_id = row[:7]
                    
                    # Create User
                    usuario = Usuario.objects.create(
                        correo=correo,
                        telefono=telefono,
                        rol='aspirante',
                        contrasena_hash='default_temp_hash'
                    )
                    
                    # Create Persona
                    persona = Persona.objects.create(
                        usuario=usuario,
                        nombre=nombre,
                        apellidos=apellidos,
                        cedula=cedula,
                        telefono=telefono,
                        nacionalidad='Costarricense', # Default
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
                            
                    # Create Aspirante linked to institucion
                    Aspirante.objects.create(
                        usuario=usuario,
                        persona=persona,
                        carrera=carrera,
                        institucion_origen=institucion,
                        nivel_educativo=nivel_educativo,
                        estado_laboral='Buscando'
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
        # Cascade will delete Persona and Usuario since Aspirante -> Usuario is via ForeignKey? 
        # Actually Aspirante -> Usuario is FK, deleting Aspirante won't delete User by default in our model structure 
        # unless we explicitly delete the User.
        usuarios_ids = list(aspirantes.values_list('usuario_id', flat=True))
        Usuario.objects.filter(id__in=usuarios_ids).delete() 
        # By cascade, this deletes Persona, Aspirante, etc.
        
        return Response({"message": f"Se eliminaron {count} perfiles de estudiantes cargados por la institución."})

    @action(detail=True, methods=['get'])
    def metricas(self, request, pk=None):
        # RF-61: Access aggregated demand info (active vacantes count by area)
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
        aspirante.estado_laboral = 'Colocado'
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