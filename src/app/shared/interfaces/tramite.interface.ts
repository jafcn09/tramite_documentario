export interface Tramite {
  id?: number;
  codigo: string;
  tipoTramite: TipoTramite;
  asunto: string;
  descripcion: string;
  prioridad: PrioridadTramite;
  estado: EstadoTramite;
  fechaCreacion: Date;
  fechaActualizacion?: Date;
  fechaVencimiento?: Date;
  fechaRespuesta?: Date;
  solicitante: Usuario;
  areaOrigen: Area;
  areaDestino?: Area;
  trabajadorAsignado?: Usuario;
  usuarioRespondio?: Usuario;
  observaciones?: string;
  respuesta?: string;
  documentos: DocumentoTramite[];
  historial: HistorialTramite[];
}

export interface TipoTramite {
  id: number;
  nombre: string;
  descripcion: string;
  requiereAprobacion: boolean;
  tiempoEstimado: number; // en días
  activo: boolean;
}

export interface EstadoTramite {
  id: number;
  nombre: string;
  descripcion: string;
  color: string;
  icono: string;
  esFinal: boolean;
  permiteEdicion: boolean;
}

export interface PrioridadTramite {
  id: number;
  nombre: string;
  descripcion?: string;
  nivel: number;
  color: string;
  icono: string;
}

export interface DocumentoTramite {
  id?: number;
  tramiteId: number;
  nombre: string;
  nombreOriginal: string;
  ruta: string;
  tamano: number;
  tipo: string;
  descripcion?: string;
  fechaSubida: Date;
  usuarioSubida: Usuario;
  esEscaneado?: boolean;
  version: number;
}

export interface HistorialTramite {
  id: number;
  tramiteId: number;
  estadoAnterior?: EstadoTramite;
  estadoNuevo: EstadoTramite;
  usuario: Usuario;
  fecha: Date;
  descripcion?: string;
  observaciones?: string;
  accion: AccionTramite;
  area?: Area;
}

export interface AccionTramite {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  color: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  usuario: string;
  foto?: string;
  area: Area;
  role: Role;
}

export interface Area {
  id: number;
  nombre: string;
  descripcion: string;
  activa: boolean;
}

export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface FiltrosTramite {
  tipoTramite?: number;
  estado?: number;
  prioridad?: number;
  areaOrigen?: number;
  areaDestino?: number;
  trabajadorAsignado?: number;
  fechaDesde?: Date;
  fechaHasta?: Date;
  busqueda?: string;
}

export interface CrearTramiteRequest {
  tipoTramiteId: number;
  asunto: string;
  descripcion: string;
  prioridadId: number;
  areaDestinoId?: number;
  fechaVencimiento?: Date;
  documentos?: File[];
}

export interface ActualizarEstadoRequest {
  tramiteId: number;
  nuevoEstadoId: number;
  observaciones?: string;
  trabajadorAsignadoId?: number;
}

export interface PaginacionResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}