from rest_framework import serializers
from .models import Habitacion


class HabitacionSerializer(serializers.ModelSerializer):

    precio=serializers.FloatField()
    
    class Meta:
        model = Habitacion
        fields = '__all__'