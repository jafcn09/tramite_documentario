import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';
import { FirmaDigitalService } from '../../../../services/firma-digital.service';
import { AuthService } from '../../../../services/auth.service';
import { TipoFirma } from '../../../../shared/interfaces/firma-digital.interface';

@Component({
  selector: 'app-responder-tramite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-tramite-modal.component.html',
  styleUrl: './responder-tramite-modal.component.css'
})
export class ResponderTramiteModalComponent implements OnInit, AfterViewInit {
  @Input() tramite: any;
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() tramiteRespondido = new EventEmitter<any>();

  @ViewChild('signatureCanvas', { static: false }) signatureCanvas!: ElementRef<HTMLCanvasElement>;

  respuestaForm = {
    respuesta: '',
    observaciones: '',
    asunto: '',
    archivos: [] as File[],
    requiereFirmaDigital: false,
    tipoFirma: TipoFirma.CONFORMIDAD,
    razonFirma: '',
    ubicacionFirma: 'LIMA',
    firmaDigitalData: null as string | null,
    consentimientoFirma: false
  };

  private ctx: CanvasRenderingContext2D | null = null;
  private isDrawing = false;
  private lastX = 0;
  private lastY = 0;
  signatureExists = false;

  tiposFirmaRespuesta: { value: string; label: string }[] = [];
  esEstudiante = false;

  departamentosPeru = [
    { value: 'AMAZONAS', label: 'Amazonas' },
    { value: 'ANCASH', label: 'Áncash' },
    { value: 'APURIMAC', label: 'Apurímac' },
    { value: 'AREQUIPA', label: 'Arequipa' },
    { value: 'AYACUCHO', label: 'Ayacucho' },
    { value: 'CAJAMARCA', label: 'Cajamarca' },
    { value: 'CALLAO', label: 'Callao' },
    { value: 'CUSCO', label: 'Cusco' },
    { value: 'HUANCAVELICA', label: 'Huancavelica' },
    { value: 'HUANUCO', label: 'Huánuco' },
    { value: 'ICA', label: 'Ica' },
    { value: 'JUNIN', label: 'Junín' },
    { value: 'LA_LIBERTAD', label: 'La Libertad' },
    { value: 'LAMBAYEQUE', label: 'Lambayeque' },
    { value: 'LIMA', label: 'Lima' },
    { value: 'LORETO', label: 'Loreto' },
    { value: 'MADRE_DE_DIOS', label: 'Madre de Dios' },
    { value: 'MOQUEGUA', label: 'Moquegua' },
    { value: 'PASCO', label: 'Pasco' },
    { value: 'PIURA', label: 'Piura' },
    { value: 'PUNO', label: 'Puno' },
    { value: 'SAN_MARTIN', label: 'San Martín' },
    { value: 'TACNA', label: 'Tacna' },
    { value: 'TUMBES', label: 'Tumbes' },
    { value: 'UCAYALI', label: 'Ucayali' }
  ];

  loading = false;

  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService,
    private firmaDigitalService: FirmaDigitalService,
    private authService: AuthService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.verificarRolUsuario();

