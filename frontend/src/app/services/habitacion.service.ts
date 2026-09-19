import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Habitacion } from '../models/habitacion.interface';

@Injectable({
  providedIn: 'root'
})
export class HabitacionService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/habitaciones';

  getHabitaciones(): Observable<Habitacion[]> {
    return this.http.get<Habitacion[]>(this.apiUrl);
  }
}