import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';

import { ModalBaseComponent } from '../../../../shared/components/modal-base/modal-base.component';
import { FirmaDigitalService } from '../../../../services/firma-digital.service';
import { TramiteService } from '../../../../services/tramite.service';
import { AuthService } from '../../../../services/auth.service';
import {
  FirmaDigitalRequest,
  FirmaDigitalResponse,
  TipoFirma,
  DocumentoAdjuntoRequest
} from '../../../../shared/interfaces/firma-digital.interface';
import { Tramite, Usuario } from '../../../../shared/interfaces/tramite.interface';

@Component({
  selector: 'app-firma-form-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ModalBaseComponent],
  templateUrl: './firma-form-modal.component.html',
  styleUrl: './firma-form-modal.component.css'
})
export class FirmaFormModalComponent implements OnInit, OnDestroy {
  @Input() show = false;
  @Input() firma: FirmaDigitalResponse | null = null;
  @Input() tramiteId: number | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() saved = new EventEmitter<FirmaDigitalResponse>();

  form: FormGroup;
  loading = false;
  tramites: Tramite[] = [];
  usuarios: Usuario[] = [];
  tiposFirma = Object.values(TipoFirma);
  esEstudiante = false;
  tiposFirmaDisponibles: TipoFirma[] = [];

  archivosSelecionados: File[] = [];
  maxFileSize = 10 * 1024 * 1024;
  allowedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

