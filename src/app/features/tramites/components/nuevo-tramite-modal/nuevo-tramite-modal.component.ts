import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';
import { 
  Tramite, 
  TipoTramite, 
  PrioridadTramite, 
  DocumentoTramite,
  CrearTramiteRequest 
} from '../../../../shared/interfaces/tramite.interface';

@Component({
  selector: 'app-nuevo-tramite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalBaseComponent],
  templateUrl: './nuevo-tramite-modal.component.html',
  styleUrl: './nuevo-tramite-modal.component.css'
})
export class NuevoTramiteModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() tramiteCreado = new EventEmitter<Tramite>();

  // Formulario
  nuevoTramite: Partial<Tramite> & { tipoId?: number; prioridadId?: number } = {
    asunto: '',
    descripcion: '',
    observaciones: '',
    fechaVencimiento: undefined
  };

  // Datos de catálogo
  tiposTramite: TipoTramite[] = [];
  prioridadesTramite: PrioridadTramite[] = [];

  // Estados del componente
  loading = false;
  archivosSeleccionados: File[] = [];
  documentosAdjuntos: Partial<DocumentoTramite>[] = [];

  // Validaciones
  errors: { [key: string]: string } = {};

  private subscriptions = new Subscription();

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.cargarDatosCatalogo();
    this.resetForm();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private cargarDatosCatalogo() {
    this.subscriptions.add(
      this.tramiteService.getTiposTramite().subscribe(
        tipos => this.tiposTramite = tipos
      )
    );

    this.subscriptions.add(
      this.tramiteService.getPrioridadesTramite().subscribe(
        prioridades => this.prioridadesTramite = prioridades
      )
    );
  }

  private resetForm() {
    this.nuevoTramite = {
      asunto: '',
      descripcion: '',
      observaciones: '',
      fechaVencimiento: undefined
    };
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
    this.errors = {};
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);

      // Validar cada archivo
      for (const archivo of nuevosArchivos) {
        if (this.validarArchivo(archivo)) {
          this.archivosSeleccionados.push(archivo);
          this.documentosAdjuntos.push({
            nombre: archivo.name,
            tipo: archivo.type,
            tamano: archivo.size,
            descripcion: ''
          });
        }
      }

      // Reset del input para permitir seleccionar los mismos archivos nuevamente
      input.value = '';
    }
  }

  private validarArchivo(archivo: File): boolean {
    const tiposPermitidos = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const tamanioMaximo = 10 * 1024 * 1024; // 10MB

    if (!tiposPermitidos.includes(archivo.type)) {
      this.toastService.error('Tipo de archivo no válido', 'Solo se permiten archivos PDF y DOCX');
      return false;
    }

    if (archivo.size > tamanioMaximo) {
      this.toastService.error('Archivo muy grande', 'El archivo no debe superar los 10MB');
      return false;
    }

    return true;
  }

  eliminarArchivo(index: number) {
    this.archivosSeleccionados.splice(index, 1);
    this.documentosAdjuntos.splice(index, 1);
  }

  private validarFormulario(): boolean {
    this.errors = {};
    let esValido = true;

    if (!this.nuevoTramite.asunto?.trim()) {
      this.errors['asunto'] = 'El asunto es obligatorio';
      esValido = false;
    }

    if (!this.nuevoTramite.descripcion?.trim()) {
      this.errors['descripcion'] = 'La descripción es obligatoria';
      esValido = false;
    }

    if (!this.nuevoTramite.tipoId) {
      this.errors['tipoId'] = 'Debe seleccionar un tipo de trámite';
      esValido = false;
    }

    if (!this.nuevoTramite.prioridadId) {
      this.errors['prioridadId'] = 'Debe seleccionar una prioridad';
      esValido = false;
    }

    if (this.nuevoTramite.fechaVencimiento) {
      const fechaVencimiento = new Date(this.nuevoTramite.fechaVencimiento);
      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (fechaVencimiento < hoy) {
        this.errors['fechaVencimiento'] = 'La fecha de vencimiento no puede ser anterior a hoy';
        esValido = false;
      }
    }

    return esValido;
  }

  async onSubmit() {
    if (!this.validarFormulario()) {
      this.toastService.warning('Formulario incompleto', 'Por favor, complete todos los campos obligatorios');
      return;
    }

    this.loading = true;

    try {
      // Procesar archivos a base64
      const archivosBase64 = await this.procesarArchivosABase64();

      // Preparar datos del trámite incluyendo archivos
      const tramiteData: any = {
        tipoTramiteId: Number(this.nuevoTramite.tipoId!),
        asunto: this.nuevoTramite.asunto!,
        descripcion: this.nuevoTramite.descripcion!,
        prioridadId: Number(this.nuevoTramite.prioridadId!),
        fechaVencimiento: this.nuevoTramite.fechaVencimiento ? new Date(this.nuevoTramite.fechaVencimiento) : undefined,
        observaciones: this.nuevoTramite.observaciones,
        documentos: archivosBase64
      };

      // Crear trámite con archivos
      this.subscriptions.add(
        this.tramiteService.crearTramiteConArchivos(tramiteData).subscribe({
          next: (tramiteCreado) => {
            this.toastService.success(
              'Trámite creado',
              `El trámite ${tramiteCreado.codigo} y sus documentos han sido creados exitosamente`
            );

            this.tramiteCreado.emit(tramiteCreado);
            this.onClose();
          },
          error: (error) => {
            this.toastService.error(
              'Error',
              'No se pudo crear el trámite con los archivos. Inténtelo nuevamente.'
            );
          },
          complete: () => {
            this.loading = false;
          }
        })
      );
    } catch (error) {
      this.toastService.error('Error', 'Ocurrió un error inesperado al procesar los archivos');
    } finally {
      this.loading = false;
    }
  }

  private async subirArchivos(tramiteId: number) {
    const promesasSubida = this.archivosSeleccionados.map((archivo) => {
      return this.tramiteService.subirDocumento(tramiteId, archivo).toPromise();
    });

    try {
      await Promise.all(promesasSubida);
    } catch (error) {
      this.toastService.warning(
        'Archivos no subidos',
        'El trámite fue creado pero algunos archivos no pudieron subirse'
      );
    }
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onCancel() {
    this.onClose();
  }

  // Utilidades para el template
  getTipoTramiteNombre(tipoId: number): string {
    const tipo = this.tiposTramite.find(t => t.id === tipoId);
    return tipo?.nombre || '';
  }

  getPrioridadNombre(prioridadId: number): string {
    const prioridad = this.prioridadesTramite.find(p => p.id === prioridadId);
    return prioridad?.nombre || '';
  }

  formatearTamanioArchivo(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getCurrentDate(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  // Método para procesar archivos a base64
  private async procesarArchivosABase64(): Promise<any[]> {
    const archivosBase64: any[] = [];

    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      const archivo = this.archivosSeleccionados[i];
      const descripcion = this.documentosAdjuntos[i]?.descripcion || '';

      try {
        const base64 = await this.convertirArchivoABase64(archivo);
        archivosBase64.push({
          nombre: archivo.name,
          tipo: archivo.type,
          tamano: archivo.size,
          contenido: base64,
          descripcion: descripcion
        });
      } catch (error) {
        throw new Error(`No se pudo procesar el archivo ${archivo.name}`);
      }
    }

    return archivosBase64;
  }

  // Método para convertir archivo a base64
  private convertirArchivoABase64(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Remover el prefijo data:type;base64, para obtener solo el base64
        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(archivo);
    });
  }
}