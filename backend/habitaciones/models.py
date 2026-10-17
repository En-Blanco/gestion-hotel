from django.db import models

class Habitacion(models.Model):

    numero = models.IntegerField(unique=True)
    tipo = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10,decimal_places=2)
    estado = models.CharField(max_length=20)
    imagen = models.CharField(max_length=255)

    def _str_(self):
        return f"Habitación {self.numero}"
