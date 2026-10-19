from django.shortcuts import render

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import (Reserva, ReservaServicio)
from .serializers import (ReservaSerializer, ReservaServicioSerializer)


class ReservaView(APIView):

    def get(self, request):

        reservas = Reserva.objects.all()

        serializer = ReservaSerializer(reservas, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = ReservaSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservaServicioView(APIView):

    def get(self, request):

        relaciones = ReservaServicio.objects.all()

        serializer = ReservaServicioSerializer(relaciones, many=True)

        return Response(serializer.data)

    def post(self, request):

        serializer = ReservaServicioSerializer(data=request.data)

        if serializer.is_valid():

            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ReservaDetalleView(APIView):

    def get_object(self, pk):
        try:
            return Reserva.objects.get(pk=pk)
        except Reserva.DoesNotExist:
            return None

    def patch(self, request, pk):
        reserva = self.get_object(pk)
        if not reserva:
            return Response({"error": "Reserva no encontrada"},
                            status=status.HTTP_404_NOT_FOUND)

        serializer = ReservaSerializer(reserva,
                                       data=request.data,
                                       partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        reserva = self.get_object(pk)
        if not reserva:
            return Response({"error": "Reserva no encontrada"},
                            status=status.HTTP_404_NOT_FOUND)

        reserva.delete()
        return Response({"mensaje": "Reserva eliminada correctamente"},
                        status=status.HTTP_200_OK)
