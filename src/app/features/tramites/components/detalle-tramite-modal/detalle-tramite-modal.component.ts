import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';
import { 
  Tramite, 
  DocumentoTramite, 
  HistorialTramite 
} from '../../../../shared/interfaces/tramite.interface';
import { 
  MiTramite, 
  DocumentoMiTramite, 
  HistorialMiTramite 
} from '../../../../shared/interfaces/mis-tramites.interface';
import { MisTramitesService } from '../../../../services/mis-tramites.service';

@Component({
  selector: 'app-detalle-tramite-modal',
  standalone: true,
  imports: [CommonModule, ModalBaseComponent],
  templateUrl: './detalle-tramite-modal.component.html',
  styleUrl: './detalle-tramite-modal.component.css'
})
export class DetalleTramiteModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() show = false;
  @Input() tramite: Tramite | MiTramite | null = null;
  @Output() close = new EventEmitter<void>();

  // Datos completos del trámite
  tramiteCompleto: MiTramite | null = null;
  documentos: DocumentoMiTramite[] = [];
  historial: HistorialMiTramite[] = [];
  totalModificaciones: number = 0;

  // Estados del componente
  loading = false;
  activeTab: 'info' | 'documentos' | 'historial' = 'info';

  // Previsualización de documentos
  showDocumentPreview = false;
  documentoPreview: DocumentoMiTramite | null = null;
  previewUrl: SafeResourceUrl | null = null;

  private subscriptions = new Subscription();

  constructor(
    private tramiteService: TramiteService,
    private misTramitesService: MisTramitesService,
    private toastService: ToastService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    // Si el modal se acaba de abrir y tenemos un trámite, cargar los datos
    if (changes['show'] && changes['show'].currentValue === true && this.tramite?.id) {
      this.cargarDatosDetalle();
    }

    // Si cambia el trámite y el modal está abierto, recargar datos
    if (changes['tramite'] && this.show && this.tramite?.id) {
      this.cargarDatosDetalle();
    }
  }

  ngOnInit() {
    // Solo cargar datos si ya está visible en la inicialización
    if (this.show && this.tramite) {
      this.cargarDatosDetalle();
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private cargarDatosDetalle() {
    if (!this.tramite?.id) return;

    this.loading = true;

    // Cargar datos completos del trámite desde mis-tramites
    this.subscriptions.add(
      this.misTramitesService.getMiTramiteById(this.tramite.id).subscribe({
        next: (tramiteCompleto) => {
          this.tramiteCompleto = tramiteCompleto;
          this.documentos = tramiteCompleto.documentos || [];
          this.historial = tramiteCompleto.historial || [];

          // Cargar historial con conteo de modificaciones
          this.cargarHistorialConConteo();

          this.loading = false;
        },
        error: (error) => {
          // Si falla, usar los datos que ya tenemos
          this.tramiteCompleto = this.tramite as MiTramite;
          this.documentos = (this.tramite as MiTramite).documentos || [];
          this.historial = (this.tramite as MiTramite).historial || [];

          this.loading = false;
        }
      })
    );
  }

  private cargarHistorialConConteo() {
    if (!this.tramite?.id) return;

    this.tramiteService.getHistorialConConteo(this.tramite.id).subscribe({
      next: (response) => {
        this.totalModificaciones = response.totalModificaciones || 0;
        if (response.historial && response.historial.length > 0) {
          this.historial = response.historial.map((evento: any) => ({
            id: evento.id,
            descripcion: this.getDescripcionAccion(evento.accion),
            fecha: evento.fechaAccion,
            usuario: evento.usuario ?
              `${evento.usuario.nombre} ${evento.usuario.apellidos}` :
              'Usuario desconocido',
            area: evento.areaDestino?.nombre || evento.areaOrigen?.nombre || '',
            estadoAnterior: evento.estadoAnterior,
            estadoNuevo: evento.estadoNuevo,
            observaciones: evento.observaciones || evento.motivo || '',
            accion: evento.accion
          }));
        }
      },
      error: (error) => {
        // No es crítico, continuamos sin el conteo
        this.totalModificaciones = 0;
      }
    });
  }

  private getDescripcionAccion(accion: string): string {
    const descripciones: { [key: string]: string } = {
      'CREADO': 'Trámite creado',
      'ASIGNADO': 'Trámite asignado',
      'DERIVADO': 'Trámite derivado',
      'EN_REVISION': 'En revisión',
      'EN_PROCESO': 'En proceso',
      'RESPONDIDO': 'Respuesta enviada',
      'FINALIZADO': 'Trámite finalizado',
      'RECHAZADO': 'Trámite rechazado',
      'MODIFICADO': 'Trámite modificado',
      'DOCUMENTO_AGREGADO': 'Documento agregado',
      'COMENTARIO_AGREGADO': 'Comentario agregado'
    };
    return descripciones[accion] || accion;
  }

  cambiarTab(tab: 'info' | 'documentos' | 'historial') {
    this.activeTab = tab;
  }

  descargarDocumento(documento: DocumentoMiTramite) {
    if (!documento.id) return;

    this.subscriptions.add(
      this.misTramitesService.descargarDocumento(this.tramite!.id!, documento.nombre).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = documento.nombre || 'documento';
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.toastService.error(
            'Error',
            'No se pudo descargar el documento'
          );
        }
      })
    );
  }

  imprimirTramite() {
    if (!this.tramite?.id) return;

    this.subscriptions.add(
      this.misTramitesService.descargarTodosDocumentos(this.tramite.id).subscribe({
        next: (blob) => {
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `tramite-${this.tramite?.codigo}.pdf`;
          link.click();
          window.URL.revokeObjectURL(url);
        },
        error: () => {
          this.toastService.error(
            'Error',
            'No se pudo generar el documento para impresión'
          );
        }
      })
    );
  }

  onClose() {
    this.activeTab = 'info';
    this.documentos = [];
    this.historial = [];
    this.close.emit();
  }
  getEstadoClase(estado: string): string {
    const clases: { [key: string]: string } = {
      'Borrador': 'estado-borrador',
      'Enviado': 'estado-enviado',
      'En Revisión': 'estado-revision',
      'Derivado': 'estado-derivado',
      'Observado': 'estado-observado',
      'Aprobado': 'estado-aprobado',
      'Rechazado': 'estado-rechazado',
      'Finalizado': 'estado-finalizado',
      'Archivado': 'estado-archivado'
    };
    return clases[estado] || 'estado-default';
  }

  getPrioridadClase(prioridad: string): string {
    const clases: { [key: string]: string } = {
      'Baja': 'prioridad-baja',
      'Normal': 'prioridad-normal',
      'Alta': 'prioridad-alta',
      'Urgente': 'prioridad-urgente'
    };
    return clases[prioridad] || 'prioridad-normal';
  }

  formatearFecha(fecha: Date | string): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  formatearFechaCompleta(fecha: Date | string): string {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    return fechaObj.toLocaleDateString('es-PE', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  getEventoIcon(accion?: string): string {
    if (!accion) return 'marker-default';
    const icons: { [key: string]: string } = {
      'CREADO': 'marker-created',
      'ASIGNADO': 'marker-assigned',
      'DERIVADO': 'marker-derivado',
      'EN_REVISION': 'marker-revision',
      'EN_PROCESO': 'marker-proceso',
      'RESPONDIDO': 'marker-respondido',
      'FINALIZADO': 'marker-finalizado',
      'RECHAZADO': 'marker-rechazado',
      'MODIFICADO': 'marker-modificado'
    };
    return icons[accion] || 'marker-default';
  }

  getEventoIconClass(accion?: string): string {
    if (!accion) return 'fa-circle';
    const iconClasses: { [key: string]: string } = {
      'CREADO': 'fa-plus-circle',
      'ASIGNADO': 'fa-user-check',
      'DERIVADO': 'fa-share',
      'EN_REVISION': 'fa-search',
      'EN_PROCESO': 'fa-cog',
      'RESPONDIDO': 'fa-comment-dots',
      'FINALIZADO': 'fa-check-circle',
      'RECHAZADO': 'fa-times-circle',
      'MODIFICADO': 'fa-edit'
    };
    return iconClasses[accion] || 'fa-circle';
  }

  getAccionClase(accion?: string): string {
    if (!accion) return 'badge-default';
    const clases: { [key: string]: string } = {
      'CREADO': 'badge-created',
      'ASIGNADO': 'badge-assigned',
      'DERIVADO': 'badge-derivado',
      'MODIFICADO': 'badge-modificado',
      'FINALIZADO': 'badge-finalizado',
      'RECHAZADO': 'badge-rechazado'
    };
    return clases[accion] || 'badge-default';
  }

  formatearTamanioArchivo(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getDiasTranscurridos(fecha: Date | string): number {
    const fechaObj = typeof fecha === 'string' ? new Date(fecha) : fecha;
    const hoy = new Date();
    const diferencia = hoy.getTime() - fechaObj.getTime();
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  }

  getDiasVencimiento(fechaVencimiento?: Date | string): number | null {
    if (!fechaVencimiento) return null;
    const fechaObj = typeof fechaVencimiento === 'string' ? new Date(fechaVencimiento) : fechaVencimiento;
    const hoy = new Date();
    const diferencia = fechaObj.getTime() - hoy.getTime();
    return Math.ceil(diferencia / (1000 * 60 * 60 * 24));
  }

  getIconoTipoArchivo(tipoArchivo: string): string {
    if (tipoArchivo.includes('pdf')) return 'fas fa-file-pdf';
    if (tipoArchivo.includes('word')) return 'fas fa-file-word';
    if (tipoArchivo.includes('image')) return 'fas fa-file-image';
    return 'fas fa-file';
  }

  getColorIconoArchivo(tipoArchivo: string): string {
    if (tipoArchivo.includes('pdf')) return '#dc3545';
    if (tipoArchivo.includes('word')) return '#2b579a';
    if (tipoArchivo.includes('image')) return '#28a745';
    return '#6c757d';
  }

  // Métodos para previsualización de documentos
  previsualizarDocumento(documento: DocumentoMiTramite) {

    if (!this.tramite?.id || !documento.nombre) {

      this.toastService.warning('Advertencia', 'No se puede previsualizar el documento');
      return;
    }

    // Si es un archivo de Office, mostrar mensaje
    if (this.isOfficeDocument(documento.tipo || '')) {
      
      this.documentoPreview = documento;
      this.showDocumentPreview = true;

      // Forzar detección de cambios
      this.cdr.detectChanges();

      setTimeout(() => {

      }, 100);

      return;
    }

    this.loading = true;

    this.subscriptions.add(
      this.misTramitesService.descargarDocumento(this.tramite.id, documento.nombre!).subscribe({
        next: (blob: Blob) => {

          if (blob.size === 0) {
            
            this.loading = false;
            this.toastService.error('Error', 'El documento está vacío');
            return;
          }

          const url = window.URL.createObjectURL(blob);
         

          this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.documentoPreview = documento;
          this.showDocumentPreview = true;
          this.loading = false;

  

          // Forzar detección de cambios
          this.cdr.detectChanges();
        },
        error: (error) => {

          this.loading = false;
          this.toastService.error('Error', 'No se pudo cargar la vista previa del documento');
        }
      })
    );
  }

  cerrarPreview() {

    this.showDocumentPreview = false;
    this.documentoPreview = null;

    // Liberar la URL del blob si existe
    if (this.previewUrl) {
      const url = this.previewUrl.toString();
      if (url.startsWith('blob:')) {
        window.URL.revokeObjectURL(url);
      }
      this.previewUrl = null;
    }

  }

  descargarDesdePreview() {
    if (this.documentoPreview) {
      this.descargarDocumento(this.documentoPreview);
      this.cerrarPreview();
    }
  }

  // Métodos auxiliares para detectar tipos de archivo
  isPDF(tipo: string): boolean {
    return tipo?.toLowerCase().includes('pdf') || false;
  }

  isImage(tipo: string): boolean {
    const imageTypes = ['image/', 'png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];
    const tipoLower = tipo?.toLowerCase() || '';
    return imageTypes.some(t => tipoLower.includes(t));
  }

  isOfficeDocument(tipo: string): boolean {
    const officeTypes = [
      'word', 'docx', 'doc',
      'excel', 'xlsx', 'xls',
      'powerpoint', 'pptx', 'ppt',
      'msword', 'ms-excel', 'ms-powerpoint',
      'officedocument', 'openxmlformats'
    ];
    const tipoLower = tipo?.toLowerCase() || '';
    return officeTypes.some(t => tipoLower.includes(t));
  }
}