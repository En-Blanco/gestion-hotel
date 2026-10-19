from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('nosotros.urls')),
    path('api/habitaciones/', include('habitaciones.urls')),
    path('api/reservas/', include('reservas.urls')),
    path('api/servicios/', include('servicios.urls')),
    path('api/usuarios/', include('usuarios.urls')),
]
