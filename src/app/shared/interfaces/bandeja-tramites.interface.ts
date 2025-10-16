export interface TramiteBandeja {
  id: number;
  codigo: string;
  tipoTramite: {
    id: number;
    nombre: string;
    descripcion: string;
    tiempoEstimado: number;
  };
  asunto: string;
  descripcion: string;
  estado: {
    id: number;
    nombre: string;
    color: string;
    icono: string;
    descripcion: string;
    permiteEdicion: boolean;
  };
  prioridad: {
    id: number;
    nombre: string;
    color: string;
    nivel: number;
    icono: string;
  };
  fechaCreacion: Date;
  fechaActualizacion?: Date;
  fechaVencimiento?: Date;
  fechaAsignacion?: Date;
  solicitante: {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    area: string;
    foto?: string;
  };
  areaOrigen: {
    id: number;
    nombre: string;
  };
  areaDestino: {
    id: number;
    nombre: string;
  };
  trabajadorAsignado?: {
    id: number;
    nombre: string;
    apellidos: string;
  };
  documentos: DocumentoBandeja[];
  historial: HistorialBandeja[];
  observaciones?: string;
  calificacion?: CalificacionRecibida;
  diasTranscurridos: number;
  diasVencimiento?: number;
  requiereAtencion: boolean;
  puedeDerivar: boolean;
  puedeReasignar: boolean;
  ultimaActividad: Date;
  
  respuesta?: string;
  fechaRespuesta?: Date;
  usuarioRespondio?: {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    rol?: string;
  };
  archivosRespuesta?: DocumentoBandeja[];
  contadorProcesados?: number;
  contadorPorProcesar?: number;
}

export interface DocumentoBandeja {
  id: number;
  nombre: string;
  nombreOriginal: string;
  tamano: number;
  tipo: string;
  fechaSubida: Date;
  subidoPor: {
    nombre: string;
    tipo: 'solicitante' | 'trabajador';
  };
  descripcion?: string;
  esActualizado?: boolean; 
  version: number;
}

export interface HistorialBandeja {
  id: number;
  fecha: Date;
  estadoAnterior?: string;
  estadoNuevo: string;
  usuario: string;
  usuarioId: number;
  area?: string;
  descripcion: string;
  observaciones?: string;
  accion: {
    nombre: string;
    icono: string;
    color: string;
  };
  tieneDocumentos: boolean;
  esAutomatico: boolean;
}

export interface CalificacionRecibida {
  id: number;
  estrellas: number;
  comentario: string;
  aspectos: {
    rapidez: number;
    calidad: number;
    comunicacion: number;
    solucion: number;
  };
  fecha: Date;
  trabajadorCalificado: string;
}

export interface FiltrosBandeja {
  estado?: number;
  tipoTramite?: number;
  prioridad?: number;
  areaOrigen?: number;
  asignadoA?: number;
  fechaDesde?: Date;
  fechaHasta?: Date;
  soloVencidos?: boolean;
  soloUrgentes?: boolean;
  soloSinAsignar?: boolean;
  busqueda?: string;
}

export interface CambiarEstadoRequest {
  tramiteId: number;
  nuevoEstadoId: number;
  observaciones?: string;
  documentosAdicionales?: File[];
}

export interface DerivarTramiteRequest {
  tramiteId: number;
  areaDestinoId: number;
  trabajadorAsignadoId?: number;
  observaciones: string;
  documentosAdicionales?: File[];
  mantenerEstado?: boolean;
}

export interface ReasignarTramiteRequest {
  tramiteId: number;
  nuevoTrabajadorId: number;
  observaciones?: string;
}

export interface EstadisticasBandeja {
  totalAsignados: number;
  pendientesRevision: number;
  enProceso: number;
  finalizadosHoy: number;
  vencidos: number;
  promedioAtencion: number; 
  calificacionPromedio: number;
  productividadSemanal: {
    fecha: string;
    completados: number;
  }[];
}

export interface NotificacionBandeja {
  id: number;
  tipo: 'nuevo_tramite' | 'tramite_actualizado' | 'tramite_vencido' | 'calificacion_recibida';
  titulo: string;
  mensaje: string;
  fecha: Date;
  leida: boolean;
  tramiteId?: number;
  icono: string;
  color: string;
}

export interface ConfiguracionBandeja {
  notificaciones: {
    email: boolean;
    sistema: boolean;
    vencimientos: boolean;
    nuevosAsignados: boolean;
    calificaciones: boolean;
  };
  autoAsignacion: boolean;
  tiempoRecordatorio: number; 
  vistaDefecto: 'lista' | 'kanban' | 'calendario';
}

export interface AccionMasiva {
  tramiteIds: number[];
  accion: 'cambiar_estado' | 'derivar' | 'reasignar' | 'marcar_urgente';
  parametros: any;
}

export interface MetricasTrabajador {
  trabajadorId: number;
  nombre: string;
  tramitesAsignados: number;
  tramitesCompletados: number;
  promedioAtencion: number;
  calificacionPromedio: number;
  tramitesVencidos: number;
  eficiencia: number; 
}