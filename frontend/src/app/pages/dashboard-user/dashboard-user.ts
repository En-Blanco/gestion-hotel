import { Component, OnInit } from '@angular/core';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { Footer } from '../../components/footer/footer';

import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.interface';

@Component({
  selector: 'app-dashboard-user',
  imports: [DashboardHeader, Footer],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser implements OnInit {

  habitaciones: Habitacion[] = [];
  mostrarHabitaciones = false;
  mostrarServicios = false;
  mostrarComprobante = false;
  
  constructor(
    private habitacionService: HabitacionService
  ) {}

  ngOnInit(): void {

    this.habitacionService.getHabitaciones().subscribe({
      next: (data) => {

        this.habitaciones = data;

        console.log(
          'Habitaciones cargadas con éxito:',
          this.habitaciones
        );

      },

      error: (err) => {

        console.error(
          'Error al cargar habitaciones:',
          err
        );

      },
    });

  }

  buscarDisponibilidad() {

  // más adelante verifican reservas

  this.mostrarHabitaciones = true;
  }

  confirmarHabitacion() {

  this.mostrarServicios = true;

  }

  confirmarReserva() {

  this.mostrarComprobante = true;

  }

}