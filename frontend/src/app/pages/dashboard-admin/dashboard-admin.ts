import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { ReservaService } from '../../services/reserva.service';
import { HabitacionService } from '../../services/habitacion.service';
import { Reserva } from '../../models/reserva.interface';
import { Habitacion } from '../../models/habitacion.interface';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardHeader],
  styleUrl: './dashboard-admin.css',
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin implements OnInit {
  private reservaService = inject(ReservaService);
  private habitacionService = inject(HabitacionService);
  private cdr = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];
  habitaciones: Habitacion[] = [];

  mostrarFormHabitacion = false;
  modoEdicion = false;
  habitacionForm: Habitacion = this.formVacio();

  ngOnInit(): void {
    this.cargarReservas();
    this.cargarHabitaciones();
  }

  cargarReservas(): void {
    this.reservaService.getReservas().subscribe({
      next: (data) => {
        this.reservas = data;
        this.cdr.detectChanges();
        console.log('Reservas reales cargadas:', this.reservas);
      },
      error: (err) => console.error('Error al cargar reservas:', err),
    });
  }

  eliminarReserva(id: any): void {
    if (id === undefined || id === null) return;
    if (confirm('¿Estás seguro de que deseás eliminar/cancelar esta reserva?')) {
      this.reservaService.eliminarReserva(Number(id)).subscribe({
        next: () => {
          this.cargarReservas();
        },
        error: (err) => console.error('Error al eliminar reserva:', err),
      });
    }
  }

  cambiarEstado(id: any, nuevoEstado: string = 'Cancelada'): void {
    if (id === undefined || id === null) return;
    this.reservaService.actualizarReserva(Number(id), { estado: nuevoEstado }).subscribe({
      next: () => {
        this.cargarReservas();
      },
      error: (err) => console.error('Error al actualizar estado:', err),
    });
  }

  cargarHabitaciones(): void {
    this.habitacionService.getHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar habitaciones:', err);
      },
    });
  }

  formVacio(): Habitacion {
    return { numero: 0, tipo: '', precio: 0, estado: 'Activa', imagen: '' };
  }

  abrirFormularioNuevo(): void {
    this.modoEdicion = false;
    this.habitacionForm = this.formVacio();
    this.mostrarFormHabitacion = true;
  }

  abrirFormularioEdicion(habitacion: Habitacion): void {
    this.modoEdicion = true;
    this.habitacionForm = { ...habitacion };
    this.mostrarFormHabitacion = true;
  }

  cancelarFormulario(): void {
    this.mostrarFormHabitacion = false;
  }

  guardarHabitacion(): void {
    if (this.modoEdicion) {
      this.habitacionService
        .actualizarHabitacion(this.habitacionForm.numero, this.habitacionForm)
        .subscribe({
          next: () => {
            this.cargarHabitaciones();
            this.mostrarFormHabitacion = false;
            this.cdr.detectChanges();
          },
          error: (err) => console.error('Error al actualizar habitación:', err),
        });
    } else {
      this.habitacionService.crearHabitacion(this.habitacionForm).subscribe({
        next: () => {
          this.cargarHabitaciones();
          this.mostrarFormHabitacion = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al crear habitación:', err),
      });
    }
  }

  toggleEstadoHabitacion(habitacion: Habitacion): void {
    const nuevoEstado = habitacion.estado === 'Activa' ? 'Inactiva' : 'Activa';
    const habitacionActualizada: Habitacion = { ...habitacion, estado: nuevoEstado };

    this.habitacionService
      .actualizarHabitacion(habitacion.numero, habitacionActualizada)
      .subscribe({
        next: (actualizada) => {
          habitacion.estado = actualizada.estado;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al cambiar estado:', err),
      });
  }
}
