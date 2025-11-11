import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface TramitePublico {
  id: number;
  codigo: string;
  titulo: string;
  descripcion?: string;
  tipo: string;
  estado: string;
  prioridad: string;
  fechaCreacion: Date | string;
  fechaVencimiento?: Date | string;
  fechaFinalizacion?: Date | string;
  observaciones?: string;

}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TramitePublicoService {
  private apiUrl = `${environment.apiUrl}/api/tramites/public`;

  constructor(private http: HttpClient) {}
  buscarTramites(
    codigo?: string, 
    texto?: string,
    page: number = 0, 
    size: number = 10,
    sortBy: string = 'fechaCreacion',
    sortDir: string = 'desc'
  ): Observable<PaginatedResponse<TramitePublico>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy)
      .set('sortDir', sortDir);

    if (codigo && codigo.trim()) {
      params = params.set('codigo', codigo.trim());
    }

    if (texto && texto.trim()) {
      params = params.set('texto', texto.trim());
    }

    return this.http.get<PaginatedResponse<TramitePublico>>(`${this.apiUrl}/buscar`, { params });
  }


  previsualizarTramite(codigo: string): Observable<TramitePublico> {
    return this.http.get<TramitePublico>(`${this.apiUrl}/preview/${codigo}`);
  }


  descargarArchivo(codigo: string, nombreArchivo: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${codigo}/archivo/${nombreArchivo}`, {
      responseType: 'blob'
    });
  }


  verificarCodigo(codigo: string): Observable<boolean> {
    return new Observable(observer => {
      this.previsualizarTramite(codigo).subscribe({
        next: () => {
          observer.next(true);
          observer.complete();
        },
        error: () => {
          observer.next(false);
          observer.complete();
        }
      });
    });
  }


  obtenerTiposTramite(): string[] {
    return [
      'SOLICITUD',
      'RECLAMO', 
      'CONSULTA',
      'APELACION',
      'CERTIFICACION',
      'LICENCIA',
      'PERMISO',
      'OTROS'
    ];
  }


  obtenerEstadosTramite(): string[] {
    return [
      'ENVIADO',
      'EN_REVISION', 
      'EN_PROCESO',
      'OBSERVADO',
      'FINALIZADO',
      'APROBADO',
      'RECHAZADO'
    ];
  }

  formatearEstado(estado: string): string {
    const estados: { [key: string]: string } = {
      'ENVIADO': 'Enviado',
      'EN_REVISION': 'En Revisión',
      'EN_PROCESO': 'En Proceso',
      'OBSERVADO': 'Observado',
      'FINALIZADO': 'Finalizado',
      'APROBADO': 'Aprobado',
      'RECHAZADO': 'Rechazado'
    };
    return estados[estado] || estado;
  }


  formatearTipo(tipo: string): string {
    const tipos: { [key: string]: string } = {
      'SOLICITUD': 'Solicitud',
      'RECLAMO': 'Reclamo',
      'CONSULTA': 'Consulta', 
      'APELACION': 'Apelación',
      'CERTIFICACION': 'Certificación',
      'LICENCIA': 'Licencia',
      'PERMISO': 'Permiso',
      'OTROS': 'Otros'
    };
    return tipos[tipo] || tipo;
  }

  
  formatearPrioridad(prioridad: string): string {
    const prioridades: { [key: string]: string } = {
      'NORMAL': 'Normal',
      'ALTA': 'Alta',
      'URGENTE': 'Urgente'
    };
    return prioridades[prioridad] || prioridad;
  }

 
  getClaseEstado(estado: string): string {
    const clases: { [key: string]: string } = {
      'ENVIADO': 'badge-secondary',
      'EN_REVISION': 'badge-info',
      'EN_PROCESO': 'badge-primary',
      'OBSERVADO': 'badge-warning',
      'FINALIZADO': 'badge-success',
      'APROBADO': 'badge-success',
      'RECHAZADO': 'badge-danger'
    };
    return clases[estado] || 'badge-secondary';
  }


  getClasePrioridad(prioridad: string): string {
    const clases: { [key: string]: string } = {
  
      'NORMAL': 'prioridad-normal',
      'ALTA': 'prioridad-alta',
      'URGENTE': 'prioridad-urgente'
    };
    return clases[prioridad] || 'prioridad-normal';
  }

  getIconoEstado(estado: string): string {
    const iconos: { [key: string]: string } = {
      'ENVIADO': 'fas fa-paper-plane',
      'EN_REVISION': 'fas fa-search',
      'EN_PROCESO': 'fas fa-cogs',
      'OBSERVADO': 'fas fa-exclamation-triangle',
      'FINALIZADO': 'fas fa-check-circle',
      'APROBADO': 'fas fa-check-double',
      'RECHAZADO': 'fas fa-times-circle'
    };
    return iconos[estado] || 'fas fa-file';
  }

  getIconoTipo(tipo: string): string {
    const iconos: { [key: string]: string } = {
      'SOLICITUD': 'fas fa-file-alt',
      'RECLAMO': 'fas fa-exclamation-circle',
      'CONSULTA': 'fas fa-question-circle',
      'APELACION': 'fas fa-gavel',
      'CERTIFICACION': 'fas fa-certificate',
      'LICENCIA': 'fas fa-id-card',
      'PERMISO': 'fas fa-key',
      'OTROS': 'fas fa-file'
    };
    return iconos[tipo] || 'fas fa-file';
  }


  calcularDiasTranscurridos(fechaCreacion: Date | string): number {
    const ahora = new Date();
    const fecha = new Date(fechaCreacion);
    const diff = ahora.getTime() - fecha.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }


  estaVencido(fechaVencimiento?: Date | string): boolean {
    if (!fechaVencimiento) return false;
    const ahora = new Date();
    const vencimiento = new Date(fechaVencimiento);
    return vencimiento < ahora;
  }

  diasHastaVencimiento(fechaVencimiento?: Date | string): number | null {
    if (!fechaVencimiento) return null;
    const ahora = new Date();
    const vencimiento = new Date(fechaVencimiento);
    const diff = vencimiento.getTime() - ahora.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
}