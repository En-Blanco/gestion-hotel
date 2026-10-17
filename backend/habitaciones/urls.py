from django.urls import path
from .views import HabitacionView


urlpatterns = [
    path('', HabitacionView.as_view(), name='habitaciones')
]