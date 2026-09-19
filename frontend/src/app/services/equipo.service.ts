import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo.interface';

@Injectable({
  providedIn: 'root',
})
export class EquipoService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/equipo';

  getEquipo(): Observable<Equipo[]> {
    return this.http.get<Equipo[]>(this.apiUrl);
  }
}
