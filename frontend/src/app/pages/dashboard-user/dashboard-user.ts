import { Component, OnInit } from '@angular/core';

import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { Footer } from '../../components/footer/footer';

import { HabitacionService } from '../../services/habitacion.service';
import { ServicioService } from '../../services/servicio.service';

import { Habitacion } from '../../models/habitacion.interface';
import { Servicio } from '../../models/servicio.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-user',
  imports: [DashboardHeader, Footer, CommonModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser implements OnInit {

  habitaciones: Habitacion[] = [];
  servicios: Servicio[] = [];

  mostrarHabitaciones = false;
  mostrarServicios = false;
  mostrarComprobante = false;

  habitacionSeleccionada = 'Sin seleccionar';

  fechaCheckIn = '';
  fechaCheckOut = '';

  serviciosSeleccionadosTexto = 'Ninguno';

  totalReserva = 0;

  constructor(
    private habitacionService: HabitacionService,
    private servicioService: ServicioService
  ) {}

  ngOnInit(): void {

    this.habitacionService.getHabitaciones().subscribe({

      next: (data) => {

        this.habitaciones = data;

        console.log(
          'Habitaciones cargadas correctamente:',
          this.habitaciones
        );

      },

      error: (err) => {

        console.error(
          'Error al cargar habitaciones:',
          err
        );

      }

    });

    this.servicioService.getServicios().subscribe({

      next: (data) => {

        this.servicios = data;

        console.log(
          'Servicios cargados correctamente:',
          this.servicios
        );

      },

      error: (err) => {

        console.error(
          'Error al cargar servicios:',
          err
        );

      }

    });

  }

  buscarDisponibilidad(): void {

    this.mostrarHabitaciones = true;

  }

  confirmarHabitacion(): void {

    this.mostrarServicios = true;

  }

  confirmarReserva(): void {

    this.mostrarComprobante = true;

  }

}