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
  puedeEditar: boolean;
  puedeCalificar: boolean;
  contadorProcesados?: number;
  contadorPorProcesar?: number;
  estaVencido?: boolean;
  diasRestantes?: number;
}

export interface DocumentoMiTramite {
  id: number;
  nombre: string;
  nombreOriginal: string;
  tamano: number;
  tipo: string;
  fechaSubida: Date;
  esSubidoPorUsuario: boolean; 
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
  accion?: string;
}

export interface EditarMiTramiteRequest {
  titulo?: string;
  asunto?: string;
  descripcion?: string;
  numeroExpediente?: string;
  observaciones?: string;
  tipo?: string;
  prioridad?: string;
  areaDestinoId?: number;
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