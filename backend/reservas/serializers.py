from rest_framework import serializers
from .models import (Reserva, ReservaServicio)

class ReservaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserva
        fields = '__all__'

class ReservaServicioSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservaServicio
        fields = '__all__'  