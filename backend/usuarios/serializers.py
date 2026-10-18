from rest_framework import serializers
from .models import Usuario, Rol

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = ['id', 'nombre']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields = ['dni',
                  'nombre',
                  'apellido',
                  'correo',
                  'telefono',
                  'contrasena',
                  'id_rol'
                  ]

class UsuarioAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'dni',
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'id_rol'
        ]

class ModificarRolSerializer(serializers.Serializer):
    id_rol = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all()
    )