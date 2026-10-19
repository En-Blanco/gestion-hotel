from django.http import Http404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from .models import Servicio
from .serializers import ServicioSerializer


class ServicioView(APIView):

    def get(self, request):

        servicios = Servicio.objects.all()

        serializer = ServicioSerializer(
            servicios,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = ServicioSerializer(
            data=request.data
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class ServicioDetailView(APIView):

    def get_object(self, pk):

        try:
            return Servicio.objects.get(pk=pk)
        except Servicio.DoesNotExist:
            raise Http404

    def _actualizar(self, request, pk, partial):

        servicio = self.get_object(pk)

        serializer = ServicioSerializer(
            servicio,
            data=request.data,
            partial=partial
        )

        if serializer.is_valid():

            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request, pk):

        servicio = self.get_object(pk)

        serializer = ServicioSerializer(servicio)

        return Response(serializer.data)

    def put(self, request, pk):

        return self._actualizar(request, pk, partial=False)

    def patch(self, request, pk):

        return self._actualizar(request, pk, partial=True)

    def delete(self, request, pk):

        servicio = self.get_object(pk)

        servicio.delete()

        return Response(
            {"mensaje": "Servicio eliminado correctamente"},
            status=status.HTTP_200_OK
        )
