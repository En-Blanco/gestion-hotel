from django.http import Http404
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Habitacion
from .serializers import HabitacionSerializer


class HabitacionView(APIView):

    def get(self, request):
        habitaciones = Habitacion.objects.all()
        serializer = HabitacionSerializer(habitaciones, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HabitacionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HabitacionDetailView(APIView):

    def get_object(self, numero):
        try:
            return Habitacion.objects.get(pk=numero)
        except Habitacion.DoesNotExist:
            raise Http404

    def put(self, request, numero):
        habitacion = self.get_object(numero)
        serializer = HabitacionSerializer(habitacion, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, numero):
        habitacion = self.get_object(numero)
        habitacion.estado = 'Inactiva'
        habitacion.save()
        serializer = HabitacionSerializer(habitacion)
        return Response(serializer.data, status=status.HTTP_200_OK)
