from django.urls import path
from .views import HabitacionView, HabitacionDetailView


urlpatterns = [
    path('', HabitacionView.as_view(), name='habitaciones'),
    path('<int:numero>/', HabitacionDetailView.as_view(), name='habitacion-detalle'),
]
