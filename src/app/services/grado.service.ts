import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grado, GradoResponse, GradoStats, GradoRequest } from '../shared/interfaces/grado.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GradoService {
  private apiUrl = `${environment.apiUrl}/api/grados`;

  constructor(private http: HttpClient) {}


  consultar(params: { dni?: string; codigo?: string; nombre?: string }): Observable<GradoResponse> {
    let httpParams = new HttpParams();

    if (params.dni) {
      httpParams = httpParams.set('dni', params.dni);
    }
    if (params.codigo) {
      httpParams = httpParams.set('codigo', params.codigo);
    }
    if (params.nombre) {
      httpParams = httpParams.set('nombre', params.nombre);
    }

    return this.http.get<GradoResponse>(`${this.apiUrl}/consulta`, { params: httpParams });
  }

 
  buscarPorDni(dni: string): Observable<Grado[]> {
    return this.http.get<Grado[]>(`${this.apiUrl}/dni/${dni}`);
  }

 
  buscarPorCodigo(codigo: string): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/codigo/${codigo}`);
  }


  listarFacultades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/facultades`);
  }


  listarTipos(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/tipos`);
  }


  obtenerEstadisticas(): Observable<GradoStats> {
    return this.http.get<GradoStats>(`${this.apiUrl}/estadisticas`);
  }



  listarTodosPaginado(page: number = 0, size: number = 20, sortBy: string = 'id', direction: string = 'DESC', facultad?: string, gradoAcademico?: string, busqueda?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('direction', direction);

    if (facultad && facultad !== 'TODAS') {
      params = params.set('facultad', facultad);
    }

    if (gradoAcademico && gradoAcademico !== 'TODOS') {
      params = params.set('gradoAcademico', gradoAcademico);
    }

    if (busqueda && busqueda.trim()) {
      params = params.set('busqueda', busqueda.trim());
    }

    return this.http.get<any>(`${this.apiUrl}/admin/listartodos`, { params });
  }

  obtenerPorId(id: number): Observable<Grado> {
    return this.http.get<Grado>(`${this.apiUrl}/admin/${id}`);
  }

  actualizar(id: number, request: GradoRequest): Observable<Grado> {
    return this.http.put<Grado>(`${this.apiUrl}/admin/${id}`, request);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/admin/${id}`);
  }
}