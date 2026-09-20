import { Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Service()
export class RegistroService {

    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/usuarios';

    crearUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
    }
}
