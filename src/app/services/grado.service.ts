import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Grado, GradoResponse, GradoStats } from '../shared/interfaces/grado.interface';
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
}