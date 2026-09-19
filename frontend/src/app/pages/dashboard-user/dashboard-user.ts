import { Component, OnInit } from '@angular/core';

import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { Footer } from '../../components/footer/footer';
import { ReservaServicioService } from '../../services/reserva-servicio.service';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.interface';
import { HabitacionService } from '../../services/habitacion.service';
import { ServicioService } from '../../services/servicio.service';

import { Habitacion } from '../../models/habitacion.interface';
import { Servicio } from '../../models/servicio.interface';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dashboard-user',
  imports: [DashboardHeader, Footer, CommonModule, FormsModule],
  templateUrl: './dashboard-user.html',
  styleUrl: './dashboard-user.css'
})
export class DashboardUser implements OnInit {

  habitaciones: Habitacion[] = [];
  servicios: Servicio[] = [];
  serviciosSeleccionados: Servicio[] = [];
  reservas: Reserva[] = [];
  mostrarHabitaciones = false;
  habitacionesDisponibles: Habitacion[] = [];
  mostrarServicios = false;
  mostrarComprobante = false;

  habitacionSeleccionada: Habitacion | null = null;
  reservaCreada: Reserva | null = null;

  fechaCheckIn = '';
  fechaCheckOut = '';
  
  totalReserva = 0;

  constructor(
    private habitacionService: HabitacionService,
    private servicioService: ServicioService,
    private reservaService: ReservaService,
    private reservaServicioService: ReservaServicioService,
    private cdr: ChangeDetectorRef
    
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
    this.reservaService.getReservas().subscribe({

      next: (data) => {

        this.reservas = data;

        console.log(
          'Reservas cargadas:',
          this.reservas
        );

      },

      error: (err) => {

        console.error(
          'Error al cargar reservas:',
          err
        );

      }

    });
  }

  buscarDisponibilidad(): void {

    if (
      !this.fechaCheckIn ||
      !this.fechaCheckOut
    ) {

      alert(
        'Debe seleccionar fecha de ingreso y egreso'
      );

      return;

    }

    this.habitacionesDisponibles =
      this.habitaciones.filter(
        habitacion =>
          this.estaDisponible(habitacion)
      );

    this.mostrarHabitaciones = true;

  }

  estaDisponible(
    habitacion: Habitacion
  ): boolean {

    const ingresoUsuario = new Date(
      this.fechaCheckIn
    );

    const salidaUsuario = new Date(
      this.fechaCheckOut
    );

    const reservasHabitacion =
      this.reservas.filter(
        reserva =>
          reserva.numero === habitacion.numero
      );

    return !reservasHabitacion.some(
      reserva => {

        const ingresoReserva =
          new Date(reserva.checkin);

        const salidaReserva =
          new Date(reserva.checkout);

        return (
          ingresoUsuario < salidaReserva &&
          salidaUsuario > ingresoReserva
        );

      }
    );

  }

  calcularTotal(): void {

    let total = 0;

    if (this.habitacionSeleccionada) {

      const noches = this.obtenerCantidadNoches();

      total +=
        this.habitacionSeleccionada.precio *
        noches;

    }

    this.serviciosSeleccionados.forEach(servicio => {

      total += servicio.precio;

    });

    this.totalReserva = total;

  }

  seleccionarHabitacion(habitacion: Habitacion): void {

    this.habitacionSeleccionada = habitacion;

    this.calcularTotal();

  }

  confirmarHabitacion(): void {

    this.mostrarServicios = true;

  }

  confirmarReserva(): void {
  
  if (!this.habitacionSeleccionada) {
    console.log('CLICK RESERVA'); //borrar

    alert(
      'Debe seleccionar una habitación'
    );

    return;

  }

  const reserva: Reserva = {

    dni: '12345678', //dni: this.usuarioLogueado.dni
    numero:
      this.habitacionSeleccionada.numero,

    fecha_reserva:
      new Date()
        .toISOString()
        .split('T')[0],

    checkin: this.fechaCheckIn,
    checkout: this.fechaCheckOut,
    estado: 'Confirmada'

  };

  this.reservaService
    .crearReserva(reserva)
    .subscribe({

    next: (data) => {

      this.reservaCreada = data;

      this.serviciosSeleccionados.forEach(
        servicio => {

          this.reservaServicioService
            .crearRelacion({

              id_reserva: data.id!,

              id_servicio:
                servicio.id_servicio

            })

            .subscribe({

              next: () => {

                console.log(
                  `Servicio ${servicio.nombre} asociado a la reserva`
                );

              },

              error: (err) => {

                console.error(
                  'Error al asociar servicio:',
                  err
                );

              }

            });

        }
      );

      this.mostrarComprobante = true;

      this.cdr.detectChanges();

      console.log(
        'mostrarComprobante:',
        this.mostrarComprobante
      );

    }

    });

  }

  toggleServicio(servicio: Servicio): void {

  const existe = this.serviciosSeleccionados.find(
    s => s.id_servicio === servicio.id_servicio
  );

  if (existe) {

    this.serviciosSeleccionados =
      this.serviciosSeleccionados.filter(
        s => s.id_servicio !== servicio.id_servicio
      );

  } else {

    this.serviciosSeleccionados.push(servicio);

  }

  this.calcularTotal();

  }
  obtenerCantidadNoches(): number {

    if (!this.fechaCheckIn || !this.fechaCheckOut) {
      return 0;
    }

    const ingreso = new Date(this.fechaCheckIn);
    const salida = new Date(this.fechaCheckOut);

    const diferencia =
      salida.getTime() - ingreso.getTime();

    return Math.ceil(
      diferencia / (1000 * 60 * 60 * 24)
    );

  }

}
