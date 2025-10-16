import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ResumenGeneral {
  totalTramites: number;
  completados: number;
  enProceso: number;
  vencidos: number;
  rechazados: number;
  observados: number;
}

export interface TramitePorTipo {
  tipo: string;
  cantidad: number;
  completados: number;
  pendientes: number;
}

export interface TramiteUrgente {
  id: number;
  codigo: string;
  asunto: string;
  tipo: string;
  estado: string;
  diasVencido: number;
  responsable: string;
  fechaVencimiento: Date;
}

export interface TramitePorArea {
  area: string;
  total: number;
  completados: number;
  enProceso: number;
  porcentajeCompletado: number;
}

export interface TramitePorUsuario {
  usuario: string;
  area: string;
  tramitesCreados: number;
  tramitesProcesados: number;
  tramitesRechazados: number;
  promedioTiempoRespuesta: number;
}

export interface ReporteCompleto {
  resumenGeneral: ResumenGeneral;
  tramitesPorTipo: TramitePorTipo[];
  tramitesUrgentes: TramiteUrgente[];
  tramitesPorArea: TramitePorArea[];
  tramitesPorUsuario: TramitePorUsuario[];
  fechaGeneracion: Date;
  periodoInicio: Date;
  periodoFin: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private apiUrl = `${environment.apiUrl}/api/reportes`;

  constructor(private http: HttpClient) {}


  obtenerReporteCompleto(fechaInicio?: Date, fechaFin?: Date): Observable<ReporteCompleto> {
    let params: any = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split('T')[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split('T')[0];
    }

    return this.http.get<ReporteCompleto>(this.apiUrl, { params });
  }


  obtenerResumenGeneral(): Observable<ResumenGeneral> {
    return this.http.get<ResumenGeneral>(`${this.apiUrl}/resumen`);
  }


  obtenerTramitesPorTipo(): Observable<TramitePorTipo[]> {
    return this.http.get<TramitePorTipo[]>(`${this.apiUrl}/por-tipo`);
  }


  obtenerTramitesUrgentes(): Observable<TramiteUrgente[]> {
    return this.http.get<TramiteUrgente[]>(`${this.apiUrl}/urgentes`);
  }


  obtenerTramitesPorArea(): Observable<TramitePorArea[]> {
    return this.http.get<TramitePorArea[]>(`${this.apiUrl}/por-area`);
  }


  obtenerTramitesPorUsuario(): Observable<TramitePorUsuario[]> {
    return this.http.get<TramitePorUsuario[]>(`${this.apiUrl}/por-usuario`);
  }

  exportarReporteExcel(fechaInicio?: Date, fechaFin?: Date): Observable<Blob> {
    let params: any = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split('T')[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split('T')[0];
    }

    return this.http.get(`${this.apiUrl}/exportar/excel`, {
      params,
      responseType: 'blob'
    });
  }

  
  exportarReportePDF(fechaInicio?: Date, fechaFin?: Date): Observable<Blob> {
    let params: any = {};
    if (fechaInicio) {
      params.fechaInicio = fechaInicio.toISOString().split('T')[0];
    }
    if (fechaFin) {
      params.fechaFin = fechaFin.toISOString().split('T')[0];
    }

    return this.http.get(`${this.apiUrl}/exportar/pdf`, {
      params,
      responseType: 'blob'
    });
  }
}