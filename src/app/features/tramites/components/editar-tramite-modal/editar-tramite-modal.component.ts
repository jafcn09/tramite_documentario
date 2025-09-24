import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
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
  DocumentoTramite 
} from '../../../../shared/interfaces/tramite.interface';

@Component({
  selector: 'app-editar-tramite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, ModalBaseComponent],
  templateUrl: './editar-tramite-modal.component.html',
  styleUrl: './editar-tramite-modal.component.css'
})
export class EditarTramiteModalComponent implements OnInit, OnDestroy, OnChanges {
  @Input() show = false;
  @Input() tramite: Tramite | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() tramiteActualizado = new EventEmitter<Tramite>();

  // Formulario
  tramiteEditado: Partial<Tramite> & { tipoId?: number; prioridadId?: number } = {};

  // Datos de catálogo
  tiposTramite: TipoTramite[] = [];
  prioridadesTramite: PrioridadTramite[] = [];

  // Estados del componente
  loading = false;
  archivosSeleccionados: File[] = [];
  documentosExistentes: DocumentoTramite[] = [];
  documentosParaEliminar: number[] = [];
  nuevosDocumentos: Partial<DocumentoTramite>[] = [];

  // Validaciones
  errors: { [key: string]: string } = {};

  private subscriptions = new Subscription();

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.cargarDatosCatalogo();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tramite'] && this.tramite) {
      this.inicializarFormulario();
      if (this.show) {
        this.cargarDocumentosExistentes();
      }
    }

    if (changes['show'] && this.show && this.tramite) {
      this.cargarDocumentosExistentes();
    }
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

  private inicializarFormulario() {
    if (!this.tramite) return;

    // Manejo seguro de tipoTramite y prioridad
    let tipoId: number | undefined;
    let prioridadId: number | undefined;

    // Verificar si tipoTramite existe y obtener su ID
    if (this.tramite.tipoTramite && typeof this.tramite.tipoTramite === 'object') {
      tipoId = this.tramite.tipoTramite.id;
    } else if (typeof (this.tramite as any).tipo === 'string') {
      // Fallback para cuando viene como string desde el backend
      const tipoEncontrado = this.tiposTramite.find(
        t => t.nombre.toLowerCase() === (this.tramite as any).tipo.toLowerCase()
      );
      tipoId = tipoEncontrado?.id;
    }

    // Verificar si prioridad existe y obtener su ID
    if (this.tramite.prioridad && typeof this.tramite.prioridad === 'object') {
      prioridadId = this.tramite.prioridad.id;
    } else if (this.tramite.prioridad && typeof this.tramite.prioridad === 'string') {
      // Fallback para cuando viene como string desde el backend
      const prioridadString: string = this.tramite.prioridad;
      const prioridadEncontrada = this.prioridadesTramite.find(
        p => p.nombre.toLowerCase() === prioridadString.toLowerCase()
      );
      prioridadId = prioridadEncontrada?.id;
    }

    this.tramiteEditado = {
      id: this.tramite.id,
      asunto: this.tramite.asunto,
      descripcion: this.tramite.descripcion,
      observaciones: this.tramite.observaciones,
      tipoId: tipoId,
      prioridadId: prioridadId,
      fechaVencimiento: this.tramite.fechaVencimiento
    };

    // Solo resetear archivos cuando se abre el modal por primera vez
    // NO resetear cuando el usuario está seleccionando archivos
    // this.resetArchivos();
    this.errors = {};
  }

  private cargarDocumentosExistentes() {
    if (!this.tramite?.id) return;
    
    // TODO: Implementar getDocumentosTramite en el service
    this.documentosExistentes = [];
  }

  private resetArchivos() {
    this.archivosSeleccionados = [];
    this.nuevosDocumentos = [];
    this.documentosParaEliminar = [];
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    console.log('📁 onFileSelected ejecutado');

    if (input.files) {
      const nuevosArchivos = Array.from(input.files);
      console.log('📁 Archivos seleccionados:', nuevosArchivos.length, nuevosArchivos);

      // Validar cada archivo
      for (const archivo of nuevosArchivos) {
        console.log('📁 Validando archivo:', archivo.name, archivo.type, archivo.size);

        if (this.validarArchivo(archivo)) {
          this.archivosSeleccionados.push(archivo);
          this.nuevosDocumentos.push({
            nombre: archivo.name,
            tipo: archivo.type,
            tamano: archivo.size,
            descripcion: ''
          });
          console.log('✅ Archivo agregado:', archivo.name);
        } else {
          console.log('❌ Archivo no válido:', archivo.name);
        }
      }

      console.log('📁 Total archivos después de agregar:', this.archivosSeleccionados.length);
      console.log('📁 Array archivosSeleccionados:', this.archivosSeleccionados);

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

  eliminarNuevoArchivo(index: number) {
    this.archivosSeleccionados.splice(index, 1);
    this.nuevosDocumentos.splice(index, 1);
  }

  marcarDocumentoParaEliminar(documentoId: number) {
    const index = this.documentosParaEliminar.indexOf(documentoId);
    if (index > -1) {
      this.documentosParaEliminar.splice(index, 1);
    } else {
      this.documentosParaEliminar.push(documentoId);
    }
  }

  documentoMarcadoParaEliminar(documentoId: number): boolean {
    return this.documentosParaEliminar.includes(documentoId);
  }

  private validarFormulario(): boolean {
    this.errors = {};
    let esValido = true;

    if (!this.tramiteEditado.asunto?.trim()) {
      this.errors['asunto'] = 'El asunto es obligatorio';
      esValido = false;
    }

    if (!this.tramiteEditado.descripcion?.trim()) {
      this.errors['descripcion'] = 'La descripción es obligatoria';
      esValido = false;
    }

    if (!this.tramiteEditado.tipoId) {
      this.errors['tipoId'] = 'Debe seleccionar un tipo de trámite';
      esValido = false;
    }

    if (!this.tramiteEditado.prioridadId) {
      this.errors['prioridadId'] = 'Debe seleccionar una prioridad';
      esValido = false;
    }

    if (this.tramiteEditado.fechaVencimiento) {
      const fechaVencimiento = new Date(this.tramiteEditado.fechaVencimiento);
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

    if (!this.tramite?.id) {
      this.toastService.error('Error', 'No se puede actualizar el trámite');
      return;
    }

    this.loading = true;

    try {
      // Procesar archivos nuevos a base64
      const archivosBase64 = await this.procesarArchivosABase64();

      // Preparar datos del trámite incluyendo archivos
      const datosActualizacion = {
        ...this.tramiteEditado,
        documentos: archivosBase64,
        documentosAEliminar: this.documentosParaEliminar
      };

      // Actualizar trámite usando el servicio
      this.subscriptions.add(
        this.tramiteService.actualizarTramiteConArchivos(this.tramite!.id!, datosActualizacion).subscribe({
          next: (tramiteActualizado) => {
            this.toastService.success(
              'Trámite actualizado',
              'El trámite y sus documentos se han actualizado correctamente'
            );
            this.tramiteActualizado.emit(tramiteActualizado);
            this.onClose();
          },
          error: (error) => {
            console.error('Error al actualizar trámite:', error);
            this.toastService.error(
              'Error al actualizar',
              error.error?.message || 'No se pudo actualizar el trámite'
            );
          },
          complete: () => {
            this.loading = false;
          }
        })
      );
    } catch (error) {
      console.error('Error en onSubmit:', error);
      this.toastService.error('Error', 'Ocurrió un error inesperado al procesar los archivos');
      this.loading = false;
    }
  }

  // Métodos eliminados porque ya no se usan - ahora enviamos los archivos en base64 directamente

  onClose() {
    this.resetArchivos(); // Limpiar archivos al cerrar
    this.inicializarFormulario();
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

  getIconoTipoArchivo(tipoArchivo: string): string {
    if (tipoArchivo?.includes('pdf')) return 'fas fa-file-pdf';
    if (tipoArchivo?.includes('word')) return 'fas fa-file-word';
    if (tipoArchivo?.includes('image')) return 'fas fa-file-image';
    return 'fas fa-file';
  }

  getColorIconoArchivo(tipoArchivo: string): string {
    if (tipoArchivo?.includes('pdf')) return '#dc3545';
    if (tipoArchivo?.includes('word')) return '#2b579a';
    if (tipoArchivo?.includes('image')) return '#28a745';
    return '#6c757d';
  }

  // Método para procesar archivos a base64
  private async procesarArchivosABase64(): Promise<any[]> {
    const archivosBase64: any[] = [];

    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      const archivo = this.archivosSeleccionados[i];
      const descripcion = this.nuevosDocumentos[i]?.descripcion || '';

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
        console.error(`Error al procesar archivo ${archivo.name}:`, error);
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