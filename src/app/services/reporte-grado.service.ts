import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  ReporteGrado,
  ReporteRequest,
  UpdateReporteRequest,
  ReporteEstadisticas,
  ReportePorTipo
} from '../shared/interfaces/reporte-grado.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporteGradoService {
  private apiUrl = `${environment.apiUrl}/api/reportes-grados`;

  constructor(private http: HttpClient) {}


  crearReporte(request: ReporteRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, request);
  }


  listarTodos(): Observable<ReporteGrado[]> {
    return this.http.get<ReporteGrado[]>(this.apiUrl);
  }


  listarPaginado(page: number = 0, size: number = 10, sortBy: string = 'fechaCreacion', direction: string = 'DESC'): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    return this.http.get<any>(`${this.apiUrl}/paginado`, { params });
  }

  listarPorEstado(estado: string): Observable<ReporteGrado[]> {
    return this.http.get<ReporteGrado[]>(`${this.apiUrl}/estado/${estado}`);
  }

  listarPorEstadoPaginado(estado: string, page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/estado/${estado}/paginado`, { params });
  }

  listarPorGrado(gradoId: number): Observable<ReporteGrado[]> {
    return this.http.get<ReporteGrado[]>(`${this.apiUrl}/grado/${gradoId}`);
  }

  obtenerPorId(id: number): Observable<ReporteGrado> {
    return this.http.get<ReporteGrado>(`${this.apiUrl}/${id}`);
  }

  actualizarEstado(id: number, request: UpdateReporteRequest): Observable<ReporteGrado> {
    return this.http.put<ReporteGrado>(`${this.apiUrl}/${id}`, request);
  }


  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  obtenerEstadisticas(): Observable<ReporteEstadisticas> {
    return this.http.get<ReporteEstadisticas>(`${this.apiUrl}/estadisticas`);
  }

  obtenerReportesPorTipo(): Observable<ReportePorTipo[]> {
    return this.http.get<ReportePorTipo[]>(`${this.apiUrl}/estadisticas/por-tipo`);
  }
}