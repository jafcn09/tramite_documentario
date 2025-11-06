export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  redirectUrl?: string;
  role?: string;
  usuario?: any;
  message?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  correo: string;
  foto?: string;
  tipoDocumento?: string;
  numDocumento?: string;
  direccion?: string;
  celular?: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
}

export interface AdministrativeUser {
  id: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  correo: string;
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
  workloadCount: number;
}