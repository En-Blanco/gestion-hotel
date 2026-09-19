import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Servicio } from '../models/servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/servicios';

  getServicios(): Observable<Servicio[]> {
    return this.http.get<Servicio[]>(this.apiUrl);
  }
}
