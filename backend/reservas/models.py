from django.db import models
from habitaciones.models import Habitacion
from servicios.models import Servicio

class Reserva(models.Model):
    
    dni = models.CharField(max_length=20)
    habitacion = models.ForeignKey(Habitacion,on_delete=models.CASCADE, to_field='numero')
    fecha_reserva = models.DateField()
    checkin = models.DateField()
    checkout = models.DateField()
    estado = models.CharField(max_length=20)
    total = models.DecimalField(max_digits=10,decimal_places=2)

    def __str__(self):
        return f"Reserva {self.id}"

class ReservaServicio(models.Model):
    reserva = models.ForeignKey(Reserva, on_delete=models.CASCADE)
    servicio = models.ForeignKey(Servicio, on_delete=models.CASCADE)


    def __str__(self):
        return f"Reserva {self.reserva.id}"
        return f"Servicio {self.servicio.id}"
