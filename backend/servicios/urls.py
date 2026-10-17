from django.urls import path
from .views import ServicioView


urlpatterns = [
    path('', ServicioView.as_view(), name='servicios')
]