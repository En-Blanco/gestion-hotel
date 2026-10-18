import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHeader } from '../../components/header-dashboard/header-dashboard';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../models/reserva.interface';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, DashboardHeader],
  styleUrl: './dashboard-admin.css',
  templateUrl: './dashboard-admin.html',
})
export class DashboardAdmin implements OnInit {
  private reservaService = inject(ReservaService);
  private cdr = inject(ChangeDetectorRef);

  reservas: Reserva[] = [];

  ngOnInit(): void {
    this.cargarReservas();
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
}
