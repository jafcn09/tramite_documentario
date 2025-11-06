export interface Notificacion {
  id: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  prioridad: string;
  esLeida: boolean;
  rutaDestino?: string;
  referenciaId?: number; // ID del trámite o entidad relacionada
  fechaCreacion: Date | string;
  fechaLectura?: Date | string;
  fechaVencimiento?: Date | string;
  metadatos?: any;
}

export interface NotificacionRequest {
  usuarioDestinatarioId?: number;
  roleDestinatario?: string; // Para enviar a todos los usuarios de un rol
  enviarATodos?: boolean; // Para enviar a todos los usuarios del sistema
  titulo: string;
  mensaje: string;
  tipo: string;
  prioridad: string;
  tramiteRelacionadoId?: number;
  areaOrigenId?: number;
  usuarioEmisorId?: number;
  rutaDestino?: string;
  fechaVencimiento?: Date | string;
  metadatos?: any;
}

export interface NotificacionValidationErrors {
  destinatario?: string; // Error general de destinatario
  usuarioDestinatarioId?: string; // Error específico para usuario destinatario
  roleDestinatario?: string; // Error específico para rol destinatario
  titulo?: string;
  mensaje?: string;
  tipo?: string;
  prioridad?: string;
  rutaDestino?: string;
}

export interface RoleInfo {
  id: number;
  name: string;
  description: string;
  userCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export enum TipoDestinatario {
  USUARIO_ESPECIFICO = 'USUARIO_ESPECIFICO',
  ROL_COMPLETO = 'ROL_COMPLETO', 
  TODOS_USUARIOS = 'TODOS_USUARIOS'
}

export enum TipoNotificacion {
  TRAMITE_CREADO = 'TRAMITE_CREADO',
  TRAMITE_APROBADO = 'TRAMITE_APROBADO',
  TRAMITE_RECHAZADO = 'TRAMITE_RECHAZADO',
  TRAMITE_OBSERVADO = 'TRAMITE_OBSERVADO',
  DERIVACION = 'DERIVACION',
  SISTEMA = 'SISTEMA'
}

export enum PrioridadNotificacion {
  BAJA = 'BAJA',
  NORMAL = 'NORMAL',
  ALTA = 'ALTA'
}

export interface NotificacionFiltro {
  tipo?: string;
  prioridad?: string;
  esLeida?: boolean;
  tramiteId?: number;
  fechaDesde?: Date;
  fechaHasta?: Date;
  busqueda?: string;
}

export interface NotificacionEstadisticas {
  totalNotificaciones: number;
  noLeidas: number;
  leidas: number;
  ultimoMes: number;
  [key: string]: any; // Para estadísticas por tipo y prioridad
}

export interface NotificacionGrupo {
  fecha: string;
  notificaciones: Notificacion[];
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface NotificacionConfiguracion {
  recibirEmails: boolean;
  recibirWebSocket: boolean;
  recibirPorTipo: { [key: string]: boolean };
  frecuenciaResumen: string;
}