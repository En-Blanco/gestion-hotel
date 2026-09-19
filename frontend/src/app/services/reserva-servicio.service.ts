import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ReservaServicio } from '../models/reserva-servicio.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaServicioService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/reserva_servicio';

  crearRelacion(
    relacion: ReservaServicio
  ): Observable<ReservaServicio> {

    return this.http.post<ReservaServicio>(
      this.apiUrl,
      relacion
    );

  }

}