    if (this.tramite) {
      this.respuestaForm.asunto = `Respuesta a su trámite ${this.tramite.codigo} - ${this.tramite.asunto}`;
      this.respuestaForm.razonFirma = `Respuesta oficial al trámite ${this.tramite.codigo}`;
    }
  }

  private verificarRolUsuario() {
    const user = this.authService.currentUserValue;
    this.esEstudiante = user?.role?.name === 'ESTUDIANTE';

    if (this.esEstudiante) {
      this.respuestaForm.tipoFirma = TipoFirma.SIMPLE;
      this.tiposFirmaRespuesta = [
        { value: TipoFirma.SIMPLE, label: 'Firma Simple' }
      ];
    } else {
      this.tiposFirmaRespuesta = [
        { value: TipoFirma.SIMPLE, label: 'Firma Simple' },
        { value: TipoFirma.CONFORMIDAD, label: 'Conformidad' },
        { value: TipoFirma.AVANZADA, label: 'Firma Avanzada' }
      ];
    }
  }

  ngAfterViewInit() {
    this.initializeCanvas();
  }

  private initializeCanvas() {
    if (this.signatureCanvas && this.signatureCanvas.nativeElement) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx = canvas.getContext('2d');

      if (this.ctx) {
        // Configurar el canvas
        canvas.width = canvas.offsetWidth;
        canvas.height = 200;

        this.ctx.strokeStyle = '#000';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';

        // Limpiar el canvas
        this.clearCanvas();

        // Event listeners para dibujar
        canvas.addEventListener('mousedown', this.startDrawing.bind(this));
        canvas.addEventListener('mousemove', this.draw.bind(this));
        canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
        canvas.addEventListener('mouseout', this.stopDrawing.bind(this));

        // Touch events para móviles
        canvas.addEventListener('touchstart', this.handleTouchStart.bind(this));
        canvas.addEventListener('touchmove', this.handleTouchMove.bind(this));
        canvas.addEventListener('touchend', this.stopDrawing.bind(this));
      }
    }
  }

  private startDrawing(e: MouseEvent) {
    this.isDrawing = true;
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    this.lastX = e.clientX - rect.left;
    this.lastY = e.clientY - rect.top;
  }

  private draw(e: MouseEvent) {
    if (!this.isDrawing || !this.ctx) return;

    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const currentX = e.clientX - rect.left;
    const currentY = e.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    this.signatureExists = true;
  }

  private stopDrawing() {
    this.isDrawing = false;
  }

  private handleTouchStart(e: TouchEvent) {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    this.isDrawing = true;
    this.lastX = touch.clientX - rect.left;
    this.lastY = touch.clientY - rect.top;
  }

  private handleTouchMove(e: TouchEvent) {
    e.preventDefault();
    if (!this.isDrawing || !this.ctx) return;

    const touch = e.touches[0];
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();
    const currentX = touch.clientX - rect.left;
    const currentY = touch.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(this.lastX, this.lastY);
    this.ctx.lineTo(currentX, currentY);
    this.ctx.stroke();

    this.lastX = currentX;
    this.lastY = currentY;
    this.signatureExists = true;
  }

  clearCanvas() {
    if (this.ctx && this.signatureCanvas) {
      const canvas = this.signatureCanvas.nativeElement;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fondo blanco
      this.ctx.fillStyle = 'white';
      this.ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Línea de firma
      this.ctx.strokeStyle = '#ddd';
      this.ctx.lineWidth = 1;
      this.ctx.beginPath();
      this.ctx.moveTo(50, canvas.height - 30);
      this.ctx.lineTo(canvas.width - 50, canvas.height - 30);
      this.ctx.stroke();

      // Texto de ayuda
      this.ctx.fillStyle = '#888';
      this.ctx.font = '14px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Firme aquí', canvas.width / 2, canvas.height - 10);

      // Restaurar configuración para dibujar
      this.ctx.strokeStyle = '#000';
      this.ctx.lineWidth = 2;

      this.signatureExists = false;
      this.respuestaForm.firmaDigitalData = null;
    }
  }

  captureSignature() {
    if (this.signatureCanvas && this.signatureExists) {
      const canvas = this.signatureCanvas.nativeElement;
      this.respuestaForm.firmaDigitalData = canvas.toDataURL('image/png');
      this.toastService.success('Firma capturada', 'La firma digital ha sido capturada correctamente');
    } else {
      this.toastService.warning('Sin firma', 'Por favor, dibuje su firma antes de capturar');
    }
  }

  onRequiereFirmaChange() {
    if (this.respuestaForm.requiereFirmaDigital) {
      // Inicializar valores por defecto cuando se activa la firma
      if (!this.respuestaForm.razonFirma) {
        this.respuestaForm.razonFirma = `Respuesta oficial al trámite ${this.tramite.codigo}`;
      }

      setTimeout(() => {
        this.initializeCanvas();
      }, 100);

      this.toastService.info('Firma digital activada', 'Complete los datos de la firma digital');
    } else {
      // Limpiar datos de firma cuando se desactiva
      this.clearCanvas();
      this.respuestaForm.firmaDigitalData = null;
      this.respuestaForm.consentimientoFirma = false;
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newFiles = Array.from(files) as File[];
      
 
      for (const file of newFiles) {
        if (file.size > 10 * 1024 * 1024) {
          this.toastService.error('Archivo muy grande', 'El archivo ' + file.name + ' excede el tamaño máximo de 10MB');
      
          event.target.value = '';
          return;
        }
        
     
        const archivoExistente = this.respuestaForm.archivos.find(
          existingFile => existingFile.name === file.name && existingFile.size === file.size
        );
        
        if (archivoExistente) {
          this.toastService.warning('Archivo duplicado', 'El archivo ' + file.name + ' ya ha sido seleccionado');
          continue;
        }

        this.respuestaForm.archivos.push(file);
      }

      event.target.value = '';
    }
  }

  removeFile(index: number) {
    this.respuestaForm.archivos.splice(index, 1);
  }

  onSubmit() {
    if (!this.respuestaForm.respuesta.trim()) {
      this.toastService.error('Respuesta requerida', 'La respuesta es obligatoria');
      return;
    }

    // Validar firma digital si está activada
    if (this.respuestaForm.requiereFirmaDigital) {
      if (!this.respuestaForm.razonFirma.trim()) {
        this.toastService.error('Razón de firma requerida', 'Por favor indique la razón de la firma digital');
        return;
      }

      if (!this.respuestaForm.consentimientoFirma) {
        this.toastService.error('Consentimiento requerido', 'Debe confirmar que acepta firmar digitalmente esta respuesta');
        return;
      }

      if (!this.signatureExists || !this.respuestaForm.firmaDigitalData) {
        this.toastService.error('Firma requerida', 'Por favor dibuje su firma antes de enviar');
        return;
      }
    }

    this.loading = true;

    const formData = new FormData();
    formData.append('respuesta', this.respuestaForm.respuesta);
    formData.append('observaciones', this.respuestaForm.observaciones);
    formData.append('asunto', this.respuestaForm.asunto);

    // Agregar archivos
    for (const archivo of this.respuestaForm.archivos) {
      formData.append('archivos', archivo);
    }

    // Agregar datos de firma digital si está activada
    if (this.respuestaForm.requiereFirmaDigital) {
      formData.append('requiereFirmaDigital', 'true');
      formData.append('tipoFirma', this.respuestaForm.tipoFirma);
      formData.append('razonFirma', this.respuestaForm.razonFirma);
      formData.append('ubicacionFirma', this.respuestaForm.ubicacionFirma);
      formData.append('consentimientoFirma', String(this.respuestaForm.consentimientoFirma));

      if (this.respuestaForm.firmaDigitalData) {
        // Convertir la imagen base64 a blob
        const base64Data = this.respuestaForm.firmaDigitalData.split(',')[1];
        const byteCharacters = atob(base64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += 512) {
          const slice = byteCharacters.slice(offset, offset + 512);
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: 'image/png' });
        formData.append('firmaDigitalArchivo', blob, 'firma-digital.png');
      }
    }

    this.tramiteService.responderTramite(this.tramite.id, formData).subscribe({
      next: (response) => {
        const mensaje = this.respuestaForm.requiereFirmaDigital
          ? 'Trámite respondido con firma digital. Se ha enviado notificación al solicitante.'
          : 'Trámite respondido. Se ha enviado notificación al solicitante por correo electrónico.';

        this.toastService.success('Respuesta enviada', mensaje);
        this.tramiteRespondido.emit(response);
        this.closeModal();
      },
      error: (error) => {
        console.error('Error al responder trámite:', error);
        this.toastService.error('Error al responder', 'No se pudo responder el trámite. Intente nuevamente.');
        this.loading = false;
      }
    });
  }

  closeModal() {
    const tipoFirmaInicial = this.esEstudiante ? TipoFirma.SIMPLE : TipoFirma.CONFORMIDAD;

    this.respuestaForm = {
      respuesta: '',
      observaciones: '',
      asunto: '',
      archivos: [],
      requiereFirmaDigital: false,
      tipoFirma: tipoFirmaInicial,
      razonFirma: '',
      ubicacionFirma: 'LIMA',
      firmaDigitalData: null,
      consentimientoFirma: false
    };

    if (this.signatureCanvas) {
      this.clearCanvas();
    }
    this.signatureExists = false;

    this.loading = false;
    this.close.emit();
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }
}