export interface MiTramite {
  id: number;
  codigo: string;
  tipoTramite: {
    id: number;
    nombre: string;
    descripcion: string;
  };
  asunto: string;
  descripcion: string;
  estado: {
    id: number;
    nombre: string;
    color: string;
    icono: string;
    descripcion: string;
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
  fechaRespuesta?: Date;
  areaDestino?: {
    id: number;
    nombre: string;
  };
  trabajadorAsignado?: {
    id: number;
    nombre: string;
    apellidos: string;
  };
  usuarioRespondio?: {
    id: number;
    nombre: string;
    apellidos: string;
  };
  usuarioSolicitante?: {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
  };
  documentos: DocumentoMiTramite[];
  historial: HistorialMiTramite[];
  observaciones?: string;
  respuesta?: string;
  calificacion?: CalificacionTramite;
  puedeEditar: boolean;
  puedeCalificar: boolean;
  contadorProcesados?: number;
  contadorPorProcesar?: number;
}

export interface DocumentoMiTramite {
  id: number;
  nombre: string;
  nombreOriginal: string;
  tamano: number;
  tipo: string;
  fechaSubida: Date;
  esSubidoPorUsuario: boolean; // true si lo subió el docente, false si lo subió el abogado
  descripcion?: string;
}

export interface HistorialMiTramite {
  id: number;
  fecha: Date;
  estadoAnterior?: string;
  estadoNuevo: string;
  usuario: string;
  area?: string;
  descripcion: string;
  observaciones?: string;
  tieneDocumentos: boolean;
}

export interface CalificacionTramite {
  id?: number;
  estrellas: number; // 1-5
  comentario: string;
  aspectos: AspectosCalificacion;
  fecha?: Date;
}

export interface AspectosCalificacion {
  rapidez: number; // 1-5
  calidad: number; // 1-5
  comunicacion: number; // 1-5
  solucion: number; // 1-5
}

export interface CrearCalificacionRequest {
  tramiteId: number;
  estrellas: number;
  comentario: string;
  aspectos: AspectosCalificacion;
}

export interface EditarMiTramiteRequest {
  asunto: string;
  descripcion: string;
  prioridadId: number;
  areaDestinoId?: number;
  fechaVencimiento?: Date;
  documentosAEliminar?: number[];
  documentosNuevos?: File[];
}

export interface FiltrosMisTramites {
  estado?: number;
  tipoTramite?: number;
  prioridad?: number;
  area?: number;
  fechaDesde?: Date;
  fechaHasta?: Date;
  busqueda?: string;
}

export interface EstadisticasMisTramites {
  total: number;
  borrador: number;
  enviado: number;
  enRevision: number;
  derivado: number;
  observado: number;
  aprobado: number;
  finalizado: number;
  promedioDias: number;
  calificacionPromedio: number;
}

export interface AprobarTramiteRequest {
  tramiteId: number;
  observaciones?: string;
  responsableAsignadoId?: number;
}

export interface AprobarTramiteResponse {
  success: boolean;
  mensaje: string;
  responsableAsignado: {
    id: number;
    nombre: string;
    apellidos: string;
    area: string;
  };
  tramiteActualizado: MiTramite;
}