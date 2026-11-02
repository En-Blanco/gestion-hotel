export interface UsuarioAdmin {
  dni: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  id_rol?: number;
  rol?: string;
  // Solo frontend: no se guarda en la base de datos
  estado?: string;
  contrasena?: string;
}
