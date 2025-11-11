import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchResult } from '../../shared/interfaces/search.interface';

@Component({
  selector: 'app-search-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-form.component.html',
  styleUrl: './search-form.component.css'
})
export class SearchFormComponent {
  @Input() searchQuery = '';
  @Input() isSearching = false;
  @Input() showError = false;
  @Input() showSuccess = false;
  @Input() errorMessage = '';
  @Input() searchType: 'dni' | 'codigo' | 'texto' | '' = '';
  @Input() possibleMatches: SearchResult[] = [];

  @Output() onSearchChange = new EventEmitter<void>();
  @Output() onSearch = new EventEmitter<void>();
  @Output() onSelectResult = new EventEmitter<SearchResult>();
  @Output() onClearSearch = new EventEmitter<void>();
  @Output() searchQueryModelChange = new EventEmitter<string>();

  onInputChange(): void {
    this.searchQueryModelChange.emit(this.searchQuery);
    this.onSearchChange.emit();
  }

  performSearch(): void {
    this.onSearch.emit();
  }

  selectMatch(result: SearchResult): void {
    this.onSelectResult.emit(result);
  }

  clear(): void {
    this.searchQuery = '';
    this.searchQueryModelChange.emit('');
    this.onClearSearch.emit();
  }
}
