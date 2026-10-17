from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Habitacion
from .serializers import HabitacionSerializer


class HabitacionView(APIView):

    def get(self, request):

        habitaciones = Habitacion.objects.all()

        serializer = HabitacionSerializer(
            habitaciones,
            many=True
        )

        return Response(serializer.data)
