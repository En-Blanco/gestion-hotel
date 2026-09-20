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

  rolSeleccionado: string = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
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

  seleccionarRol(rol: string): void {
    this.rolSeleccionado = rol;
  }

  onSubmit(): void {

  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  const datos = {
    email: this.loginForm.value.email!,
    password: this.loginForm.value.password!
  };

  this.loginService.login(datos).subscribe({
    next: (respuesta) => {

      if (respuesta.rol === 'cliente') {
        this.router.navigate(['/dashboard-user']);
      }

      if (respuesta.rol === 'administrador') {
        this.router.navigate(['/dashboard-admin']);
      }
    },

    error: (error) => {
      console.error('Error al iniciar sesión', error);
    }
  });
 }
}