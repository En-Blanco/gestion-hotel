from django.urls import path
from .views import (ReservaView, ReservaServicioView)

urlpatterns = [
    path('',ReservaView.as_view(),name='reservas'),
    path('servicios/', ReservaServicioView.as_view(), name='reserva-servicio')
]