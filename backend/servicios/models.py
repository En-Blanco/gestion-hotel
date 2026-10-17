from django.db import models

class Servicio(models.Model):

    id_servicio = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    detalle = models.CharField(max_length=255)
    precio = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return self.nombre
