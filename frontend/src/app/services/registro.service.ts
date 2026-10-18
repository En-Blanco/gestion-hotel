import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Rol } from '../models/rol';

@Service()
export class RegistroService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:8000/api/usuarios';

    getRolUsuario(): Observable<Rol[]> {
        return this.http.get<Rol[]>(`${this.apiUrl}/roles/`);
    }

    crearUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(`${this.apiUrl}/registro/`, usuario);
    }
}
