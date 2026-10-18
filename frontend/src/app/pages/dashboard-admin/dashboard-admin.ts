import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { HabitacionService } from '../../services/habitacion.service';
import { Habitacion } from '../../models/habitacion.interface';

@Component({
  imports: [DashboardHeader, CommonModule, FormsModule],
  selector: 'app-dashboard-admin',
  styleUrl: './dashboard-admin.css',
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin implements OnInit {

  habitaciones: Habitacion[] = [];

  mostrarFormHabitacion = false;
  modoEdicion = false;

  habitacionForm: Habitacion = this.formVacio();

  constructor(
    private habitacionService: HabitacionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarHabitaciones();
  }

  cargarHabitaciones(): void {
    this.habitacionService.getHabitaciones().subscribe({
      next: (data) => {
        this.habitaciones = data;
        this.cdr.detectChanges();
      },
      error: (err) => { console.error('Error al cargar habitaciones:', err); }
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
      this.habitacionService.actualizarHabitacion(this.habitacionForm.numero, this.habitacionForm).subscribe({
        next: () => {
          this.cargarHabitaciones();
          this.mostrarFormHabitacion = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al actualizar habitación:', err)
      });
    } else {
      this.habitacionService.crearHabitacion(this.habitacionForm).subscribe({
        next: () => {
          this.cargarHabitaciones();
          this.mostrarFormHabitacion = false;
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al crear habitación:', err)
      });
    }
  }

  toggleEstadoHabitacion(habitacion: Habitacion): void {
    const nuevoEstado = habitacion.estado === 'Activa' ? 'Inactiva' : 'Activa';
    const habitacionActualizada: Habitacion = { ...habitacion, estado: nuevoEstado };

    this.habitacionService.actualizarHabitacion(habitacion.numero, habitacionActualizada).subscribe({
      next: (actualizada) => {
        habitacion.estado = actualizada.estado;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cambiar estado:', err)
    });
  }
}
