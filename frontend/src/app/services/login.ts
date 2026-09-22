import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(datos: Login): Observable<LoginResponse[]> {
    const url = `http://localhost:3000/usuarios?correo=${datos.correo}`;

    return this.http.get<LoginResponse[]>(url);
  }
}