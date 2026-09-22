export interface Reserva {
  id?: string;
  dni: string;
  numero: number;
  fecha_reserva: string;
  checkin: string;
  checkout: string;
  estado: string;
}