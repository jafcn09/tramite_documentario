import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResult } from '../../shared/interfaces/search.interface';

@Component({
  selector: 'app-documents-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './documents-modal.component.html',
  styleUrl: './documents-modal.component.css'
})
export class DocumentsModalComponent {
  @Input() documentos: any[] = [];
  @Input() selectedResult: SearchResult | null = null;

  @Output() onClose = new EventEmitter<void>();
  @Output() onViewDocument = new EventEmitter<any>();

  close(): void {
    this.onClose.emit();
  }

  viewDocument(documento: any): void {
    this.onViewDocument.emit(documento);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  getFileIcon(tipo: string): string {
    if (tipo.includes('pdf')) return 'fas fa-file-pdf';
    if (tipo.includes('word') || tipo.includes('doc')) return 'fas fa-file-word';
    if (tipo.includes('excel') || tipo.includes('sheet')) return 'fas fa-file-excel';
    if (tipo.includes('image') || tipo.includes('png') || tipo.includes('jpg')) return 'fas fa-file-image';
    return 'fas fa-file';
  }
}
