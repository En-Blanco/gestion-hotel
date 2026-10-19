from django.urls import path
from .views import ServicioView, ServicioDetailView


urlpatterns = [
    path('', ServicioView.as_view(), name='servicios'),
    path('<int:pk>/', ServicioDetailView.as_view(), name='servicio-detalle'),
]