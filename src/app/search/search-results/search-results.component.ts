import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchResult, TramiteResponse } from '../../shared/interfaces/search.interface';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent {
  @Input() selectedResult: SearchResult | null = null;
  @Input() selectedTramite: TramiteResponse | null = null;
  @Input() loadingDocuments = false;
  @Input() errorMessage = '';
  @Input() showError = false;

  @Output() onClearSearch = new EventEmitter<void>();
  @Output() onViewDocument = new EventEmitter<void>();
  @Output() onViewResponseDocument = new EventEmitter<any>();

  viewDocument(): void {
    this.onViewDocument.emit();
  }

  viewResponseDoc(archivo: any): void {
    this.onViewResponseDocument.emit(archivo);
  }

  clearSearch(): void {
    this.onClearSearch.emit();
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Aprobado': 'bg-green-100 text-green-700',
      'Completado': 'bg-green-100 text-green-700',
      'En Proceso': 'bg-yellow-100 text-yellow-700',
      'Pendiente': 'bg-orange-100 text-orange-700',
      'Rechazado': 'bg-red-100 text-red-700'
    };
    return classes[status] || 'bg-gray-100 text-gray-700';
  }
}
