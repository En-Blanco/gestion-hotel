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

  seleccionarRol(rol: string): void {
    this.rolSeleccionado = rol;
  }

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

        localStorage.setItem(
          'usuarioLogueado',
          JSON.stringify(respuesta)
        );

        if (respuesta.id_rol === 1) {
          this.router.navigate(['/dashboard-user']);
        }

        if (respuesta.id_rol === 0) {
          this.router.navigate(['/dashboard-admin']);
        }
      },

      error: (error) => {
        console.error('Error al iniciar sesión', error);
      }

    });
  }
}