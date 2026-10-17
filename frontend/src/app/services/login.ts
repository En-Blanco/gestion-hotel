import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { LoginResponse } from '../models/login-response';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://127.0.0.1:8000/api/usuarios/login/';

  constructor(private http: HttpClient) {}

  login(datos: Login): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, datos);
  }
}