export interface Areas {
  id: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
  usuariosCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  usuario: string;
  tipoDocumento: string;
  numDocumento: string;
  celular?: string;
  direccion?: string;
  foto?: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
  area?: {
    id: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
  };
  accountEnabled: boolean;
  accountLocked: boolean;
  mustChangePassword: boolean;
}