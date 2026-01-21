import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Grado, GradoResponse } from '../shared/interfaces/grado.interface';
import { GradoService } from '../services/grado.service';
import { ThemeService } from '../services/theme.service';
import { ThemeToggleComponent } from '../shared/components/theme-toggle/theme-toggle.component';
import { Subject, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-grados',
  standalone: true,
  imports: [CommonModule, FormsModule, ThemeToggleComponent],
  templateUrl: './grados.component.html',
  styleUrls: ['./grados.component.css']
})
export class GradosComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private themeSubscription?: Subscription;

  currentTab: 'dni' | 'codigo' = 'dni';


  searchForm = {
    dni: '',
    codigo: ''
  };

  isSearching = false;
  hasSearched = false;
  searchResults: Grado[] = [];
  selectedGrado: Grado | null = null;
  showDetailModal = false;
  errorMessage = '';
  showSuggestions = false;
  liveSuggestions: Grado[] = [];
  suggestionCount = 0;
  isLoadingSuggestions = false;
  isLoadingMoreSuggestions = false;
  currentPage = 0;
  pageSize = 10;
  hasMoreSuggestions = false;
  allSuggestions: Grado[] = [];
  private searchSubject = new Subject<string>();

  stats = {
    total: 0,
    facultades: [] as string[],
    tipos: [] as string[]
  };

  constructor(
    private gradoService: GradoService,
    private themeService: ThemeService
  ) {}

  ngOnInit(): void {
    // Sincronizar con el tema actual
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });

    this.loadStats();
    this.setupLiveSearch();
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }

  setupLiveSearch(): void {
    console.log('setupLiveSearch inicializado');
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        // Validar longitud mínima según el tipo de búsqueda
        const minLength = this.currentTab === 'dni' ? 3 : 4; // DNI: 3 dígitos, Código: 4 caracteres

        if (!term || term.length < minLength) {
          this.liveSuggestions = [];
          this.allSuggestions = [];
          this.showSuggestions = false;
          this.isLoadingSuggestions = false;
          this.currentPage = 0;
          this.hasMoreSuggestions = false;
          return of(null);
        }


        this.isLoadingSuggestions = true;
        this.showSuggestions = true;
        this.liveSuggestions = [];
        this.allSuggestions = [];
        this.currentPage = 0;

        const params: any = {};
        if (this.currentTab === 'dni') {
          params.dni = term;
        } else if (this.currentTab === 'codigo') {
          params.codigo = term;
        }


        return this.gradoService.consultar(params);
      })
    ).subscribe({
      next: (response: any) => {

        this.isLoadingSuggestions = false;


        if (!response) {

          return;
        }

        if (response.encontrado) {

          if (response.grados) {
            this.allSuggestions = response.grados;
            this.suggestionCount = response.cantidad || response.grados.length;
          } else if (response.grado) {
            this.allSuggestions = [response.grado];
            this.suggestionCount = 1;
          }

          // Mostrar solo la primera página
          this.currentPage = 0;
          this.loadMoreSuggestionsPage();
          this.showSuggestions = this.allSuggestions.length > 0;

        } else {

          this.liveSuggestions = [];
          this.allSuggestions = [];
          this.suggestionCount = 0;
          this.showSuggestions = true;
        }
      },
      error: (error) => {
        console.error('Error en búsqueda en tiempo real:', error);
        this.isLoadingSuggestions = false;
        this.liveSuggestions = [];
        this.allSuggestions = [];
        this.showSuggestions = false;
      }
    });
  }

  loadStats(): void {
    this.gradoService.obtenerEstadisticas().subscribe({
      next: (stats) => {
        this.stats = stats;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
      }
    });
  }


  changeTab(tab: 'dni' | 'codigo'): void {
    this.currentTab = tab;
    this.resetSearch();
  }

  
  buscar(): void {
    if (!this.isValidSearch()) {
      return;
    }

    this.showSuggestions = false;
    this.liveSuggestions = [];

    this.isSearching = true;
    this.hasSearched = true;
    this.errorMessage = '';
    this.searchResults = [];

    const params: any = {};

    if (this.currentTab === 'dni' && this.searchForm.dni) {
      params.dni = this.searchForm.dni.trim();
    } else if (this.currentTab === 'codigo' && this.searchForm.codigo) {
      params.codigo = this.searchForm.codigo.trim();
    }

    this.gradoService.consultar(params).subscribe({
      next: (response: GradoResponse) => {
        this.isSearching = false;

        if (response.encontrado) {
          if (response.grados) {
            this.searchResults = response.grados;
          } else if (response.grado) {
            this.searchResults = [response.grado];
          }
        } else {

          if (this.currentTab === 'dni') {
            this.errorMessage = `No se encontraron grados académicos para el DNI: ${this.searchForm.dni}`;
          } else if (this.currentTab === 'codigo') {
            this.errorMessage = `No se encontró el diploma con código: ${this.searchForm.codigo}`;
          } else {
            this.errorMessage = response.mensaje || 'No se encontraron resultados';
          }
        }
      },
      error: (error) => {
        this.isSearching = false;
        this.errorMessage = 'Error al realizar la búsqueda. Por favor, inténtelo nuevamente.';
        console.error('Error en búsqueda:', error);
      }
    });
  }


  isValidSearch(): boolean {
    if (this.currentTab === 'dni') {
      return this.searchForm.dni.trim().length === 8;
    } else if (this.currentTab === 'codigo') {
      const codigoLength = this.searchForm.codigo.trim().length;
      return codigoLength >= 4 && codigoLength <= 12;
    }
    return false;
  }


  verDetalle(grado: Grado): void {
    this.selectedGrado = grado;
    this.showDetailModal = true;
  }

  cerrarDetalle(): void {
    this.showDetailModal = false;
    this.selectedGrado = null;
  }


  resetSearch(): void {
    this.hasSearched = false;
    this.searchResults = [];
    this.errorMessage = '';
    this.liveSuggestions = [];
    this.showSuggestions = false;
    this.searchForm = {
      dni: '',
      codigo: ''
    };
  }

  onSearchInput(): void {
    let term = '';
    if (this.currentTab === 'dni') {
      term = this.searchForm.dni;
    } else if (this.currentTab === 'codigo') {
      term = this.searchForm.codigo;
    }
    this.searchSubject.next(term);
  }

  selectSuggestion(grado: Grado): void {
    this.selectedGrado = grado;
    this.showDetailModal = true;
    this.showSuggestions = false;
  }

  hideSuggestions(): void {
   
    setTimeout(() => {
      this.showSuggestions = false;
    }, 200);
  }

  descargarConstancia(grado: Grado): void {

    console.log('Descargar constancia para:', grado);
    alert('Funcionalidad de descarga en desarrollo');
  }

  loadMoreSuggestionsPage(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const newSuggestions = this.allSuggestions.slice(startIndex, endIndex);

    if (this.currentPage === 0) {
      this.liveSuggestions = newSuggestions;
    } else {
      this.liveSuggestions = [...this.liveSuggestions, ...newSuggestions];
    }

    this.hasMoreSuggestions = endIndex < this.allSuggestions.length;
  }

  onSuggestionScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollPosition = element.scrollTop + element.clientHeight;
    const scrollHeight = element.scrollHeight;

    // Si estamos a 50px del fondo y hay más sugerencias
    if (scrollHeight - scrollPosition < 50 && this.hasMoreSuggestions && !this.isLoadingMoreSuggestions) {
      this.isLoadingMoreSuggestions = true;
      this.currentPage++;

      // Simular un pequeño delay para mostrar el preloader
      setTimeout(() => {
        this.loadMoreSuggestionsPage();
        this.isLoadingMoreSuggestions = false;
      }, 300);
    }
  }
}