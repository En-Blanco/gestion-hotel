export interface Reserva {
  id_reserva?: number;
  dni: string;
  numero: number;
  fecha_reserva: string;
  checkin: string;
  checkout: string;
  estado: string;
}