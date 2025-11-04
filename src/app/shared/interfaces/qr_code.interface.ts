
export interface QRCodeResponse {
  qrCode: string;
  qrUrl: string;
  fechaGeneracion: Date;
  escaneos: number;
}

export interface TramiteVerificacionResponse {
  tramite: {
    codigo: string;
    asunto: string;
    tipo: string;
    estado: string;
    fechaCreacion: Date;
    fechaActualizacion: Date;
    numeroExpediente: string;
  };
  verificado: boolean;
  fechaVerificacion: Date;
  mensaje: string;
}

export interface QREstadisticasResponse {
  tramiteId: number;
  codigo: string;
  qrCode: string;
  fechaGeneracion: Date;
  totalEscaneos: number;
  estado: string;
}
