import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

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

  constructor(private router: Router) {}

  seleccionarRol(rol: string): void {
    this.rolSeleccionado = rol;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    if (this.rolSeleccionado === 'cliente') {
      this.router.navigate(['/dashboard-user']);
    }

    if (this.rolSeleccionado === 'administrador') {
      this.router.navigate(['/dashboard-admin']);
    }
  }
}