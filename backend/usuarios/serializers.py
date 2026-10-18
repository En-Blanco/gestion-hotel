from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Usuario, Rol


class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre']


class UsuarioSerializer(serializers.ModelSerializer):
    contrasena = serializers.CharField(
        write_only=True,
        min_length=8
    )

    class Meta:
        model = Usuario
        fields = [
            'dni',
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'contrasena',
            'id_rol'
        ]

    def create(self, validated_data):
        validated_data['contrasena'] = make_password(
            validated_data['contrasena']
        )
        return Usuario.objects.create(**validated_data)