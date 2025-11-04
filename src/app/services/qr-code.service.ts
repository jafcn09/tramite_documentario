import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { QRCodeResponse, QREstadisticasResponse, TramiteVerificacionResponse } from '../shared/interfaces/qr_code.interface';

@Injectable({
  providedIn: 'root'
})
export class QrCodeService {

  private readonly apiUrl = `${environment.apiUrl}/qr`;

  constructor(private http: HttpClient) { }
  generarQRTramite(tramiteId: number): Observable<QRCodeResponse> {
    return this.http.post<QRCodeResponse>(`${this.apiUrl}/generar/${tramiteId}`, {});
  }
  obtenerImagenQR(tramiteId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/imagen/${tramiteId}`, {
      responseType: 'blob'
    });
  }
  verificarTramitePorQR(codigoQR: string): Observable<TramiteVerificacionResponse> {
    return this.http.get<TramiteVerificacionResponse>(`${this.apiUrl}/verificar/${codigoQR}`);
  }
  obtenerEstadisticasQR(tramiteId: number): Observable<QREstadisticasResponse> {
    return this.http.get<QREstadisticasResponse>(`${this.apiUrl}/estadisticas/${tramiteId}`);
  }
  regenerarQRTramite(tramiteId: number): Observable<QRCodeResponse> {
    return this.http.post<QRCodeResponse>(`${this.apiUrl}/regenerar/${tramiteId}`, {});
  }
  descargarImagenQR(tramiteId: number, nombreArchivo: string = 'qr-codigo.png'): void {
    this.obtenerImagenQR(tramiteId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = nombreArchivo;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error al descargar imagen QR:', error);
      }
    });
  }
  convertirBlobAURL(blob: Blob): string {
    return window.URL.createObjectURL(blob);
  }
  validarFormatoQR(codigoQR: string): boolean {
    if (!codigoQR || codigoQR.trim().length === 0) {
      return false;
    }
    return /^[A-Z0-9]{16}$/.test(codigoQR.trim());
  }
  generarUrlVerificacion(codigoQR: string): string {
    const baseUrl = window.location.origin;
    return `${baseUrl}/buscar?qr=${codigoQR}`;
  }
}