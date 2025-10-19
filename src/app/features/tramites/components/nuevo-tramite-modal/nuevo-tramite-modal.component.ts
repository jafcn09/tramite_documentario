import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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
export class NuevoTramiteModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() tramiteCreado = new EventEmitter<Tramite>();


  nuevoTramite: Omit<Partial<Tramite>, 'fechaVencimiento'> & { tipoId?: number; prioridadId?: number; areaOrigenId?: number; fechaInicio?: string; fechaVencimiento?: string } = {
    asunto: '',
    descripcion: '',
    observaciones: '',
    fechaVencimiento: '',
    fechaInicio: ''
  };


  tiposTramite: TipoTramite[] = [];
  prioridadesTramite: PrioridadTramite[] = [];
  areasDisponibles: AreaJerarquica[] = [];

  loading = false;
  archivosSeleccionados: File[] = [];
  documentosAdjuntos: Partial<DocumentoTramite>[] = [];


  errors: { [key: string]: string } = {};

  private subscriptions = new Subscription();

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private organigramaService: OrganigramaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.cargarDatosCatalogo();
    this.cargarAreas();
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

  private cargarAreas() {
    // Solo cargar áreas si es necesario para mostrar información
    this.subscriptions.add(
      this.organigramaService.obtenerAreasPlanas().subscribe(
        areas => {
          this.areasDisponibles = areas;
          this.configurarAreaSegunRol();
        }
      )
    );
  }

  private configurarAreaSegunRol() {
    const currentUser = this.authService.currentUserValue;

    // Para usuarios con rol USUARIO: usar su área asignada (obligatorio y readonly)
    if (currentUser && currentUser.role?.name === 'USUARIO' && (currentUser as any).area?.id) {
      this.nuevoTramite.areaOrigenId = (currentUser as any).area.id;
    }

    // Para ESTUDIANTE: el área se determinará automáticamente en el backend
    // Para otros roles: no se configura área de origen
  }

  private resetForm() {
    const currentUser = this.authService.currentUserValue;
    let areaOrigenId = undefined;

    // Solo para rol USUARIO se preselecciona su área (automático e inmutable)
    if (currentUser?.role?.name === 'USUARIO' && (currentUser as any).area?.id) {
      areaOrigenId = (currentUser as any).area.id;
    }

    this.nuevoTramite = {
      asunto: '',
      descripcion: '',
      observaciones: '',
      fechaVencimiento: '',
      fechaInicio: this.getCurrentDate(), // Fecha de hoy precargada
      areaOrigenId: areaOrigenId
    };
    this.archivosSeleccionados = [];
    this.documentosAdjuntos = [];
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

    // Área de origen se configura automáticamente, no necesita validación manual

    if (this.nuevoTramite.fechaVencimiento && this.nuevoTramite.fechaVencimiento.trim()) {
      // Usar fecha local para evitar problemas de timezone
      const fechaVencimiento = new Date(this.nuevoTramite.fechaVencimiento + 'T12:00:00');
      const fechaInicioString = this.nuevoTramite.fechaInicio || this.getCurrentDate();
      const fechaInicio = new Date(fechaInicioString + 'T12:00:00');

      // Verificar que no sea anterior al día de inicio
      if (fechaVencimiento <= fechaInicio) {
        this.errors['fechaVencimiento'] = 'La fecha de vencimiento debe ser posterior a la fecha de inicio';
        esValido = false;
      }

      // Verificar que sea un día hábil (lunes a viernes)
      if (fechaVencimiento.getDay() === 0 || fechaVencimiento.getDay() === 6) {
        this.errors['fechaVencimiento'] = 'La fecha de vencimiento debe ser un día hábil (lunes a viernes)';
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

    // Prevenir múltiples submits
    if (this.loading) {
      return;
    }

    this.loading = true;

    try {

      const archivosBase64 = await this.procesarArchivosABase64();


      const tramiteData: any = {
        tipoTramiteId: Number(this.nuevoTramite.tipoId!),
        asunto: this.nuevoTramite.asunto!,
        descripcion: this.nuevoTramite.descripcion!,
        prioridadId: Number(this.nuevoTramite.prioridadId!),
        fechaVencimiento: this.nuevoTramite.fechaVencimiento && this.nuevoTramite.fechaVencimiento.trim() ? new Date(this.nuevoTramite.fechaVencimiento + 'T12:00:00') : undefined,
        observaciones: this.nuevoTramite.observaciones,
        documentos: archivosBase64
      };

      // Solo agregar areaOrigenId para usuarios con rol USUARIO
      if (this.isUsuarioRole && this.nuevoTramite.areaOrigenId) {
        tramiteData.areaOrigenId = Number(this.nuevoTramite.areaOrigenId);
      }


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
          error: () => {
            this.loading = false;
            this.toastService.error(
              'Error',
              'No se pudo crear el trámite con los archivos. Inténtelo nuevamente.'
            );
          }
        })
      );
    } catch (error) {
      this.loading = false;
      this.toastService.error('Error', 'Ocurrió un error inesperado al procesar los archivos');
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

  // Obtiene la fecha mínima para fecha de vencimiento (día siguiente al inicio, solo días hábiles)
  getMinFechaVencimiento(): string {
    if (!this.nuevoTramite.fechaInicio) {
      return this.getCurrentDate();
    }

    // Usar fecha local para evitar problemas de timezone
    const fechaInicio = new Date(this.nuevoTramite.fechaInicio + 'T12:00:00');
    const siguienteDia = new Date(fechaInicio);
    siguienteDia.setDate(fechaInicio.getDate() + 1);

    // Buscar el siguiente día hábil (lunes a viernes)
    while (siguienteDia.getDay() === 0 || siguienteDia.getDay() === 6) { // 0=domingo, 6=sábado
      siguienteDia.setDate(siguienteDia.getDate() + 1);
    }

    return siguienteDia.toISOString().split('T')[0];
  }

  // Valida que la fecha de vencimiento sea un día hábil
  onFechaVencimientoChange(event: Event): void {
    this.validarYCorregirFecha(event);
  }

  private validarYCorregirFecha(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (!input.value) {
      this.nuevoTramite.fechaVencimiento = '';
      return;
    }

    // Crear fechas usando la fecha local para evitar problemas de timezone
    const fechaSeleccionada = new Date(input.value + 'T12:00:00');
    const fechaInicioString = this.nuevoTramite.fechaInicio || this.getCurrentDate();
    const fechaInicio = new Date(fechaInicioString + 'T12:00:00');

    // Verificar si es anterior o igual a la fecha de inicio
    if (fechaSeleccionada <= fechaInicio) {
      this.toastService.warning(
        'Fecha no válida',
        'La fecha de vencimiento debe ser posterior a la fecha de inicio'
      );

      // Usar la fecha mínima permitida pero sin bloquear la interacción
      const fechaMinima = this.getMinFechaVencimiento();

      // Usar setTimeout para no interferir con el event loop
      setTimeout(() => {
        this.nuevoTramite.fechaVencimiento = fechaMinima;
      }, 0);
      return;
    }

    // Verificar si es fin de semana
    if (fechaSeleccionada.getDay() === 0 || fechaSeleccionada.getDay() === 6) {
      this.toastService.warning(
        'Fecha no válida',
        'Solo se permiten días hábiles (lunes a viernes) como fecha de vencimiento'
      );

      // Encontrar el siguiente día hábil
      const siguienteDiaHabil = new Date(fechaSeleccionada);
      while (siguienteDiaHabil.getDay() === 0 || siguienteDiaHabil.getDay() === 6) {
        siguienteDiaHabil.setDate(siguienteDiaHabil.getDate() + 1);
      }

      const fechaHabilString = siguienteDiaHabil.toISOString().split('T')[0];

      // Usar setTimeout para no interferir con el event loop
      setTimeout(() => {
        this.nuevoTramite.fechaVencimiento = fechaHabilString;
      }, 0);
    } else {
      // Fecha válida (día hábil), actualizar el modelo
      this.nuevoTramite.fechaVencimiento = input.value;
    }
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
}