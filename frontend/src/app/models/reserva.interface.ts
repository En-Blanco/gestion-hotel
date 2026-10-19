export interface Reserva {
  id?: string;
  dni: string;
  habitacion: number;
  fecha_reserva: string;
  checkin: string;
  checkout: string;
  estado: string;
  total: number;
}