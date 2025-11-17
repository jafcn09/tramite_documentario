import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-tramite-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-tramite-form.component.html',
  styleUrl: './create-tramite-form.component.css'
})
export class CreateTramiteFormComponent implements OnInit, OnChanges {
  @Input() tramiteForm: any;
  @Input() tiposDocumento: any[] = [];
  @Input() tiposTramite: any[] = [];
  @Input() archivosPreview: any[] = [];
  @Input() captchaImage: string | null = null;
  @Input() isLoadingCaptcha = false;
  @Input() isSubmittingTramite = false;
  @Input() successMessage = '';
  @Input() errorMessage = '';
  @Input() showError = false;
  @Input() isDarkMode = false;

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['captchaImage']) {
    }
  }

  @Output() onGenerateCaptcha = new EventEmitter<void>();
  @Output() onFilesSelected = new EventEmitter<any>();
  @Output() onRemoveFile = new EventEmitter<number>();
  @Output() onNumericInput = new EventEmitter<any>();
  @Output() onResetForm = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<void>();

  generateCaptcha(): void {
    this.onGenerateCaptcha.emit();
  }

  onFileSelect(event: any): void {
    this.onFilesSelected.emit(event);
  }

  removeFile(index: number): void {
    this.onRemoveFile.emit(index);
  }

  onNumericInputChange(event: any, field: string): void {
    this.onNumericInput.emit({ event, field });
  }

  onCaptchaInput(event: any): void {
    const input = event.target as HTMLInputElement;
    const upperValue = input.value.toUpperCase();
    this.tramiteForm.captchaCode = upperValue;
  }

  resetForm(): void {
    this.onResetForm.emit();
  }

  submitForm(): void {
    this.onSubmit.emit();
  }

  getTipoDocumentoConfig(): any {
    return this.tiposDocumento.find(t => t.value === this.tramiteForm.tipoDocumento) || this.tiposDocumento[0];
  }
}
