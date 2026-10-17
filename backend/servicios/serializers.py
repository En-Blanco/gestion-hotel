from rest_framework import serializers
from .models import Servicio

class ServicioSerializer(serializers.ModelSerializer):

    precio=serializers.FloatField()

    class Meta:
        model = Servicio
        fields = '__all__'