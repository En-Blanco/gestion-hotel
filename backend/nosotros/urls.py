from django.urls import path
from .views import MiembroEquipoView

urlpatterns = [
    path('equipo/', MiembroEquipoView.as_view(), name='miembro-equipo'),
]
