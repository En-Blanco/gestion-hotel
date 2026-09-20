import { Component } from '@angular/core';
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
export class Registro {
  constructor(private RegistroService:RegistroService, private router: Router){}

  registroForm = new FormGroup({
    dni: new FormControl('', [
      Validators.required,
    ]),
    nombre: new FormControl('', [
      Validators.required,
    ]),
    apellido: new FormControl('', [
      Validators.required,
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
      Validators.required
    ])
  },{ validators: validadorContraseñasIguales });

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
      id_rol: 1 //Usuarios por crear serán estándar
      };

      this.RegistroService.crearUsuario(usuario).subscribe({
        next: data => {
          console.log("Proceso exitoso, se devuelve: ",data)
          this.router.navigate(['/login']);
      },
        error: error=> {
          console.error(error);
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
