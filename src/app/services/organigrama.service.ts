import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AreaJerarquica } from '../models/organigrama.interface';

@Injectable({
  providedIn: 'root'
})
export class OrganigramaService {
  private readonly API_URL = `${environment.apiUrl}/api/organigrama`;

  constructor(private http: HttpClient) {}

  obtenerOrganigramaCompleto(): Observable<AreaJerarquica[]> {
    return this.http.get<AreaJerarquica[]>(`${this.API_URL}/completo`).pipe(
      catchError(error => {
        console.error('Error al obtener organigrama:', error);
        return of([]);
      })
    );
  }

  obtenerAreasPlanas(): Observable<AreaJerarquica[]> {
    return this.http.get<AreaJerarquica[]>(`${this.API_URL}/areas-planas`).pipe(
      catchError(error => {
        console.error('Error al obtener áreas planas:', error);
        return of([]);
      })
    );
  }

  obtenerSubAreas(areaId: number): Observable<AreaJerarquica> {
    return this.http.get<AreaJerarquica>(`${this.API_URL}/api/sub-areas/${areaId}`).pipe(
      catchError(error => {
        console.error('Error al obtener sub-áreas:', error);
        throw error;
      })
    );
  }

  inicializarEstructura(): Observable<string> {
    return this.http.post<string>(`${this.API_URL}/inicializar`, {}).pipe(
      catchError(error => {
        console.error('Error al inicializar estructura:', error);
        throw error;
      })
    );
  }

  buscarAreaEnOrganigrama(areas: AreaJerarquica[], termino: string): AreaJerarquica[] {
    const resultado: AreaJerarquica[] = [];

    for (const area of areas) {
      if (area.nombre.toLowerCase().includes(termino.toLowerCase()) ||
          area.descripcion?.toLowerCase().includes(termino.toLowerCase()) ||
          area.codigoOrganigrama?.toLowerCase().includes(termino.toLowerCase())) {
        resultado.push({ ...area, expanded: true });
      }

      if (area.subAreas && area.subAreas.length > 0) {
        const subResultados = this.buscarAreaEnOrganigrama(area.subAreas, termino);
        if (subResultados.length > 0) {
          resultado.push({
            ...area,
            expanded: true,
            subAreas: subResultados
          });
        }
      }
    }

    return resultado;
  }

  obtenerRutaCompleta(areas: AreaJerarquica[], areaId: number): string {
    for (const area of areas) {
      if (area.id === areaId) {
        return area.rutaJerarquica || area.nombre;
      }

      if (area.subAreas && area.subAreas.length > 0) {
        const rutaSubArea = this.obtenerRutaCompleta(area.subAreas, areaId);
        if (rutaSubArea) {
          return rutaSubArea;
        }
      }
    }

    return '';
  }

  aplanarOrganigrama(areas: AreaJerarquica[]): AreaJerarquica[] {
    const resultado: AreaJerarquica[] = [];

    for (const area of areas) {
      resultado.push({
        ...area,
        subAreas: []
      });

      if (area.subAreas && area.subAreas.length > 0) {
        resultado.push(...this.aplanarOrganigrama(area.subAreas));
      }
    }

    return resultado;
  }

  contarTotalAreas(areas: AreaJerarquica[]): number {
    let total = areas.length;

    for (const area of areas) {
      if (area.subAreas && area.subAreas.length > 0) {
        total += this.contarTotalAreas(area.subAreas);
      }
    }

    return total;
  }
}