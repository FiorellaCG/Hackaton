from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'usuarios', views.UsuarioViewSet)
router.register(r'personas', views.PersonaViewSet)
router.register(r'areas-trabajo', views.AreaTrabajoViewSet)
router.register(r'carreras', views.CarreraViewSet)
router.register(r'instituciones', views.InstitucionViewSet)
router.register(r'programas-formacion', views.ProgramaFormacionViewSet)
router.register(r'empresas', views.EmpresaViewSet)
router.register(r'aspirantes', views.AspiranteViewSet)
router.register(r'vacantes', views.VacanteViewSet)
router.register(r'postulaciones', views.PostulacionViewSet)
router.register(r'curriculos', views.CurriculoViewSet)
router.register(r'practicantes', views.PracticanteViewSet)
router.register(r'notificaciones', views.NotificacionViewSet)
router.register(r'auditoria', views.AuditoriaViewSet)

urlpatterns = [
    path('', include(router.urls)),
]