import { Usuario } from './tramite.interface';

export interface FirmaDigital {
  id?: number;
  tramiteId: number;
  firmante: Usuario;
  tipoFirma: TipoFirma;
  estadoFirma: EstadoFirma;
  documentoOriginalPath?: string;
  documentoFirmadoPath?: string;
  hashDocumento?: string;
  certificadoSerial?: string;
  algoritmoFirma?: string;
  fechaFirma?: Date;
  fechaCreacion?: Date;
  fechaVencimiento?: Date;
  razonFirma?: string;
  ubicacionFirma?: string;
  contactoFirmante?: string;
  ipFirma?: string;
  userAgent?: string;
  validacionCertificado?: boolean;
  motivoInvalidacion?: string;
  observaciones?: string;
  autorizadoPor?: Usuario;
  fechaAutorizacion?: Date;
  motivoAutorizacion?: string;
  estadoAutorizacion: EstadoAutorizacion;
  documentosAdjuntos?: string;
  hashDocumentosAdjuntos?: string;
  cantidadDocumentos?: number;
  nivelAutorizacionRequerido?: number;
  requierePinAdicional?: boolean;
  tokenAutorizacion?: string;
  expiraEn?: Date;
}

export enum TipoFirma {
  SIMPLE = 'SIMPLE',
  AVANZADA = 'AVANZADA',
  CUALIFICADA = 'CUALIFICADA',
  APROBACION = 'APROBACION',
  RECHAZO = 'RECHAZO',
  REVISION = 'REVISION',
  CONFORMIDAD = 'CONFORMIDAD'
}

export enum EstadoFirma {
  PENDIENTE = 'PENDIENTE',
  FIRMADO = 'FIRMADO',
  RECHAZADO = 'RECHAZADO',
  EXPIRADO = 'EXPIRADO',
  REVOCADO = 'REVOCADO',
  INVALIDADO = 'INVALIDADO',
  ERROR = 'ERROR',
  VERIFICANDO = 'VERIFICANDO',
  VERIFICADO = 'VERIFICADO'
}

export enum EstadoAutorizacion {
  PENDIENTE = 'PENDIENTE',
  AUTORIZADO = 'AUTORIZADO',
  DENEGADO = 'DENEGADO',
  REVOCADO = 'REVOCADO',
  EXPIRADO = 'EXPIRADO',
  NO_REQUERIDO = 'NO_REQUERIDO'
}

export interface FirmaDigitalRequest {
  tramiteId: number;
  firmanteId: number;
  tipoFirma: TipoFirma;
  razonFirma: string;
  ubicacionFirma?: string;
  contactoFirmante?: string;
  observaciones?: string;
  documentosAdjuntos?: DocumentoAdjuntoRequest[];
  nivelAutorizacionRequerido?: number;
  requierePinAdicional?: boolean;
  expiraEn?: Date;
  motivoSolicitud?: string;
  certificadoSerial?: string;
  algoritmoFirma?: string;
  hashDocumento?: string;
}

export interface DocumentoAdjuntoRequest {
  nombreArchivo: string;
  contenidoBase64: string;
  tipoContenido: string;
  descripcion?: string;
  tamaño?: number;
}

export interface FirmarDocumentoRequest {
  firmaId: number;
  pinCertificado: string;
  ubicacionFirma: string;
  contactoFirmante?: string;
  razonAdicional?: string;
  codigoValidacion?: string;
  certificadoSerial: string;
  algoritmoFirma: string;
  hashDocumento: string;
  documentoFirmadoBase64?: string;
  versionCertificado?: string;
  emisorCertificado?: string;
  observacionesFirma?: string;
}

export interface AutorizacionFirmaRequest {
  firmaId: number;
  autorizar: boolean;
  motivoAutorizacion: string;
  expiraEn?: Date;
  requierePinAdicional?: boolean;
  observaciones?: string;
  motivoDenegacion?: string;
  motivoRevocacion?: string;
}

export interface FirmaDigitalResponse {
  id: number;
  tramiteId: number;
  firmante: Usuario;
  tipoFirma: TipoFirma;
  estadoFirma: EstadoFirma;
  estadoAutorizacion: EstadoAutorizacion;
  fechaCreacion: Date;
  fechaFirma?: Date;
  razonFirma: string;
  ubicacionFirma?: string;
  autorizadoPor?: Usuario;
  fechaAutorizacion?: Date;
  motivoAutorizacion?: string;
  cantidadDocumentos: number;
  nivelAutorizacionRequerido: number;
  requierePinAdicional: boolean;
  expiraEn?: Date;
  observaciones?: string;
  puedeSerFirmada: boolean;
  esFirmaPendiente: boolean;
  esFirmaValida: boolean;
  requiereAutorizacion: boolean;
  estaAutorizado: boolean;
  autorizacionPendiente: boolean;
  autorizacionDenegada: boolean;
  autorizacionExpirada: boolean;
  tieneDocumentosAdjuntos: boolean;
  nombreCompleto: string;
  descripcionTipoFirma: string;
  descripcionEstado: string;
  descripcionAutorizacion: string;
  nombreAutorizador: string;
  nivelAutorizacionTexto: string;
}

export interface CanvasConfig {
  width: number;
  height: number;
  backgroundColor: string;
  strokeColor: string;
  strokeWidth: number;
  responsive: boolean;
}

export interface FirmaCanvasData {
  canvasData: string;
  width: number;
  height: number;
  timestamp: Date;
  metadata?: {
    userAgent: string;
    ipAddress?: string;
    deviceInfo?: string;
  };
}

export interface ResponderTramiteConFirmaRequest {
  tramiteId: number;
  respuesta: string;
  requiereFirmaDigital: boolean;
  tipoFirma?: TipoFirma;
  razonFirma?: string;
  ubicacionFirma?: string;
  documentosAdjuntos?: DocumentoAdjuntoRequest[];
  nivelAutorizacionRequerido?: number;
}

export interface EstadisticasFirmas {
  totalFirmas: number;
  firmasPendientes: number;
  firmasCompletadas: number;
  firmasRechazadas: number;
  firmasExpiradas: number;
  autorizacionesPendientes: number;
  autorizacionesAprobadas: number;
  autorizacionesDenegadas: number;
  porcentajeCompletadas: number;
  porcentajeAutorizadas: number;
  tiempoPromedioFirma: number;
  firmasPorTipo: { [key in TipoFirma]: number };
  firmasPorEstado: { [key in EstadoFirma]: number };
}

export interface FiltrosFirma {
  estadoFirma?: EstadoFirma[];
  estadoAutorizacion?: EstadoAutorizacion[];
  tipoFirma?: TipoFirma[];
  fechaDesde?: Date;
  fechaHasta?: Date;
  firmanteId?: number;
  tramiteId?: number;
  nivelAutorizacion?: number[];
  requierePinAdicional?: boolean;
}

export interface PaginacionFirmas {
  page: number;
  size: number;
  sort?: string;
  direction?: 'asc' | 'desc';
}

export interface FirmasResponse {
  content: FirmaDigitalResponse[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
}