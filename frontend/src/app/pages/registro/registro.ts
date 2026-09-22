import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeaderAlt } from "../../components/header-alt/header-alt";
import { RegistroService } from '../../services/registro.service';
import { ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Usuario } from '../../models/usuario';

function validadorContraseñasIguales(form: any) {

  const clave1 = form.get('contrasena1')?.value;
  const clave2 = form.get('contrasena2')?.value;

  if (!clave1 || !clave2) {
    return null;
  }
  if (clave1 !== clave2) {
    return { noCoinciden: true };
  }
  return null; 
}

@Component({
  imports: [RouterLink, HeaderAlt, ReactiveFormsModule],
  selector: 'app-registro',
  styleUrl: './registro.css',
  templateUrl: './registro.html',
})
export class Registro implements OnInit {
  constructor(private RegistroService:RegistroService, private router: Router){}

  idRolEstandar: number | null = null;

  ngOnInit(): void {
    this.obtenerIdRol();
  }

  registroForm = new FormGroup({
    dni: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{7,8}$/) // Assuming DNI is 7 or 8 digits
    ]),
    nombre: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z]+$/) // Assuming nombre contains only letters
    ]),
    apellido: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern(/^[a-zA-Z]+$/) // Assuming apellido contains only letters
    ]),
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    telefono: new FormControl('', [
      Validators.required,
    ]),
    contrasena1: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ]),
    contrasena2: new FormControl('', [
      Validators.required,
      Validators.minLength(8)
    ])
  },{ validators: validadorContraseñasIguales });

  obtenerIdRol(): void {
    this.RegistroService.getRolUsuario('Estándar').subscribe({
      next: (rol) => {
        this.idRolEstandar = rol.id;
      },
      error: (err) => {
        console.error('Error al obtener los roles:', err);
      }
    });
  }

  onSubmit(event: Event): void {
    if (this.registroForm.valid)
    {
      const form = this.registroForm.getRawValue();
      const usuario: Usuario = {
      dni: Number(form.dni!.replace(/\./g, '')),
      nombre: form.nombre!,
      apellido: form.apellido!,
      correo: form.correo!,
      telefono: Number(form.telefono!),
      contrasena: form.contrasena1!,
      id_rol: this.idRolEstandar ?? 1
      };

      this.RegistroService.crearUsuario(usuario).subscribe({
        next: data => {
          // Quiero mandar un mensaje de exito al html
          this.registroForm.setErrors({ 'success': 'Usuario creado. Sera redirigido a inicio de sesion. Espere unos segundos por favor.' });
          // Aguanto unos segundos antes de redirigir
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 3000); // 3 segundos de espera antes de redirigir
      },
        error: error=> {
          this.registroForm.setErrors({ 'error': 'Error al crear el usuario. Intente de nuevo' });
        }
      })
    }
    else
    {
      this.registroForm.markAllAsTouched();
      return;
    }
  }

}
