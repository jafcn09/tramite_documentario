import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SearchResult } from '../../shared/interfaces/search.interface';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css'
})
export class PdfViewerComponent {
  @Input() pdfUrl: SafeResourceUrl | null = null;
  @Input() selectedResult: SearchResult | null = null;
  @Input() currentDocument: any | null = null;
  @Input() canPreviewDocument = true;

  @Output() onClose = new EventEmitter<void>();

  close(): void {
    this.onClose.emit();
  }

  downloadDocument(): void {
    if (this.pdfUrl) {
      const link = document.createElement('a');
      link.href = this.pdfUrl as string;
      link.download = this.currentDocument?.nombre || 'documento';
      link.click();
    }
  }
}
