from django.db import models

class Rol(models.Model):
    
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=50)

    def __str__(self): return self.nombre

class Usuario(models.Model):

    dni = models.CharField(primary_key=True, max_length=8)
    nombre = models.CharField(max_length=50)
    apellido = models.CharField(max_length=50)
    correo = models.EmailField(max_length=100, unique=True)
    telefono = models.CharField(max_length=20)
    contrasena = models.CharField(max_length=100)
    id_rol = models.ForeignKey(Rol,on_delete=models.CASCADE)

    def __str__(self): return f"{self.nombre} ({self.id_rol})"