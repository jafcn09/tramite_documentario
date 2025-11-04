import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { BusinessDaysOnlyDirective } from '../../../../shared/directives/business-days-only.directive';
import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';
import { OrganigramaService } from '../../../../services/organigrama.service';
import { AuthService } from '../../../../services/auth.service';
import { AreaJerarquica } from '../../../../models/organigrama.interface';
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
  imports: [CommonModule, FormsModule, ModalBaseComponent, BusinessDaysOnlyDirective],
  templateUrl: './nuevo-tramite-modal.component.html',
  styleUrl: './nuevo-tramite-modal.component.css'
})

export class NuevoTramiteModalComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() show = false;
  @Input() modoEdicion = false; 
  @Input() tramiteParaEditar: any = null; 
  @Output() close = new EventEmitter<void>();
  @Output() tramiteCreado = new EventEmitter<Tramite>();
  @Output() tramiteActualizado = new EventEmitter<Tramite>();

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;


  nuevoTramite: Omit<Partial<Tramite>, 'fechaVencimiento'> & {
    tipoId?: number;
    prioridadId?: number;
    areaOrigenId?: number;
    fechaInicio?: string;
    numeroExpediente?: string;
  } = {
    asunto: '',
    descripcion: '',
    observaciones: '',
    fechaInicio: '',
    prioridadId: 1 // Valor por defecto: NORMAL
  };


  tiposTramite: TipoTramite[] = [];
  prioridadesTramite: PrioridadTramite[] = [];
  areasDisponibles: AreaJerarquica[] = [];

  loading = false;
  archivosSeleccionados: File[] = [];
  documentosAdjuntos: Partial<DocumentoTramite>[] = [];

  // Propiedades para firma digital
  requiereFirmaDigital = false;
  tipoFirma = 'CONFORMIDAD'; // Será actualizado dinámicamente desde backend
  razonFirma = '';
  ubicacionFirma = 'LIMA';
  firmaDigitalData: string | null = null;
  consentimientoFirma = false;
  signatureExists = false;
  showConfirmationModal = false;
  pendingFormData: any = null;

  // Arrays dinámicos poblados desde backend - NO más hardcoding
  tiposFirmaCreacion: { value: string; label: string }[] = [];

  departamentosPeru: { value: string; label: string }[] = []; // Poblado dinámicamente desde backend

  errors: { [key: string]: string } = {};
  private canvas!: HTMLCanvasElement;
  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;

  private subscriptions = new Subscription();

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private organigramaService: OrganigramaService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.cargarDatosCatalogo();
    this.cargarAreas();
    this.cargarTiposFirmaBackend();
    this.cargarDepartamentosBackend();

    if (this.modoEdicion && this.tramiteParaEditar) {
      this.cargarDatosTramiteParaEdicion();
    } else {
      this.resetForm();
    }
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

  private cargarAreas() {
    this.subscriptions.add(
      this.organigramaService.obtenerAreasPlanas().subscribe(
        areas => {
          this.areasDisponibles = areas;
          this.configurarAreaSegunRol();
        }
      )
    );
  }

  private cargarTiposFirmaBackend() {
    this.subscriptions.add(
      this.http.get<any[]>('http://localhost:8081/api/departamentos/tipos-firma').subscribe({
        next: (tipos) => {
          console.log('🔄 Tipos de firma obtenidos del backend:', tipos);

          // Filtrar tipos de firma según rol del usuario
          const currentUser = this.authService.currentUserValue;
          const roleName = currentUser?.role?.name?.toUpperCase();

          let tiposFiltrados = tipos;

          if (roleName === 'ESTUDIANTE') {
            // ESTUDIANTE: Solo permite firma SIMPLE
            tiposFiltrados = tipos.filter(tipo => tipo.codigo === 'SIMPLE');
            console.log('👨‍🎓 Rol ESTUDIANTE detectado - Mostrando solo firma SIMPLE');
          } else {
            // USUARIO/ADMINISTRATIVO/ADMIN: Todos los tipos excepto SIMPLE
            tiposFiltrados = tipos.filter(tipo => tipo.codigo !== 'SIMPLE');
            console.log('👔 Rol personal detectado - Mostrando firmas avanzadas');
          }

          this.tiposFirmaCreacion = tiposFiltrados.map(tipo => ({
            value: tipo.codigo,
            label: this.capitalizarPalabras(tipo.descripcion)
          }));

          if (this.tiposFirmaCreacion.length > 0) {
            this.tipoFirma = this.tiposFirmaCreacion[0].value;
          }

          console.log('✅ Tipos de firma configurados:', this.tiposFirmaCreacion);
        },
        error: (error) => {
          console.error('❌ Error al cargar tipos de firma del backend:', error);
          this.toastService.warning('Advertencia', 'No se pudieron cargar los tipos de firma. Usando valores por defecto.');
        }
      })
    );
  }

  private cargarDepartamentosBackend() {
    this.subscriptions.add(
      this.http.get<any[]>('http://localhost:8081/api/departamentos').subscribe({
        next: (departamentos) => {
          console.log('🔄 Departamentos obtenidos del backend:', departamentos);
          this.departamentosPeru = departamentos.map(dept => ({
            value: dept.codigo,
            label: dept.nombre
          }));
      
          const lima = this.departamentosPeru.find(d => d.value === 'LIMA');
          if (lima) {
            this.ubicacionFirma = lima.value;
          } else if (this.departamentosPeru.length > 0) {
            this.ubicacionFirma = this.departamentosPeru[0].value;
          }
        },
        error: (error) => {
          console.error('❌ Error al cargar departamentos del backend:', error);
          this.toastService.warning('Advertencia', 'No se pudieron cargar los departamentos. Usando valores por defecto.');
        }
      })
    );
  }

  private capitalizarPalabras(texto: string): string {
    return texto.split(' ').map(palabra =>
      palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase()
    ).join(' ');
  }

  private configurarAreaSegunRol() {
    const currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.role?.name === 'USUARIO' && (currentUser as any).area?.id) {
      this.nuevoTramite.areaOrigenId = (currentUser as any).area.id;
    }
  }

  private cargarDatosTramiteParaEdicion() {
    if (!this.tramiteParaEditar) return;

    console.log('🔍 Cargando datos para edición:', this.tramiteParaEditar);

    this.nuevoTramite = {
      id: this.tramiteParaEditar.id,
      asunto: this.tramiteParaEditar.asunto || '',
      descripcion: this.tramiteParaEditar.descripcion || '',
      observaciones: this.tramiteParaEditar.observaciones || '',
      tipoId: this.tramiteParaEditar.tipo?.id || this.tramiteParaEditar.tipoId,
      prioridadId: this.tramiteParaEditar.prioridad?.id || this.tramiteParaEditar.prioridadId,
      areaOrigenId: this.tramiteParaEditar.areaOrigen?.id || this.tramiteParaEditar.areaOrigenId,
      fechaInicio: this.tramiteParaEditar.fechaCreacion ? this.tramiteParaEditar.fechaCreacion.split('T')[0] : this.getCurrentDate(),
      numeroExpediente: this.tramiteParaEditar.numeroExpediente || ''
    };


    if (this.tramiteParaEditar.firmaDigitalActiva) {
      this.requiereFirmaDigital = true;
      this.tipoFirma = this.tramiteParaEditar.tipoFirma || 'CONFORMIDAD';
      this.razonFirma = this.tramiteParaEditar.razonFirma || `Edición de trámite - ${this.nuevoTramite.asunto}`;
      this.ubicacionFirma = this.tramiteParaEditar.ubicacionFirma || 'LIMA';

 
      if (this.tramiteParaEditar.hashFirma) {
        this.firmaDigitalData = this.tramiteParaEditar.hashFirma;
        this.signatureExists = true;
        this.consentimientoFirma = true;
      }
    } else {
      this.requiereFirmaDigital = false;
    }
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];

    this.errors = {};
  }

  private resetForm() {
    const currentUser = this.authService.currentUserValue;
    let areaOrigenId = undefined;
    if (currentUser?.role?.name === 'USUARIO' && (currentUser as any).area?.id) {
      areaOrigenId = (currentUser as any).area.id;
    }

    this.nuevoTramite = {
      asunto: '',
      descripcion: '',
      observaciones: '',
      fechaInicio: this.getCurrentDate(),
      areaOrigenId: areaOrigenId,
      prioridadId: 1
    };
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
    this.requiereFirmaDigital = false;
    this.tipoFirma = 'CONFORMIDAD';
    this.razonFirma = '';
    this.ubicacionFirma = 'LIMA';
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
    this.showConfirmationModal = false;
    this.pendingFormData = null;

    this.errors = {};
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const nuevosArchivos = Array.from(input.files);


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
      input.value = '';
    }
  }

  private validarArchivo(archivo: File): boolean {
    const tiposPermitidos = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const tamanioMaximo = 10 * 1024 * 1024; 

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

    // En modo edición, TODOS los campos son opcionales
    if (this.modoEdicion) {
      return true;
    }

    // En modo creación, validar campos obligatorios
    if (!this.nuevoTramite.asunto?.trim()) {
      this.errors['asunto'] = 'El asunto es obligatorio';
      esValido = false;
    }

    // Descripción es opcional

    if (!this.nuevoTramite.tipoId) {
      this.errors['tipoId'] = 'Debe seleccionar un tipo de trámite';
      esValido = false;
    }

    return esValido;
  }

  private validarFirmaDigital(): boolean {
    if (!this.requiereFirmaDigital) {
      return true;
    }

    let esValido = true;

    if (!this.tipoFirma) {
      this.errors['tipoFirma'] = 'Debe seleccionar un tipo de firma';
      esValido = false;
    }

    if (!this.ubicacionFirma) {
      this.errors['ubicacionFirma'] = 'Debe seleccionar un departamento';
      esValido = false;
    }

    if (!this.razonFirma?.trim()) {
      this.errors['razonFirma'] = 'Debe indicar la razón de la firma';
      esValido = false;
    }

    if (!this.consentimientoFirma) {
      this.errors['consentimientoFirma'] = 'Debe aceptar los términos y condiciones';
      esValido = false;
    }

    if (!this.signatureExists || !this.firmaDigitalData) {
      this.errors['firmaDigital'] = 'Debe dibujar su firma y presionar Capturar';
      esValido = false;
    }

    return esValido;
  }

  async onSubmit() {
    if (!this.validarFormulario()) {
      this.toastService.warning('Formulario incompleto', 'Por favor, complete todos los campos obligatorios');
      return;
    }

    if (this.loading) {
      return;
    }

    try {
      // 🔍 DEBUG: Log de valores antes de enviar
      console.log('🔍 DEBUG FRONTEND - Valores antes de enviar:');
      console.log('  - requiereFirmaDigital:', this.requiereFirmaDigital);
      console.log('  - tipoFirma:', this.tipoFirma);
      console.log('  - razonFirma:', this.razonFirma);
      console.log('  - ubicacionFirma:', this.ubicacionFirma);
      console.log('  - tiposFirmaCreacion.length:', this.tiposFirmaCreacion.length);
      console.log('  - departamentosPeru.length:', this.departamentosPeru.length);

      const archivosBase64 = await this.procesarArchivosABase64();

      const tramiteData: any = {
        tipoTramiteId: Number(this.nuevoTramite.tipoId!),
        asunto: this.nuevoTramite.asunto!,
        descripcion: this.nuevoTramite.descripcion!,
        prioridadId: Number(this.nuevoTramite.prioridadId!),
        observaciones: this.nuevoTramite.observaciones,
        documentos: archivosBase64,
        requiereFirmaDigital: this.requiereFirmaDigital
      };

      // Solo enviar campos de firma digital si se requiere
      if (this.requiereFirmaDigital) {
        tramiteData.tipoFirma = this.tipoFirma;
        tramiteData.razonFirma = this.razonFirma;
        tramiteData.ubicacionFirma = this.ubicacionFirma;
        tramiteData.consentimientoFirma = this.consentimientoFirma;
        tramiteData.firmaDigitalData = this.firmaDigitalData;
      }

      console.log('🔍 DEBUG FRONTEND - tramiteData completo:', tramiteData);

      if (this.isUsuarioRole && this.nuevoTramite.areaOrigenId) {
        tramiteData.areaOrigenId = Number(this.nuevoTramite.areaOrigenId);
      }

      if (this.requiereFirmaDigital) {
        if (!this.validarFirmaDigital()) {
          return;
        }
        this.submitTramite(tramiteData);
      } else {
        this.submitTramite(tramiteData);
      }

    } catch (error) {
      console.error('Error en onSubmit:', error);
      this.toastService.error('Error', 'Ocurrió un error inesperado al procesar los archivos');
    }
  }

  private submitTramite(tramiteData: any) {
    this.loading = true;

    if (this.modoEdicion && this.tramiteParaEditar?.id) {
      console.log('🔄 Actualizando trámite:', this.tramiteParaEditar.id, tramiteData);

      this.subscriptions.add(
        this.tramiteService.actualizarTramiteConArchivos(this.tramiteParaEditar.id, tramiteData).subscribe({
          next: (tramiteActualizado) => {
            this.loading = false;
            this.toastService.success(
              'Trámite actualizado',
              `El trámite ${tramiteActualizado.codigo} ha sido actualizado exitosamente`
            );
            this.tramiteActualizado.emit(tramiteActualizado);
            this.onClose();
          },
          error: (error) => {
            console.error('Error al actualizar trámite:', error);
            this.loading = false;
            this.toastService.error(
              'Error',
              'No se pudo actualizar el trámite. Inténtelo nuevamente.'
            );
          }
        })
      );
    } else {
      console.log('🆕 Creando nuevo trámite:', tramiteData);

      this.subscriptions.add(
        this.tramiteService.crearTramiteConArchivos(tramiteData).subscribe({
          next: (tramiteCreado) => {
            this.loading = false;
            this.toastService.success(
              'Trámite creado',
              `El trámite ${tramiteCreado.codigo} y sus documentos han sido creados exitosamente`
            );
            this.tramiteCreado.emit(tramiteCreado);
            this.onClose();
          },
          error: (error) => {
            console.error('Error al crear trámite:', error);
            this.loading = false;
            this.toastService.error(
              'Error',
              'No se pudo crear el trámite con los archivos. Inténtelo nuevamente.'
            );
          }
        })
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

  getAreaNombre(areaId: number): string {
    const area = this.areasDisponibles.find(a => a.id === areaId);
    return area?.nombre || '';
  }

  get isUsuarioRole(): boolean {
    const currentUser = this.authService.currentUserValue;
    return currentUser?.role?.name === 'USUARIO';
  }

  get isEstudianteRole(): boolean {
    const currentUser = this.authService.currentUserValue;
    return currentUser?.role?.name === 'ESTUDIANTE';
  }
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

  private convertirArchivoABase64(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {

        const base64 = (reader.result as string).split(',')[1];
        resolve(base64);
      };

      reader.onerror = () => {
        reject(new Error('Error al leer el archivo'));
      };

      reader.readAsDataURL(archivo);
    });
  }


  private resetFirmaDigitalForm(): void {
    if (this.tiposFirmaCreacion.length > 0) {
      this.tipoFirma = this.tiposFirmaCreacion[0].value;
    } else {
      this.tipoFirma = 'CONFORMIDAD'; 
    }

    if (this.modoEdicion) {
      this.razonFirma = `Modificación de trámite - ${this.nuevoTramite.asunto || 'Edición de trámite'}`;
    } else {
      this.razonFirma = `Creación de trámite - ${this.nuevoTramite.asunto || 'Nuevo trámite'}`;
    }

    if (this.departamentosPeru.length > 0) {
      const lima = this.departamentosPeru.find(d => d.value === 'LIMA');
      this.ubicacionFirma = lima ? lima.value : this.departamentosPeru[0].value;
    } else {
      this.ubicacionFirma = 'LIMA'; 
    }

    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
  }

  private clearFirmaDigitalData(): void {
    this.clearCanvas();
    this.firmaDigitalData = null;
    this.consentimientoFirma = false;
    this.signatureExists = false;
  }

  onConfirmSignature(): void {
    if (!this.validarFirmaDigital()) {
      return;
    }

    this.showConfirmationModal = false;

    if (this.pendingFormData) {
      this.submitTramite(this.pendingFormData);
      this.pendingFormData = null;
    }
  }

  onCancelSignature(): void {
    this.showConfirmationModal = false;
    this.pendingFormData = null;
  }

  onProceedToSignature(): void {
    this.showConfirmationModal = false;
    this.toastService.info('Complete su firma', 'Dibuje su firma en el área designada y luego haga clic en "Capturar"');

    setTimeout(() => {
      this.initializeCanvas();
    }, 100);
  }

  ngAfterViewInit(): void {
    if (this.signatureCanvas && this.requiereFirmaDigital) {
      this.initializeCanvas();
    }
  }

  initializeCanvas(): void {
    if (!this.signatureCanvas) return;

    this.canvas = this.signatureCanvas.nativeElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.canvas.width = 400;
    this.canvas.height = 150;
    this.ctx.strokeStyle = '#000';
    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));

    this.canvas.addEventListener('touchstart', this.startDrawingTouch.bind(this));
    this.canvas.addEventListener('touchmove', this.drawTouch.bind(this));
    this.canvas.addEventListener('touchend', this.stopDrawing.bind(this));
  }

  startDrawing(e: MouseEvent): void {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    this.startX = e.clientX - rect.left;
    this.startY = e.clientY - rect.top;
  }

  draw(e: MouseEvent): void {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.startX = x;
    this.startY = y;
    this.signatureExists = true;
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  startDrawingTouch(e: TouchEvent): void {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    this.isDrawing = true;
    this.startX = touch.clientX - rect.left;
    this.startY = touch.clientY - rect.top;
  }

  drawTouch(e: TouchEvent): void {
    e.preventDefault();
    if (!this.isDrawing) return;

    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.startX, this.startY);
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.startX = x;
    this.startY = y;
    this.signatureExists = true;
  }

  clearCanvas(): void {
    if (this.ctx && this.canvas) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.signatureExists = false;
      this.firmaDigitalData = null;
    }
  }

  captureSignature(): void {
    if (this.canvas && this.signatureExists) {
      this.firmaDigitalData = this.canvas.toDataURL('image/png');
      this.toastService.success('Firma capturada', 'Su firma ha sido capturada exitosamente');
    }
  }

  onCheckboxChange(event: Event): void {
    const checkbox = event.target as HTMLInputElement;
    this.requiereFirmaDigital = checkbox.checked;

    console.log('🔍 DEBUG - onCheckboxChange:', {
      checked: this.requiereFirmaDigital,
      tiposFirmaLength: this.tiposFirmaCreacion.length,
      departamentosLength: this.departamentosPeru.length
    });

    if (this.requiereFirmaDigital) {
      this.resetFirmaDigitalForm();
      this.toastService.info('Firma digital activada', 'Complete los datos de la firma digital');

      setTimeout(() => {
        this.initializeCanvas();
      }, 100);
    } else {
      this.clearFirmaDigitalData();
    }
  }
}