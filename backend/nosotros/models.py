from django.db import models


class MiembroEquipo(models.Model):
    nombre = models.CharField(max_length=100)
    apellido = models.CharField(max_length=100)
    foto = models.CharField(max_length=255)
    githubUrl = models.URLField(max_length=255)

    def __str__(self):
        return f"{self.nombre} {self.apellido}"
