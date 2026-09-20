import { Component } from '@angular/core';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router, RouterLink } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {


  loginForm = new FormGroup({
    correo: new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}



  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const datos = {
      correo: this.loginForm.value.correo!,
      contrasena: this.loginForm.value.password!
    };

    this.loginService.login(datos).subscribe({

      next: (respuesta) => {

  if (respuesta.length === 0) {
    console.log('Correo o contraseña incorrectos');
    return;
  }

  const usuario = respuesta[0];

  if (usuario.contrasena !== datos.contrasena) {
  console.log('Correo o contraseña incorrectos');
  return;
}

  localStorage.setItem(
    'usuarioLogueado',
    JSON.stringify(usuario)
  );

  if (usuario.id_rol === 1) {
    this.router.navigate(['/dashboard-user']);
  }

  if (usuario.id_rol === 0) {
    this.router.navigate(['/dashboard-admin']);
  }
},

      error: (error) => {
        console.error('Error al iniciar sesión', error);
      }

    });
  }
}