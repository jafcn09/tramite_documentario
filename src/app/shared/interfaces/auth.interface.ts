export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  refreshToken: string;
  redirectUrl: string;
  role: string;
  usuario: any;
  message: string;
  changePasswordRequired?: boolean;
}

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  data?: LoginResponseData;

  token?: string;
  refreshToken?: string;
  redirectUrl?: string;
  role?: string;
  usuario?: any;
  message?: string;
  changePasswordRequired?: boolean;
}

export interface ChangePasswordRequest {
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
  // ✅ NUEVO: Flag para forzar cambio de password en primer login
  mustChangePassword?: boolean;
  // ✅ NUEVO: Estado de cuenta
  accountEnabled?: boolean;
  accountLocked?: boolean;
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