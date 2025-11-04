import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, debounceTime, distinctUntilChanged, Subscription, catchError, of } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '../../environments/environment';
import { ApiSearchResponse, SearchResult, TramiteResponse } from '../shared/interfaces/search.interface';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery = '';
  isSearching = false;
  showError = false;
  showSuccess = false;
  selectedResult: SearchResult | null = null;
  possibleMatches: SearchResult[] = [];
  showPdfViewer = false;
  pdfUrl: SafeResourceUrl | null = null;
  isDarkMode = false;
  private searchSubject = new Subject<string>();
  private themeSubscription?: Subscription;
  private apiUrl = environment.apiUrl;
  errorMessage = '';
  showDocumentsModal = false;
  documentos: any[] = [];
  currentDocument: any | null = null;
  loadingDocuments = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });

    // Check for QR parameter and auto-search
    this.route.queryParams.subscribe(params => {
      const qrCode = params['qr'];
      if (qrCode) {
        this.searchByQRCode(qrCode);
      }
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearchChange(): void {
    this.showError = false;
    this.showSuccess = false;
    this.selectedResult = null;
    
    if (this.searchQuery.length >= 3) {
      this.isSearching = true;
      this.searchSubject.next(this.searchQuery);
    } else {
      this.possibleMatches = [];
    }
  }

  performSearch(query: string): void {
    // Detectar si parece un código de trámite (empieza con TRM- o tiene formato similar)
    const isCodigoFormat = /^TRM-/.test(query.toUpperCase()) || query.includes('-');
    const searchParam = isCodigoFormat ? 'codigo' : 'texto';
    
    this.http.get<ApiSearchResponse>(`${this.apiUrl}/api/tramites/public/buscar?${searchParam}=${encodeURIComponent(query)}&size=8`)
      .pipe(
        catchError(error => {
          this.isSearching = false;
          this.possibleMatches = [];
          this.showSuccess = false;
          return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true, numberOfElements: 0, empty: true });
        })
      )
      .subscribe(response => {
        this.isSearching = false;
        
        if (response.content && response.content.length > 0) {
          this.possibleMatches = response.content.map(tramite => ({
            id: tramite.id,
            codigo: tramite.codigo,
            expediente: tramite.numeroExpediente || tramite.codigo,
            fecha: this.formatDate(tramite.fechaCreacion),
            tipo: tramite.tipo,
            estado: tramite.estado,
            descripcion: tramite.descripcion,
            titulo: tramite.titulo,
            solicitante: tramite.usuarioSolicitante ? 
              `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : 'N/A',
            area: tramite.areaActual?.nombre || 'N/A'
          }));
          this.showSuccess = false; 
        } else {
          this.possibleMatches = [];
          this.showSuccess = false;
        }
      });
  }

  search(): void {
    if (!this.searchQuery) return;
    
    this.isSearching = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = '';
    
    this.http.get<ApiSearchResponse>(`${this.apiUrl}/api/tramites/public/buscar?codigo=${encodeURIComponent(this.searchQuery)}&size=1`)
      .pipe(
        catchError(error => {
          let errorMsg = 'Error en la búsqueda. Intente nuevamente.';
          
          if (error.status === 404) {
            errorMsg = `No se encontró el expediente "${this.searchQuery}". Verifique el número e intente nuevamente.`;
          } else if (error.status === 400) {
            errorMsg = 'Formato de expediente inválido. Verifique el número ingresado.';
          } else if (error.status === 0) {
            errorMsg = 'No se puede conectar con el servidor. Verifique su conexión.';
          }
          
          this.errorMessage = errorMsg;
          return of({ content: [], totalElements: 0, totalPages: 0, size: 0, number: 0, first: true, last: true, numberOfElements: 0, empty: true });
        })
      )
      .subscribe(response => {
        this.isSearching = false;
        
        if (response.content && response.content.length > 0) {
          const tramite = response.content[0];
          const searchResult: SearchResult = {
            id: tramite.id,
            codigo: tramite.codigo,
            expediente: tramite.numeroExpediente || tramite.codigo,
            fecha: this.formatDate(tramite.fechaCreacion),
            tipo: tramite.tipo,
            estado: tramite.estado,
            descripcion: tramite.descripcion,
            titulo: tramite.titulo,
            solicitante: tramite.usuarioSolicitante ? 
              `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : 'N/A',
            area: tramite.areaActual?.nombre || 'N/A'
          };
          
          this.selectedResult = searchResult;
          this.showSuccess = true;
          this.possibleMatches = [];
        } else {
          this.showError = true;
          this.selectedResult = null;
          if (!this.errorMessage) {
            this.errorMessage = `No se encontró el expediente "${this.searchQuery}". Verifique el número e intente nuevamente.`;
          }
        }
      });
  }

  selectResult(result: SearchResult): void {
    this.selectedResult = result;
    this.searchQuery = result.expediente;
    this.possibleMatches = [];
    this.showSuccess = true;
  }

  searchByQRCode(qrCode: string): void {
    // Usar el endpoint de verificación QR del backend
    this.isSearching = true;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = '';

    this.http.get<any>(`${this.apiUrl}/api/qr/verificar/${qrCode}`)
      .pipe(
        catchError(error => {
          let errorMsg = 'Error verificando el código QR.';

          if (error.status === 404) {
            errorMsg = 'Código QR no válido o trámite no encontrado.';
          } else if (error.status === 400) {
            errorMsg = 'Formato de código QR inválido.';
          } else if (error.status === 0) {
            errorMsg = 'No se puede conectar con el servidor.';
          }

          this.errorMessage = errorMsg;
          this.showError = true;
          this.isSearching = false;
          return of(null);
        })
      )
      .subscribe(response => {
        this.isSearching = false;

        if (response && response.tramite) {
          const tramite = response.tramite;
          const searchResult: SearchResult = {
            id: tramite.id || 0,
            codigo: tramite.codigo,
            expediente: tramite.numeroExpediente || tramite.codigo,
            fecha: this.formatDate(tramite.fechaCreacion),
            tipo: tramite.tipo,
            estado: tramite.estado,
            descripcion: tramite.asunto || 'N/A',
            titulo: tramite.asunto || 'N/A',
            solicitante: 'N/A', 
            area: 'N/A'
          };

          this.selectedResult = searchResult;
          this.searchQuery = searchResult.codigo;
          this.showSuccess = true;
          this.possibleMatches = [];

          // Limpiar el QR de la URL para evitar búsquedas repetidas
          this.router.navigate(['/buscar'], { queryParams: {} });
        }
      });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.selectedResult = null;
    this.possibleMatches = [];
    this.showError = false;
    this.showSuccess = false;
  }

  getStatusClass(status: string): string {
    const classes = {
      'Aprobado': 'bg-green-100 text-green-700',
      'Completado': 'bg-green-100 text-green-700',
      'En Proceso': 'bg-yellow-100 text-yellow-700',
      'Pendiente': 'bg-orange-100 text-orange-700',
      'Rechazado': 'bg-red-100 text-red-700'
    };
    return classes[status as keyof typeof classes] || 'bg-gray-100 text-gray-700';
  }

  viewDocument(): void {
    if (!this.selectedResult) return;

    this.loadingDocuments = true;
    this.errorMessage = '';

    this.http.get<TramiteResponse>(`${this.apiUrl}/api/tramites/public/preview/${this.selectedResult.codigo}`)
    .pipe(
      catchError(error => {
        this.loadingDocuments = false;

    
        if (error.status === 404) {
          this.errorMessage = '❌ Trámite no encontrado. El expediente podría no existir o no está disponible públicamente.';
        } else if (error.status === 403) {
          this.errorMessage = '🔒 Acceso denegado. Este trámite no está disponible para consulta pública.';
        } else if (error.status === 0) {
          this.errorMessage = '🌐 Sin conexión. Verifica tu conexión a internet e intenta nuevamente.';
        } else {
          this.errorMessage = '⚠️ Error al cargar el documento. Por favor, intenta nuevamente más tarde.';
        }

        this.showError = true;
        return of(null);
      })
    )
    .subscribe(tramite => {
      this.loadingDocuments = false;

      if (!tramite) {
        return;
      }

      if (tramite.documentosAdjuntos && tramite.documentosAdjuntos.length > 0) {
        this.documentos = tramite.documentosAdjuntos;
        this.showDocumentsModal = true;
        this.showError = false;
      } else {
        this.errorMessage = '📄 No hay documentos adjuntos disponibles para este trámite.';
        this.showError = true;
        this.documentos = [];
      }
    });
  }

  viewSpecificDocument(documento: any): void {
    if (!this.selectedResult || !documento) return;

    this.currentDocument = documento;
    this.loadingDocuments = true;


    this.http.get(`${this.apiUrl}/api/tramites/public/${this.selectedResult.codigo}/archivo/${documento.nombre}`, {
      responseType: 'blob'
    })
    .pipe(
      catchError(error => {
        this.loadingDocuments = false;

        if (error.status === 404) {
          this.errorMessage = '❌ Documento no encontrado. El archivo podría haber sido eliminado.';
        } else {
          this.errorMessage = '⚠️ Error al cargar el documento. Intenta nuevamente.';
        }

        return of(null);
      })
    )
    .subscribe(blob => {
      this.loadingDocuments = false;

      if (blob) {
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfViewer = true;
      }
    });
  }

  closeDocumentsModal(): void {
    this.showDocumentsModal = false;
    this.documentos = [];
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  getFileIcon(tipo: string): string {
    if (tipo.includes('pdf')) return 'fas fa-file-pdf';
    if (tipo.includes('word') || tipo.includes('doc')) return 'fas fa-file-word';
    if (tipo.includes('excel') || tipo.includes('sheet')) return 'fas fa-file-excel';
    if (tipo.includes('image') || tipo.includes('png') || tipo.includes('jpg')) return 'fas fa-file-image';
    return 'fas fa-file';
  }

  closePdfViewer(): void {
    this.showPdfViewer = false;
    this.pdfUrl = null;
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    } catch {
      return dateString;
    }
  }

  goHome(): void {
    const user = this.authService.currentUserValue;

    if (!user || !user.role) {
      this.router.navigate(['/']);
      return;
    }

    const roleName = user.role.name.toUpperCase();

    switch (roleName) {
      case 'USUARIO':
        this.router.navigate(['/usuario/mis-tramites']);
        break;
      case 'ADMINISTRATIVO':
        this.router.navigate(['/administrativo/dashboard']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'ESTUDIANTE':
        this.router.navigate(['/estudiante/tablero']);
        break;
      default:
        this.router.navigate(['/']);
    }
  }
}