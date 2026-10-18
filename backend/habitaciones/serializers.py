from rest_framework import serializers
from .models import Habitacion


class HabitacionSerializer(serializers.ModelSerializer):

    precio = serializers.FloatField()
    imagen = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = Habitacion
        fields = '__all__'