import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QrCodeService } from '../../../services/qr-code.service';
import { ToastService } from '../../../services/toast.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { QRCodeResponse } from '../../interfaces/qr_code.interface';

@Component({
  selector: 'app-qr-code',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="qr-modern-container">
      <div class="qr-header-modern">
        <div class="qr-title-section">
          <div class="qr-icon-badge">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm2 2v2h2V5h-2zm-2 8h2v2h-2v-2zm2 0h2v2h-2v-2zm0 2h2v2h-2v-2zm2-2h2v6h-2v-6zm0-8h2v2h-2V5zm0 2h2v2h-2V7z" fill="currentColor"/>
            </svg>
          </div>
          <div class="qr-title-text">
            <h3>Código QR</h3>
            <p>Verificación digital del trámite</p>
          </div>
        </div>

        <div class="qr-header-actions">
          <button
            *ngIf="!qrData && !loading"
            class="btn-modern btn-primary"
            (click)="generarQR()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4v16m8-8H4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Generar QR
          </button>

          <button
            *ngIf="qrData && !loading"
            class="btn-modern btn-secondary"
            (click)="regenerarQR()">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Regenerar
          </button>
        </div>
      </div>
      <div *ngIf="loading" class="loading-modern">
        <div class="loading-spinner">
          <div class="spinner-ring"></div>
        </div>
        <div class="loading-text">
          <h4>Generando código QR</h4>
          <p>Creando verificación digital segura...</p>
        </div>
      </div>

  
      <div *ngIf="error && !loading" class="error-modern">
        <div class="error-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M15 9l-6 6m0-6l6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div class="error-content">
          <h4>Error al generar QR</h4>
          <p>{{ error }}</p>
          <button class="btn-modern btn-primary" (click)="generarQR()">
            Reintentar
          </button>
        </div>
      </div>

      <div *ngIf="qrData && !loading && !error" class="qr-content-modern">
        <div class="qr-main-section">
          <div class="qr-visual-container">
            <div class="qr-image-frame">
              <img
                *ngIf="qrImageUrl"
                [src]="qrImageUrl"
                alt="Código QR del trámite"
                class="qr-image-modern"
                (error)="onImageError()">
              <div *ngIf="!qrImageUrl" class="qr-placeholder-modern">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 3h6v6H3V3zm0 8h6v6H3v-6zm8-8h6v6h-6V3zm2 2v2h2V5h-2zm-2 8h2v2h-2v-2zm2 0h2v2h-2v-2zm0 2h2v2h-2v-2zm2-2h2v6h-2v-6zm0-8h2v2h-2V5zm0 2h2v2h-2V7z" fill="currentColor"/>
                </svg>
                <span>QR no disponible</span>
              </div>
            </div>

            <div class="qr-stats">
              <div class="stat-item">
                <span class="stat-number">{{ qrData.escaneos || 0 }}</span>
                <span class="stat-label">Verificaciones</span>
              </div>
              <div class="stat-divider"></div>
              <div class="stat-item">
                <span class="stat-number">{{ formatearFechaCortaGeneral(qrData.fechaGeneracion) }}</span>
                <span class="stat-label">Generado</span>
              </div>
            </div>
          </div>

     
          <div class="qr-info-panel">
            <div class="info-group">
              <label class="info-label">Código de verificación</label>
              <div class="info-value-container">
                <div class="code-display">
                  <span class="code-text">{{ qrData.qrCode }}</span>
                  <button class="copy-btn" (click)="copiarCodigo()" title="Copiar código">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="info-group">
              <label class="info-label">URL de verificación pública</label>
              <div class="info-value-container">
                <div class="url-display">
                  <span class="url-text">{{ qrData.qrUrl }}</span>
                  <button class="copy-btn" (click)="copiarUrl()" title="Copiar URL">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" stroke="currentColor" stroke-width="2" fill="none"/>
                      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="info-group">
              <label class="info-label">Detalles de generación</label>
              <div class="info-value-container">
                <div class="details-grid">
                  <div class="detail-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
                      <path d="M12 1v6m0 6v6m11-7h-6m-6 0H1" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>{{ formatearFecha(qrData.fechaGeneracion) }}</span>
                  </div>
                  <div class="detail-chip">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" fill="none"/>
                    </svg>
                    <span>Verificado</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Acciones minimalistas -->
        <div class="qr-actions-modern">
          <button
            class="action-btn primary"
            (click)="descargarQR()"
            [disabled]="!qrImageUrl">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5 5 5-5m-5 5V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Descargar</span>
          </button>

          <button class="action-btn secondary" (click)="abrirEnNuevaVentana()">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6m4-3h6v6m-11 5L21 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Verificar</span>
          </button>

          <button
            class="action-btn secondary"
            (click)="compartir()"
            *ngIf="puedeCompartir">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="5" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="6" cy="12" r="3" stroke="currentColor" stroke-width="2"/>
              <circle cx="18" cy="19" r="3" stroke="currentColor" stroke-width="2"/>
              <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98" stroke="currentColor" stroke-width="2"/>
            </svg>
            <span>Compartir</span>
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-code-container {
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 12px;
      padding: 1.5rem;
      margin: 1rem 0;
    }

    .qr-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
      border-bottom: 1px solid #f3f4f6;
      padding-bottom: 1rem;
    }

    .qr-title {
      margin: 0;
      font-size: 1.25rem;
      font-weight: 600;
      color: #1f2937;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .qr-title i {
      color: #3b82f6;
    }

    .loading-container {
      text-align: center;
      padding: 2rem;
      color: #6b7280;
    }

    .spinner {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .error-container {
      text-align: center;
      padding: 2rem;
    }

    .error-message {
      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      color: #dc2626;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    .qr-content {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: 1.5rem;
      align-items: start;
    }

    .qr-image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      background: #f9fafb;
      border: 2px dashed #d1d5db;
      border-radius: 8px;
      padding: 1rem;
      min-width: 200px;
      min-height: 200px;
    }

    .qr-image {
      max-width: 200px;
      max-height: 200px;
      border-radius: 8px;
    }

    .qr-placeholder {
      text-align: center;
      color: #6b7280;
    }

    .qr-placeholder i {
      font-size: 3rem;
      display: block;
      margin-bottom: 0.5rem;
    }

    .qr-info {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .qr-detail {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .qr-detail label {
      font-weight: 500;
      color: #374151;
      font-size: 0.875rem;
    }

    .qr-code-display, .qr-url-display {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      padding: 0.75rem;
    }

    .code {
      font-family: 'Courier New', monospace;
      font-weight: 600;
      color: #1f2937;
      letter-spacing: 0.05em;
    }

    .url {
      font-size: 0.875rem;
      color: #3b82f6;
      word-break: break-all;
    }

    .btn-copy {
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 4px;
      transition: all 0.2s ease;
    }

    .btn-copy:hover {
      color: #3b82f6;
      background: #eff6ff;
    }

    .date, .count {
      color: #6b7280;
      font-size: 0.875rem;
    }

    .qr-actions-footer {
      grid-column: 1 / -1;
      display: flex;
      gap: 0.75rem;
      justify-content: center;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #f3f4f6;
    }

    .btn {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      text-decoration: none;
      border: none;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background: #3b82f6;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background: #2563eb;
    }

    .btn-success {
      background: #10b981;
      color: white;
    }

    .btn-success:hover:not(:disabled) {
      background: #059669;
    }

    .btn-info {
      background: #0ea5e9;
      color: white;
    }

    .btn-info:hover:not(:disabled) {
      background: #0284c7;
    }

    .btn-outline-primary {
      background: transparent;
      color: #3b82f6;
      border: 1px solid #3b82f6;
    }

    .btn-outline-primary:hover:not(:disabled) {
      background: #3b82f6;
      color: white;
    }

    .btn-outline-secondary {
      background: transparent;
      color: #6b7280;
      border: 1px solid #d1d5db;
    }

    .btn-outline-secondary:hover:not(:disabled) {
      background: #f3f4f6;
    }

    .btn-sm {
      padding: 0.375rem 0.75rem;
      font-size: 0.75rem;
    }

    @media (max-width: 768px) {
      .qr-content {
        grid-template-columns: 1fr;
        text-align: center;
      }

      .qr-actions-footer {
        flex-wrap: wrap;
        justify-content: center;
      }

      .qr-code-display, .qr-url-display {
        flex-direction: column;
        gap: 0.5rem;
      }
    }
  `]
})
export class QrCodeComponent implements OnInit, OnDestroy {
  @Input() tramiteId!: number;

  qrData: QRCodeResponse | null = null;
  qrImageUrl: SafeUrl | null = null;
  loading = false;
  error: string | null = null;
  puedeCompartir = false;

  private subscriptions = new Subscription();

  constructor(
    private qrService: QrCodeService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer
  ) {
    this.puedeCompartir = 'share' in navigator;
  }

  ngOnInit(): void {
    if (this.tramiteId) {
      this.cargarQRExistente();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    if (this.qrImageUrl) {
      URL.revokeObjectURL(this.qrImageUrl as string);
    }
  }

  private cargarQRExistente(): void {
    // Intentar cargar QR existente primero
    this.loading = true;
    const sub = this.qrService.obtenerImagenQR(this.tramiteId).subscribe({
      next: (blob) => {
        this.cargarImagenQR(blob);
        this.loading = false;
      },
      error: () => {
        // Si no existe, no es un error crítico
        this.loading = false;
      }
    });
    this.subscriptions.add(sub);
  }

  generarQR(): void {
    if (!this.tramiteId) {
      this.toastService.error('Error', 'ID de trámite no válido');
      return;
    }

    this.loading = true;
    this.error = null;

    const sub = this.qrService.generarQRTramite(this.tramiteId).subscribe({
      next: (response) => {
        this.qrData = response;
        this.cargarImagenQR();
        this.loading = false;
        this.toastService.success('QR generado', 'Código QR generado exitosamente');
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error al generar código QR';
        this.toastService.error('Error', 'Error al generar código QR');
        console.error('Error generando QR:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  regenerarQR(): void {
    if (!this.tramiteId) {
      this.toastService.error('Error', 'ID de trámite no válido');
      return;
    }

    this.loading = true;
    this.error = null;

    const sub = this.qrService.regenerarQRTramite(this.tramiteId).subscribe({
      next: (response) => {
        this.qrData = response;
        this.cargarImagenQR();
        this.loading = false;
        this.toastService.success('QR regenerado', 'Código QR regenerado exitosamente');
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Error al regenerar código QR';
        this.toastService.error( 'Error' ,'Error al regenerar código QR');
        console.error('Error regenerando QR:', error);
      }
    });
    this.subscriptions.add(sub);
  }

  private cargarImagenQR(blob?: Blob): void {
    if (blob) {
      this.actualizarImagenQR(blob);
      return;
    }

    const sub = this.qrService.obtenerImagenQR(this.tramiteId).subscribe({
      next: (blob) => {
        this.actualizarImagenQR(blob);
      },
      error: (error) => {
        console.error('Error cargando imagen QR:', error);
        this.qrImageUrl = null;
      }
    });
    this.subscriptions.add(sub);
  }

  private actualizarImagenQR(blob: Blob): void {
    if (this.qrImageUrl) {
      URL.revokeObjectURL(this.qrImageUrl as string);
    }
    const url = URL.createObjectURL(blob);
    this.qrImageUrl = this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onImageError(): void {
    this.qrImageUrl = null;
  }

  copiarCodigo(): void {
    if (this.qrData?.qrCode) {
      navigator.clipboard.writeText(this.qrData.qrCode).then(() => {
        this.toastService.success('Éxito', 'Código QR copiado al portapapeles');
      }).catch(() => {
        this.toastService.error('Error', 'Error al copiar código QR');
      });
    }
  }

  copiarUrl(): void {
    if (this.qrData?.qrUrl) {
      navigator.clipboard.writeText(this.qrData.qrUrl).then(() => {
        this.toastService.success('Éxito', 'URL copiada al portapapeles');
      }).catch(() => {
        this.toastService.error('Error', 'Error al copiar URL');
      });
    }
  }

  descargarQR(): void {
    if (this.tramiteId) {
      this.qrService.descargarImagenQR(this.tramiteId, `qr-tramite-${this.tramiteId}.png`);
      this.toastService.success('Éxito', 'Descargando código QR...');
    }
  }

  abrirEnNuevaVentana(): void {
    if (this.qrData?.qrUrl) {
      window.open(this.qrData.qrUrl, '_blank');
    }
  }

  async compartir(): Promise<void> {
    if (!this.puedeCompartir || !this.qrData) {
      return;
    }

    try {
      await navigator.share({
        title: 'Verificación de Trámite',
        text: `Verifica el estado de este trámite usando el código QR: ${this.qrData.qrCode}`,
        url: this.qrData.qrUrl
      });
      this.toastService.success('Éxito', 'Compartido exitosamente');
    } catch (error) {
      // Usuario canceló compartir
    }
  }

  formatearFecha(fecha: Date | string): string {
    if (!fecha) return 'N/A';

    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return date.toLocaleDateString('es-PE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearFechaCortaGeneral(fecha: Date | string): string {
    if (!fecha) return 'N/A';

    const date = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Hoy';
    } else if (diffDays === 2) {
      return 'Ayer';
    } else if (diffDays <= 7) {
      return `${diffDays}d`;
    } else {
      return date.toLocaleDateString('es-PE', {
        day: 'numeric',
        month: 'short'
      });
    }
  }
}