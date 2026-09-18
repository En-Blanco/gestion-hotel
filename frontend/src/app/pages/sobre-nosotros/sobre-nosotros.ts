import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquipoService } from '../../services/equipo.service';
import { Equipo } from '../../models/equipo.interface';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule],
  styleUrl: './sobre-nosotros.css',
  templateUrl: './sobre-nosotros.html',
})
export class SobreNosotros implements OnInit {
  listaEquipo: Equipo[] = [];

  constructor(
    private equipoService: EquipoService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.equipoService.getEquipo().subscribe({
      next: (data) => {
        this.listaEquipo = data;
        this.cdr.detectChanges();
        console.log('Equipo cargado con éxito:', this.listaEquipo);
      },
      error: (err) => {
        console.error('Error al cargar el equipo:', err);
      },
    });
  }
}
