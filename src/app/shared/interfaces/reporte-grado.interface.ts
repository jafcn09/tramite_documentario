export interface ReporteGrado {
  id?: number;
  gradoId: number;
  alumnoNombre?: string;
  codigoDiploma?: string;
  tipoError: string;
  descripcion: string;
  emailReportante?: string;
  estado: 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO' | 'RECHAZADO';
  fechaCreacion?: Date;
  fechaActualizacion?: Date;
  comentarioAdmin?: string;
}

export interface ReporteRequest {
  gradoId: number;
  tipoError: string;
  descripcion: string;
  emailReportante?: string;
}

export interface UpdateReporteRequest {
  estado: 'PENDIENTE' | 'EN_REVISION' | 'RESUELTO' | 'RECHAZADO';
  comentarioAdmin?: string;
}

export interface ReporteEstadisticas {
  total: number;
  pendientes: number;
  enRevision: number;
  resueltos: number;
  rechazados: number;
}

export interface ReportePorTipo {
  tipoError: string;
  cantidad: number;
}
