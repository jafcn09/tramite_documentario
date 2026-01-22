import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface EncuestaSatisfaccion {
  id: number;
  tramiteId: number;
  usuarioSolicitanteId: number;
  trabajadorEvaluadoId: number;
  token: string;
  calificacionTiempoRespuesta?: number;
  calificacionCalidadRespuesta?: number;
  calificacionClaridad?: number;
  calificacionAmabilidad?: number;
  calificacionResolucion?: number;
  calificacionGeneral?: number;
  comentarios?: string;
  estado: 'PENDIENTE' | 'RESPONDIDA' | 'EXPIRADA' | 'CANCELADA';
  fechaLimite: Date;
  fechaRespuesta?: Date;
  emailEnviado: string;
  emailEnviadoExitoso: boolean;
  intentosEnvio: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ResponderEncuestaRequest {
  token: string;
  calificacionTiempoRespuesta: number;
  calificacionCalidadRespuesta: number;
  calificacionClaridad: number;
  calificacionAmabilidad: number;
  calificacionResolucion: number;
  comentarios?: string;
}

export interface DashboardMetricas {
  estadisticasGenerales: {
    totalEncuestas: number;
    encuestasRespondidas: number;
    encuestasPendientes: number;
    tasaRespuesta: number;
  };
  topTrabajadores: Array<{
    trabajadorId: number;
    promedio: number;
    totalEncuestas: number;
  }>;
  promediosPorCriterio: {
    tiempoRespuesta: number;
    calidadRespuesta: number;
    claridad: number;
    amabilidad: number;
    resolucion: number;
    general: number;
  };
  comentariosRecientes: EncuestaSatisfaccion[];
  distribucionCalificaciones: { [key: number]: number };
}

export interface MetricasTrabajador {
  promedioGeneral: number;
  promedioTiempoRespuesta: number;
  promedioCalidadRespuesta: number;
  promedioClaridad: number;
  promedioAmabilidad: number;
  promedioResolucion: number;
  totalEncuestasRespondidas: number;
  totalEncuestasPendientes: number;
}

@Injectable({
  providedIn: 'root'
})
export class EncuestaSatisfaccionService {
  private apiUrl = `${environment.apiUrl}/api/encuestas-satisfaccion`;

  constructor(private http: HttpClient) { }

  
  obtenerPorToken(token: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/token/${token}`);
  }


  responderEncuesta(request: ResponderEncuestaRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/responder`, request);
  }

  
  obtenerMetricasTrabajador(trabajadorId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/metricas/trabajador/${trabajadorId}`);
  }


  obtenerEncuestasTrabajador(trabajadorId: number, page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());
    return this.http.get(`${this.apiUrl}/trabajador/${trabajadorId}`, { params });
  }


  obtenerComentariosTrabajador(trabajadorId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/trabajador/${trabajadorId}/comentarios`);
  }


  obtenerRankingTrabajadores(minimoEncuestas: number = 3): Observable<any> {
    const params = new HttpParams()
      .set('minimoEncuestas', minimoEncuestas.toString());
    return this.http.get(`${this.apiUrl}/ranking`, { params });
  }


  obtenerTasaRespuesta(): Observable<any> {
    return this.http.get(`${this.apiUrl}/tasa-respuesta`);
  }


  obtenerDashboardMetricas(areaId?: number, fechaInicio?: string, fechaFin?: string): Observable<any> {
    let params = new HttpParams();

    if (areaId) {
      params = params.set('areaId', areaId.toString());
    }
    if (fechaInicio) {
      params = params.set('fechaInicio', fechaInicio);
    }
    if (fechaFin) {
      params = params.set('fechaFin', fechaFin);
    }

    return this.http.get<any>(`${this.apiUrl}/dashboard`, { params });
  }
}