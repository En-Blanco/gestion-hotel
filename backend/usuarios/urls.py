from django.urls import path
from .views import (
    LoginView,
    RegistroView,
    RolView,
    UsuariosView,
    ModificarRolView,
    EliminarUsuarioView
)

urlpatterns = [
    path('roles/', RolView.as_view(), name='roles'),
    path('login/', LoginView.as_view(), name='login'),
    path('registro/', RegistroView.as_view(), name='registro'),

    path('admin/', UsuariosView.as_view(), name='listar-usuarios'),
    path('admin/<str:dni>/rol/', ModificarRolView.as_view(), name='modificar-rol'),
    path('admin/<str:dni>/', EliminarUsuarioView.as_view(), name='eliminar-usuario'),
]