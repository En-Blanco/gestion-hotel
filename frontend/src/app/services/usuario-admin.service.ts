import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioAdmin } from '../models/usuario-admin.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioAdminService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/usuarios/';

  getUsuarios(): Observable<UsuarioAdmin[]> {
    return this.http.get<UsuarioAdmin[]>(`${this.apiUrl}admin/`);
  }

  crearUsuario(usuario: UsuarioAdmin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}registro/`, usuario);
  }

  actualizarUsuario(dni: string, cambios: Partial<UsuarioAdmin>): Observable<UsuarioAdmin> {
    return this.http.patch<UsuarioAdmin>(`${this.apiUrl}admin/${dni}/`, cambios);
  }

  eliminarUsuario(dni: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}admin/${dni}/`);
  }

}
