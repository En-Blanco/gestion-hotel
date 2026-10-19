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
      Validators.required,
      Validators.minLength(8)
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

      next: (usuario) => {

        localStorage.setItem(
          'usuarioLogueado',
          JSON.stringify(usuario)
        );

        if (usuario.id_rol === 2) {
          this.router.navigate(['/dashboard-user']);
        } else if (usuario.id_rol === 1) {
          this.router.navigate(['/dashboard-admin']);
        }
      },

      error: (error) => {

        if (error.status === 400 || error.status === 401) {
          this.loginForm.controls.password.setErrors({
            incorrect: true
          });
        } else {
          this.loginForm.setErrors({
            error: true
          });
        }

        console.error('Error al iniciar sesión:', error);
      }
    });
  }
}