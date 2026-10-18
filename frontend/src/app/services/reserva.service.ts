import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../models/reserva.interface';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  private http = inject(HttpClient);

  private apiUrl = 'http://127.0.0.1:8000/api/reservas/';

  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  crearReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  actualizarReserva(id: number, reserva: Partial<Reserva>): Observable<Reserva> {
    return this.http.patch<Reserva>(`${this.apiUrl}${id}/`, reserva);
  }

  eliminarReserva(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${id}/`);
  }
}
