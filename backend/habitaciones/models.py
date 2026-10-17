from django.db import models

class Habitacion(models.Model):

    numero = models.IntegerField(primary_key=True)
    tipo = models.CharField(max_length=50)
    precio = models.DecimalField(max_digits=10,decimal_places=2)
    estado = models.CharField(max_length=20)
    imagen = models.CharField(max_length=255)

    def __str__(self):
        return f"Habitación {self.numero}"
