from django.urls import path
from .views import LoginView, RegistroView, RolView

urlpatterns = [
    path('roles/', RolView.as_view(), name='roles'),
    path('login/', LoginView.as_view(), name='login'),
    path('registro/', RegistroView.as_view(), name='registro')
]