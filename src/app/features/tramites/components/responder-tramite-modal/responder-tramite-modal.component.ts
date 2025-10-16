import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TramiteService } from '../../../../services/tramite.service';
import { ToastService } from '../../../../services/toast.service';

@Component({
  selector: 'app-responder-tramite-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './responder-tramite-modal.component.html',
  styleUrl: './responder-tramite-modal.component.css'
})
export class ResponderTramiteModalComponent implements OnInit {
  @Input() tramite: any;
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() tramiteRespondido = new EventEmitter<any>();

  respuestaForm = {
    respuesta: '',
    observaciones: '',
    asunto: '',
    archivos: [] as File[]
  };

  loading = false;
  
  constructor(
    private tramiteService: TramiteService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    if (this.tramite) {
      this.respuestaForm.asunto = `Respuesta a su trámite ${this.tramite.codigo} - ${this.tramite.asunto}`;
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

    this.loading = true;
    
    const formData = new FormData();
    formData.append('respuesta', this.respuestaForm.respuesta);
    formData.append('observaciones', this.respuestaForm.observaciones);
    formData.append('asunto', this.respuestaForm.asunto);
    

    for (const archivo of this.respuestaForm.archivos) {
      formData.append('archivos', archivo);
    }

    this.tramiteService.responderTramite(this.tramite.id, formData).subscribe({
      next: (response) => {
        this.toastService.success('Trámite respondido', 'Se ha enviado notificación al solicitante por correo electrónico.');
        this.tramiteRespondido.emit(response);
        this.closeModal();
      },
      error: (error) => {
        this.toastService.error('Error al responder', 'No se pudo responder el trámite. Intente nuevamente.');
        this.loading = false;
      }
    });
  }

  closeModal() {
    this.respuestaForm = {
      respuesta: '',
      observaciones: '',
      asunto: '',
      archivos: []
    };
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