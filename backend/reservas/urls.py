from django.urls import path
from .views import (ReservaView, ReservaServicioView, ReservaDetalleView)

urlpatterns = [
    path('', ReservaView.as_view(), name='reservas'),
    path('<int:pk>/', ReservaDetalleView.as_view(), name='reserva-detalle'),
    path('servicios/', ReservaServicioView.as_view(), name='reserva-servicio')
]
