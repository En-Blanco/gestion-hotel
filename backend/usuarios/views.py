
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import check_password

from .models import Usuario, Rol
from .serializers import RegistroSerializer, RolSerializer
from django.shortcuts import get_object_or_404
from .serializers import UsuarioAdminSerializer, ModificarRolSerializer

class RolView(APIView):

    def get(self, request):
        roles = Rol.objects.all()
        serializer = RolSerializer(roles, many=True)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )


class RegistroView(APIView):

    def post(self, request):
        serializer = RegistroSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {'mensaje': 'Usuario creado correctamente.'},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class LoginView(APIView):

    def post(self, request):
        correo = request.data.get('correo', '').strip()
        contrasena = request.data.get('contrasena', '')

        if not correo or not contrasena:
            return Response(
                {'error': 'El correo y la contraseña son obligatorios.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario = Usuario.objects.filter(
            correo__iexact=correo
        ).first()

        if usuario is None or not check_password(
            contrasena, usuario.contrasena
        ):
            return Response(
                {'error': 'Correo o contraseña incorrectos.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        return Response(
            {
                'dni': usuario.dni,
                'correo': usuario.correo,
                'nombre': usuario.nombre,
                'apellido': usuario.apellido,
                'id_rol': usuario.id_rol_id,
                'rol': usuario.id_rol.nombre
            },
            status=status.HTTP_200_OK
        )


class UsuariosView(APIView):

    def get(self, request):
        usuarios = Usuario.objects.select_related(
            'id_rol'
        ).order_by('apellido', 'nombre')

        serializer = UsuarioAdminSerializer(
            usuarios,
            many=True
        )

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class ModificarRolView(APIView):

    def patch(self, request, dni):
        usuario = get_object_or_404(
            Usuario,
            dni=dni
        )

        serializer = ModificarRolSerializer(
            data=request.data
        )

        if serializer.is_valid():
            usuario.id_rol = serializer.validated_data['id_rol']
            usuario.save(update_fields=['id_rol'])

            return Response(
                UsuarioAdminSerializer(usuario).data,
                status=status.HTTP_200_OK
            )
        else:
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )

class EliminarUsuarioView(APIView):

    def delete(self, request, dni):
        usuario = get_object_or_404(
            Usuario,
            dni=dni
        )

        usuario.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
