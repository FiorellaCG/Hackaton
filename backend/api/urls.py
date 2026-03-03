# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UsuarioViewSet, PersonaViewSet, AreaTrabajoViewSet,
    CarreraViewSet, InstitucionViewSet, EmpresaViewSet,
    AspiranteViewSet, VacanteViewSet, PostulacionViewSet,
    CurriculoViewSet, PracticanteViewSet,
    NotificacionViewSet, AuditoriaViewSet,
    LoginView, CrearPerfilAspiranteView, MiPerfilView
)

router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'personas', PersonaViewSet)
router.register(r'areas-trabajo', AreaTrabajoViewSet)
router.register(r'carreras', CarreraViewSet)
router.register(r'instituciones', InstitucionViewSet)
router.register(r'empresas', EmpresaViewSet)
router.register(r'aspirantes', AspiranteViewSet)
router.register(r'vacantes', VacanteViewSet)
router.register(r'postulaciones', PostulacionViewSet)
router.register(r'curriculos', CurriculoViewSet)
router.register(r'practicantes', PracticanteViewSet)
router.register(r'notificaciones', NotificacionViewSet)
router.register(r'auditoria', AuditoriaViewSet)

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('crear-perfil-aspirante/', CrearPerfilAspiranteView.as_view(), name='crear-perfil-aspirante'),
    path('mi-perfil/<uuid:usuario_id>/', MiPerfilView.as_view(), name='mi-perfil'),

    # Router automático
    path('', include(router.urls)),
]