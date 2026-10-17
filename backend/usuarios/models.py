from django.db import models
from django.contrib.auth.models import User


class PerfilUsuario(models.Model):
    ROLES = [
        (0, 'Administrador'),
        (1, 'Cliente'),
    ]

    usuario = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='perfil'
    )
    dni = models.CharField(max_length=20, unique=True)
    telefono = models.CharField(max_length=30, blank=True)
    rol = models.IntegerField(choices=ROLES, default=1)

    def __str__(self):
        return f"{self.usuario.username} - {self.get_rol_display()}"