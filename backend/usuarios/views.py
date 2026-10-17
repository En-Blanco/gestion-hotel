from django.contrib.auth import authenticate, get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

User = get_user_model()


class LoginView(APIView):

    def post(self, request):
        correo = request.data.get('correo', '').strip()
        contrasena = request.data.get('contrasena', '')

        if not correo or not contrasena:
            return Response(
                {'error': 'El correo y la contraseña son obligatorios.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        usuario = User.objects.filter(email__iexact=correo).first()

        if usuario is None:
            return Response(
                {'error': 'Correo o contraseña incorrectos.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        usuario_autenticado = authenticate(
            request,
            username=usuario.username,
            password=contrasena
        )

        if usuario_autenticado is None:
            return Response(
                {'error': 'Correo o contraseña incorrectos.'},
                status=status.HTTP_401_UNAUTHORIZED
            )

        try:
            perfil = usuario_autenticado.perfil
        except User.perfil.RelatedObjectDoesNotExist:
            return Response(
                {'error': 'El usuario no tiene un perfil asignado.'},
                status=status.HTTP_403_FORBIDDEN
            )

        return Response(
            {
                'id': usuario_autenticado.id,
                'correo': usuario_autenticado.email,
                'nombre': usuario_autenticado.first_name,
                'apellido': usuario_autenticado.last_name,
                'dni': perfil.dni,
                'id_rol': perfil.rol
            },
            status=status.HTTP_200_OK
        )