  private subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder,
    private firmaDigitalService: FirmaDigitalService,
    private tramiteService: TramiteService,
    private authService: AuthService
  ) {
    this.form = this.createForm();
  }

  ngOnInit() {
    this.verificarRolUsuario();
    this.cargarDatos();
    if (this.firma) {
      this.populateForm();
    }
    if (this.tramiteId) {
      this.form.patchValue({ tramiteId: this.tramiteId });
    }
  }

  private verificarRolUsuario() {
    const user = this.authService.currentUserValue;
    this.esEstudiante = user?.role?.name === 'ESTUDIANTE';

    if (this.esEstudiante) {
      this.tiposFirmaDisponibles = [TipoFirma.SIMPLE];
      this.form.patchValue({ tipoFirma: TipoFirma.SIMPLE });
      this.form.get('tipoFirma')?.disable();
    } else {
      this.tiposFirmaDisponibles = Object.values(TipoFirma);
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      tramiteId: [null, Validators.required],
      firmanteId: [null, Validators.required],
      tipoFirma: [TipoFirma.SIMPLE, Validators.required],
      razonFirma: ['', [Validators.required, Validators.maxLength(500)]],
      ubicacionFirma: ['', Validators.maxLength(200)],
      contactoFirmante: ['', Validators.maxLength(200)],
      observaciones: [''],
      nivelAutorizacionRequerido: [2, [Validators.required, Validators.min(1), Validators.max(2)]],
      requierePinAdicional: [false],
      expiraEn: [''],
      motivoSolicitud: ['', Validators.maxLength(1000)],
      documentosAdjuntos: this.fb.array([])
    });
  }

  private cargarDatos() {
    if (!this.tramiteId) {
      this.subscriptions.add(
        this.tramiteService.getTramites().subscribe({
          next: (tramites) => {
            this.tramites = tramites;
          },
          error: (error) => {
          }
        })
      );
    }

    this.subscriptions.add(
      this.authService.getUsuarios().subscribe({
        next: (usuarios) => {
          this.usuarios = usuarios;
        },
        error: (error) => {
        }
      })
    );
  }

  private populateForm() {
    if (!this.firma) return;

    this.form.patchValue({
      tramiteId: this.firma.tramiteId,
      firmanteId: this.firma.firmante.id,
      tipoFirma: this.firma.tipoFirma,
      razonFirma: this.firma.razonFirma,
      ubicacionFirma: this.firma.ubicacionFirma,
      contactoFirmante: this.firma.firmante.email,
      observaciones: this.firma.observaciones,
      nivelAutorizacionRequerido: this.firma.nivelAutorizacionRequerido,
      requierePinAdicional: this.firma.requierePinAdicional,
      expiraEn: this.firma.expiraEn ? new Date(this.firma.expiraEn).toISOString().slice(0, 16) : '',
      motivoSolicitud: this.firma.motivoAutorizacion
    });
  }

  get documentosAdjuntosArray(): FormArray {
    return this.form.get('documentosAdjuntos') as FormArray;
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (this.validateFile(file)) {
        this.archivosSelecionados.push(file);
        this.addDocumentoAdjunto(file);
      }
    }

    event.target.value = '';
  }

  private validateFile(file: File): boolean {
    if (file.size > this.maxFileSize) {
      alert(`El archivo ${file.name} excede el tamaño máximo permitido de 10MB`);
      return false;
    }

    if (!this.allowedFileTypes.includes(file.type)) {
      alert(`El tipo de archivo ${file.type} no está permitido`);
      return false;
    }

    return true;
  }

  private addDocumentoAdjunto(file: File) {
    const documentoGroup = this.fb.group({
      nombreArchivo: [file.name, Validators.required],
      tipoContenido: [file.type, Validators.required],
      tamaño: [file.size],
      descripcion: ['']
    });

    this.documentosAdjuntosArray.push(documentoGroup);
  }

  removeDocumento(index: number) {
    this.documentosAdjuntosArray.removeAt(index);
    this.archivosSelecionados.splice(index, 1);
  }

  private async convertFilesToBase64(): Promise<DocumentoAdjuntoRequest[]> {
    const documentos: DocumentoAdjuntoRequest[] = [];

    for (let i = 0; i < this.archivosSelecionados.length; i++) {
      const file = this.archivosSelecionados[i];
      const formControl = this.documentosAdjuntosArray.at(i);

      const base64 = await this.fileToBase64(file);

      documentos.push({
        nombreArchivo: formControl.get('nombreArchivo')?.value,
        contenidoBase64: base64,
        tipoContenido: formControl.get('tipoContenido')?.value,
        descripcion: formControl.get('descripcion')?.value,
        tamaño: formControl.get('tamaño')?.value
      });
    }

    return documentos;
  }

  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.markFormGroupTouched();
      return;
    }

    this.loading = true;

    try {
      const formValue = this.form.getRawValue();

      const documentosAdjuntos = await this.convertFilesToBase64();

      const request: FirmaDigitalRequest = {
        tramiteId: formValue.tramiteId,
        firmanteId: formValue.firmanteId,
        tipoFirma: formValue.tipoFirma,
        razonFirma: formValue.razonFirma,
        ubicacionFirma: formValue.ubicacionFirma,
        contactoFirmante: formValue.contactoFirmante,
        observaciones: formValue.observaciones,
        documentosAdjuntos: documentosAdjuntos.length > 0 ? documentosAdjuntos : undefined,
        nivelAutorizacionRequerido: formValue.nivelAutorizacionRequerido,
        requierePinAdicional: formValue.requierePinAdicional,
        expiraEn: formValue.expiraEn ? new Date(formValue.expiraEn) : undefined,
        motivoSolicitud: formValue.motivoSolicitud
      };

      let observable;
      if (this.firma) {
        observable = this.firmaDigitalService.actualizarFirma(this.firma.id, request);
      } else {
        observable = this.firmaDigitalService.crearSolicitudFirma(request);
      }

      this.subscriptions.add(
        observable.subscribe({
          next: (response) => {
            this.saved.emit(response);
            this.onClose();
          },
          error: (error) => {
            this.loading = false;
          }
        })
      );

    } catch (error) {
      this.loading = false;
    }
  }

  private markFormGroupTouched() {
    Object.keys(this.form.controls).forEach(key => {
      const control = this.form.get(key);
      control?.markAsTouched();
    });

    this.documentosAdjuntosArray.controls.forEach(control => {
      Object.keys(control.value).forEach(key => {
        control.get(key)?.markAsTouched();
      });
    });
  }

  onClose() {
    this.form.reset();
    this.archivosSelecionados = [];
    this.documentosAdjuntosArray.clear();
    this.loading = false;
    this.close.emit();
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['maxlength']) {
        return `${this.getFieldLabel(fieldName)} excede la longitud máxima`;
      }
      if (field.errors['min'] || field.errors['max']) {
        return `${this.getFieldLabel(fieldName)} debe estar entre 1 y 2`;
      }
    }
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      tramiteId: 'Trámite',
      firmanteId: 'Firmante',
      tipoFirma: 'Tipo de Firma',
      razonFirma: 'Razón de la Firma',
      ubicacionFirma: 'Ubicación',
      contactoFirmante: 'Contacto del Firmante',
      nivelAutorizacionRequerido: 'Nivel de Autorización'
    };
    return labels[fieldName] || fieldName;
  }

  getDescripcionTipoFirma(tipo: TipoFirma): string {
    return this.firmaDigitalService.getDescripcionTipoFirma(tipo);
  }

  formatFileSize(size: number): string {
    if (size < 1024) {
      return size + ' B';
    } else if (size < 1024 * 1024) {
      return Math.round(size / 1024) + ' KB';
    } else {
      return Math.round(size / (1024 * 1024)) + ' MB';
    }
  }

  getNivelAutorizacionTexto(nivel: number): string {
    return nivel === 1 ? 'ADMINISTRADOR' : 'ADMINISTRATIVO';
  }

  get isEditing(): boolean {
    return this.firma !== null;
  }

  get modalTitle(): string {
    return this.isEditing ? 'Editar Solicitud de Firma' : 'Nueva Solicitud de Firma';
  }
}