from rest_framework import serializers
from .models import (Reserva, ReservaServicio)

class ReservaSerializer(serializers.ModelSerializer):

    class Meta:
        model = Reserva
        fields = '__all__'

    def validate(self, attrs):
        # En un PATCH parcial los campos que no vienen se toman de la reserva existente
        instance = self.instance
        habitacion = attrs.get('habitacion', getattr(instance, 'habitacion', None))
        checkin = attrs.get('checkin', getattr(instance, 'checkin', None))
        checkout = attrs.get('checkout', getattr(instance, 'checkout', None))
        estado = attrs.get('estado', getattr(instance, 'estado', None))

        if checkin and checkout and checkout <= checkin:
            raise serializers.ValidationError(
                {'checkout': 'La fecha de egreso debe ser posterior a la de ingreso.'}
            )

        # Una reserva cancelada no ocupa la habitación
        if estado == 'Cancelada':
            return attrs

        solapadas = Reserva.objects.filter(
            habitacion=habitacion,
            checkin__lt=checkout,
            checkout__gt=checkin,
        ).exclude(estado='Cancelada')

        if instance is not None:
            solapadas = solapadas.exclude(pk=instance.pk)

        if solapadas.exists():
            raise serializers.ValidationError(
                'La habitación no está disponible en las fechas seleccionadas.'
            )

        return attrs

class ReservaServicioSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReservaServicio
        fields = '__all__'
