from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario, Rol
from .serializers import UsuarioSerializer, RolSerializer
from django.contrib.auth.hashers import check_password

User = get_user_model()

class RolView(APIView):

    def get(self, request):
        try:
            roles = Rol.objects.all()
            serializer = RolSerializer(roles, many=True)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {"error": "no se completó la operación"}, status=status.HTTP_204_NO_CONTENT
      )

class RegistroView(APIView):

    def post(self, request):
        serializer = UsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )
        else:
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