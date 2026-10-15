from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from .models import MiembroEquipo
from .serializers import MiembroEquipoSerializer


class MiembroEquipoView(APIView):

    def get(self, request):
        miembros = MiembroEquipo.objects.all()
        serializer = MiembroEquipoSerializer(miembros, many=True)
        return Response(serializer.data)
