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

class RegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'dni',
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'contrasena'
        ]

    def create(self, validated_data):
        rol_estandar = Rol.objects.filter(
            nombre='Estándar'
        ).first()

        if rol_estandar is None:
            raise serializers.ValidationError({
                'error': 'El rol Estándar no está configurado.'
            })

        return Usuario.objects.create(
            **validated_data,
            id_rol=rol_estandar
        )

class UsuarioAdminSerializer(serializers.ModelSerializer):
    rol = serializers.CharField(
        source='id_rol.nombre',
        read_only=True
    )

    class Meta:
        model = Usuario
        fields = [
            'dni',
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'id_rol',
            'rol'
        ]

class UsuarioAdminEditarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            'nombre',
            'apellido',
            'correo',
            'telefono',
            'contrasena'
        ]
        extra_kwargs = {
            'contrasena': {'write_only': True, 'required': False}
        }

class ModificarRolSerializer(serializers.Serializer):
    id_rol = serializers.PrimaryKeyRelatedField(
        queryset=Rol.objects.all()
    )