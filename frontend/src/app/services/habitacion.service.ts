import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion.interface';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8000/api/habitaciones/';

  getHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }
  crearHabitacion(habitacion: Habitacion): Observable<Habitacion> {
    return this.http.post<Habitacion>(this.apiUrl, habitacion);
  }

  actualizarHabitacion(numero: number, habitacion: Habitacion): Observable<Habitacion> {
    return this.http.put<Habitacion>(`${this.apiUrl}${numero}/`, habitacion);
  }

  desactivarHabitacion(numero: number): Observable<Habitacion> {
    return this.http.delete<Habitacion>(`${this.apiUrl}${numero}/`);
  }

}
