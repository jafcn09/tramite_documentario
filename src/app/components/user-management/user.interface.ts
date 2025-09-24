export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface User {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  usuario: string;
  celular: string;
  direccion: string;
  tipoDocumento: string;
  numDocumento: string;
  foto: string;
  accountEnabled: boolean;
  accountLocked: boolean;
  mustChangePassword: boolean;
  role: {
    id: number;
    name: string;
    description: string;
  };
  area: {
    id: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
  } | null;
}

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
}