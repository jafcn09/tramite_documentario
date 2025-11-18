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
import { TramiteService } from '../services/tramite.service';



@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit, OnDestroy {
  currentView: 'landing' | 'search' | 'create' = 'landing';
  searchQuery = '';
  isSearching = false;
  showError = false;
  showSuccess = false;
  selectedResult: SearchResult | null = null;
  selectedTramite: TramiteResponse | null = null;
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
  canPreviewDocument = true;
  searchType: 'dni' | 'codigo' | 'texto' | '' = '';

  tramiteForm = {
    tipoDocumento: 'DNI',
    numeroDocumento: '',
    nombres: '',
    apellidos: '',
    email: '',
    telefono: '',
    tipoTramite: '',
    asunto: '',
    descripcion: '',
    captchaToken: '',
    captchaCode: '',
    archivos: [] as File[]
  };

  tiposDocumento = [
    { value: 'DNI', label: 'DNI', maxLength: 15, pattern: '[0-9]{8,15}', placeholder: '12345678' },
    { value: 'CARNET_EXTRANJERIA', label: 'Carnet de Extranjería', maxLength: 15, pattern: '[0-9]{8,15}', placeholder: '123456789' },
    { value: 'PASAPORTE', label: 'Pasaporte', maxLength: 15, pattern: '[0-9]{8,15}', placeholder: '12345678' }
  ];

  archivosPreview: { file: File, preview?: string, type: string }[] = [];

  captchaImage: string | null = null;
  isLoadingCaptcha = false;
  isSubmittingTramite = false;
  successMessage = '';
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'error';

  tiposTramite = [
    { value: 'SOLICITUD_CERTIFICADO', label: 'Solicitud de Certificado' },
    { value: 'SOLICITUD_CONSTANCIA', label: 'Solicitud de Constancia' },
    { value: 'RECLAMO', label: 'Reclamo' },
    { value: 'CONSULTA', label: 'Consulta' }
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private authService: AuthService,
    private tramiteService: TramiteService
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(query => {
      this.performSearch(query);
    });

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
   
    if (/^TRM-/.test(query.toUpperCase()) || query.includes('-')) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = '⚠️ Solo se permite buscar por Número de Documento de Identidad. No se aceptan códigos de trámite.';
      return;
    }

   
    if (/[a-zA-Z]/.test(query) && /\d/.test(query) && !/^[A-Z0-9]+$/.test(query.toUpperCase())) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = '⚠️ Solo se permite buscar por Número de Documento de Identidad (DNI, Carnet de Extranjería o Pasaporte).';
      return;
    }


    if (/\s/.test(query)) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = '⚠️ Solo se permite buscar por Número de Documento de Identidad. No se acepta texto libre.';
      return;
    }

    const isDNI = /^\d{8}$/.test(query);
    const isCarnetExtranjeria = /^[A-Z0-9]{9,12}$/.test(query.toUpperCase());
    const isPasaporte = /^[A-Z0-9]{6,12}$/.test(query.toUpperCase());

    if (!isDNI && !isCarnetExtranjeria && !isPasaporte) {
      this.isSearching = false;
      this.possibleMatches = [];
      this.showSuccess = false;
      this.showError = true;
      this.errorMessage = '⚠️ Formato de documento inválido. DNI: 8 dígitos, Carnet de Extranjería: 9-12 caracteres alfanuméricos, Pasaporte: 6-12 caracteres alfanuméricos.';
      return;
    }

    this.searchType = 'dni';

    this.http.get<ApiSearchResponse>(`${this.apiUrl}/api/tramites/public/buscar?dni=${encodeURIComponent(query)}&size=8`)
      .pipe(
        catchError(() => {
          this.isSearching = false;
          this.possibleMatches = [];
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = `No se encontraron trámites asociados al documento "${query}". Verifica el número de documento.`;
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
            estado: typeof tramite.estado === 'string' ? tramite.estado : (tramite.estado as any).nombre || 'N/A',
            descripcion: tramite.descripcion,
            titulo: tramite.titulo,
            solicitante: tramite.usuarioSolicitante ?
              `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : 'N/A',
            area: tramite.areaActual?.nombre || 'N/A'
          }));
          this.showSuccess = false;
          this.showError = false;
          this.errorMessage = '';
        } else {
          this.possibleMatches = [];
          this.showSuccess = false;
          this.showError = true;
          this.errorMessage = `No se encontraron trámites asociados al documento "${query}".`;
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
            estado: typeof tramite.estado === 'string' ? tramite.estado : tramite.estado?.nombre || 'N/A',
            descripcion: tramite.descripcion,
            titulo: tramite.titulo,
            solicitante: tramite.usuarioSolicitante ?
              `${tramite.usuarioSolicitante.nombre} ${tramite.usuarioSolicitante.apellidos}` : 'N/A',
            area: tramite.areaActual?.nombre || 'N/A'
          };

          this.selectedResult = searchResult;
          this.selectedTramite = tramite;
          this.showSuccess = true;
          this.possibleMatches = [];
        } else {
          this.showError = true;
          this.selectedResult = null;
          this.selectedTramite = null;
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
            estado: typeof tramite.estado === 'string' ? tramite.estado : tramite.estado?.nombre || 'N/A',
            descripcion: tramite.asunto || 'N/A',
            titulo: tramite.asunto || 'N/A',
            solicitante: 'N/A',
            area: 'N/A'
          };

          this.selectedResult = searchResult;
          this.searchQuery = searchResult.codigo;
          this.showSuccess = true;
          this.possibleMatches = [];
          this.router.navigate(['/buscar'], { queryParams: {} });
        }
      });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.selectedResult = null;
    this.selectedTramite = null;
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


      // Combine both documentosAdjuntos (original) and archivosRespuesta (response) documents
      this.documentos = [];

      if (tramite.documentosAdjuntos && tramite.documentosAdjuntos.length > 0) {
        // Add original documents
        this.documentos = [...this.documentos, ...tramite.documentosAdjuntos];
      }

      if (tramite.archivosRespuesta && tramite.archivosRespuesta.length > 0) {
        // Add response documents (these contain base64 content)
        this.documentos = [...this.documentos, ...tramite.archivosRespuesta];
      }

      this.showDocumentsModal = true;
      this.showError = false;
    });
  }

  viewSpecificDocument(documento: any): void {
    if (!this.selectedResult || !documento) return;

    this.currentDocument = documento;
    this.loadingDocuments = true;

    const previewableTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'text/plain'
    ];
    this.canPreviewDocument = previewableTypes.some(type =>
      documento.tipo?.toLowerCase().includes(type.toLowerCase())
    );


    if (documento.contenido) {
      try {

        const byteCharacters = atob(documento.contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: documento.tipo || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfViewer = true;
        this.loadingDocuments = false;
      } catch (error) {
        this.loadingDocuments = false;
        this.errorMessage = '⚠️ Error al procesar el documento.';
      }
    } else {
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

  viewResponseDocument(archivo: any): void {
    if (!archivo) return;

    this.currentDocument = archivo;
    this.loadingDocuments = true;

    const previewableTypes = [
      'application/pdf',
      'image/png',
      'image/jpeg',
      'image/jpg',
      'image/gif',
      'text/plain'
    ];
    this.canPreviewDocument = previewableTypes.some(type =>
      archivo.tipo?.toLowerCase().includes(type.toLowerCase())
    );

    if (archivo.contenido) {
      try {
        const byteCharacters = atob(archivo.contenido);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: archivo.tipo || 'application/octet-stream' });
        const url = URL.createObjectURL(blob);
        this.pdfUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.showPdfViewer = true;
        this.loadingDocuments = false;
      } catch (error) {
        this.loadingDocuments = false;
        this.errorMessage = '⚠️ Error al procesar el archivo de respuesta.';
      }
    } else {
      this.loadingDocuments = false;
      this.errorMessage = '⚠️ El contenido del archivo no está disponible.';
    }
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

  navigateToSearch(): void {
    this.currentView = 'search';
    this.clearSearch();
  }

  navigateToCreate(): void {
    this.currentView = 'create';
    this.resetCreateForm();
    this.generateCaptcha();
  }

  backToLanding(): void {
    this.currentView = 'landing';
    this.clearSearch();
    this.resetCreateForm();
  }

  resetCreateForm(): void {
    this.tramiteForm = {
      tipoDocumento: 'DNI',
      numeroDocumento: '',
      nombres: '',
      apellidos: '',
      email: '',
      telefono: '',
      tipoTramite: '',
      asunto: '',
      descripcion: '',
      captchaToken: '',
      captchaCode: '',
      archivos: []
    };
    this.archivosPreview = [];
    this.captchaImage = null;
    this.showError = false;
    this.showSuccess = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  generateCaptcha(): void {
    this.isLoadingCaptcha = true;
    this.errorMessage = '';

    this.http.get<any>(`${this.apiUrl}/api/captcha/generar`)
      .pipe(
        catchError(() => {
          this.isLoadingCaptcha = false;
          this.errorMessage = 'Error al generar el CAPTCHA. Intenta nuevamente.';
          return of(null);
        })
      )
      .subscribe(response => {
        this.isLoadingCaptcha = false;
        if (response) {
          this.captchaImage = response.image;
          this.tramiteForm.captchaToken = response.token;
        }
      });
  }

  onFilesSelected(event: any): void {
    const files = event.target.files;

    // Verificar que el total de archivos no exceda 3
    const totalFiles = (this.tramiteForm.archivos?.length || 0) + files.length;
    if (totalFiles > 3) {
      this.showToastMessage('⚠️ Máximo 3 archivos permitidos en total', 'warning');
      event.target.value = '';
      return;
    }

    const validExtensions = ['pdf', 'docx', 'doc'];
    const maxSize = 50 * 1024 * 1024;

    // Inicializar arrays si no existen
    if (!this.tramiteForm.archivos) {
      this.tramiteForm.archivos = [];
    }
    if (!this.archivosPreview) {
      this.archivosPreview = [];
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const extension = file.name.split('.').pop()?.toLowerCase();

      if (!extension || !validExtensions.includes(extension)) {
        this.showToastMessage(`❌ Archivo "${file.name}" no permitido. Solo se permiten: ${validExtensions.join(', ')}`, 'error');
        event.target.value = '';
        return;
      }

      if (file.size > maxSize) {
        this.showToastMessage(`❌ Archivo "${file.name}" excede el tamaño máximo de 50MB`, 'error');
        event.target.value = '';
        return;
      }

      // Agregar archivo al array
      this.tramiteForm.archivos.push(file);

      const fileType = file.type.startsWith('image/') ? 'image' :
                      file.type === 'application/pdf' ? 'pdf' : 'document';

      if (fileType === 'image') {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.archivosPreview.push({
            file: file,
            preview: e.target.result,
            type: fileType
          });
        };
        reader.readAsDataURL(file);
      } else {
        this.archivosPreview.push({
          file: file,
          type: fileType
        });
      }
    }

    this.showError = false;
    this.errorMessage = '';
    event.target.value = '';
  }

  removeFile(index: number): void {
    this.tramiteForm.archivos.splice(index, 1);
    this.archivosPreview.splice(index, 1);
  }

  getTipoDocumentoConfig() {
    return this.tiposDocumento.find(t => t.value === this.tramiteForm.tipoDocumento) || this.tiposDocumento[0];
  }

  isFormComplete(): boolean {
    const tipoDoc = this.getTipoDocumentoConfig();
    const numeroDocRegex = new RegExp(tipoDoc.pattern);

    
    const numeroDocumentoValido = this.tramiteForm.numeroDocumento &&
                                  numeroDocRegex.test(this.tramiteForm.numeroDocumento) &&
                                  this.isValidNumeroDocumento(this.tramiteForm.numeroDocumento);


    const camposObligatorios = !!(
      this.tramiteForm.tipoDocumento &&
      numeroDocumentoValido &&
      this.tramiteForm.nombres?.trim() &&
      this.tramiteForm.apellidos?.trim() &&
      this.tramiteForm.email?.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.tramiteForm.email) &&
      this.tramiteForm.tipoTramite &&
      this.tramiteForm.asunto?.trim() &&
      this.tramiteForm.asunto.length <= 200 &&
      this.tramiteForm.captchaCode?.trim()
    );

    const telefonoValido = !this.tramiteForm.telefono ||
                           this.tramiteForm.telefono.trim() === '' ||
                           (this.tramiteForm.telefono.length === 9 && this.isValidCelular(this.tramiteForm.telefono));

    const descripcionValida = !this.tramiteForm.descripcion ||
                              this.tramiteForm.descripcion.trim() === '' ||
                              this.tramiteForm.descripcion.length <= 2000;

    return camposObligatorios && telefonoValido && descripcionValida;
  }

  showToastMessage(message: string, type: 'success' | 'error' | 'warning' = 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 4000);
  }
  onNumericInput(event: any, field: 'numeroDocumento' | 'telefono'): void {
    const inputValue = event.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, '');

    if (inputValue !== numericValue) {
      event.target.value = numericValue;
      this.tramiteForm[field] = numericValue;
    }
  }

  validarUsuarioExistente(): void {
    if (!this.tramiteForm.numeroDocumento && !this.tramiteForm.email) {
      return;
    }

    this.tramiteService.verificarUsuarioExiste(
      this.tramiteForm.email,
      this.tramiteForm.numeroDocumento
    ).subscribe({
      next: (response: any) => {
        if (response.exists) {
          const mensaje = response.existsByEmail && response.existsByDocument
            ? 'El correo y documento ya están registrados en el sistema'
            : response.existsByEmail
            ? 'El correo ya está registrado en el sistema'
            : 'El número de documento ya está registrado en el sistema';

          this.showToastMessage(
            '⚠️ ' + mensaje + '. Por favor, inicie sesión con su cuenta.',
            'warning'
          );
        }
      },
      error: (error: any) => {
        console.error('Error validando usuario:', error);
      }
    });
  }

  isValidNumero(numero: string): boolean {
    if (numero.length < 8) return false;

   
    const primerDigito = numero[0];
    const todosIguales = numero.split('').every(digit => digit === primerDigito);
    if (todosIguales) {
      return false;
    }
    let esSecuenciaAscendente = true;
    for (let i = 0; i < numero.length - 1; i++) {
      const actual = parseInt(numero[i]);
      const siguiente = parseInt(numero[i + 1]);
      if (siguiente !== actual + 1) {
        esSecuenciaAscendente = false;
        break;
      }
    }
    if (esSecuenciaAscendente) {
      return false;
    }

    let esSecuenciaDescendente = true;
    for (let i = 0; i < numero.length - 1; i++) {
      const actual = parseInt(numero[i]);
      const siguiente = parseInt(numero[i + 1]);
      if (siguiente !== actual - 1) {
        esSecuenciaDescendente = false;
        break;
      }
    }
    if (esSecuenciaDescendente) {
      return false;
    }

    return true;
  }


  isValidCelular(celular: string): boolean {
    if (celular.length !== 9) return false;
    return this.isValidNumero(celular);
  }

  
  isValidNumeroDocumento(numeroDoc: string): boolean {
    if (numeroDoc.length < 8 || numeroDoc.length > 15) return false;
    return this.isValidNumero(numeroDoc);
  }

  submitTramite(): void {
    if (!this.validateTramiteForm()) {
      return;
    }

    this.isSubmittingTramite = true;
    this.showError = false;
    this.errorMessage = '';

    const formData = new FormData();
    formData.append('tipoDocumento', this.tramiteForm.tipoDocumento);
    formData.append('numeroDocumento', this.tramiteForm.numeroDocumento);
    formData.append('nombres', this.tramiteForm.nombres);
    formData.append('apellidos', this.tramiteForm.apellidos);
    formData.append('email', this.tramiteForm.email);
    if (this.tramiteForm.telefono) {
      formData.append('telefono', this.tramiteForm.telefono);
    }
    formData.append('tipoTramite', this.tramiteForm.tipoTramite);
    formData.append('asunto', this.tramiteForm.asunto);
    formData.append('descripcion', this.tramiteForm.descripcion);
    formData.append('captchaToken', this.tramiteForm.captchaToken);
    formData.append('captchaCode', this.tramiteForm.captchaCode);

    this.tramiteForm.archivos.forEach((file) => {
      formData.append('archivos', file);
    });

    this.http.post<any>(`${this.apiUrl}/api/tramites/public/crear`, formData)
      .pipe(
        catchError(error => {
          this.isSubmittingTramite = false;
          this.showError = true;

          if (error.error && error.error.mensaje) {
            this.errorMessage = error.error.mensaje;
          } else if (error.error && error.error.error) {
            this.errorMessage = error.error.error;
          } else if (error.status === 400) {
            this.errorMessage = 'Datos inválidos. Verifica el formulario.';
          } else if (error.status === 403) {
            this.errorMessage = 'Contenido malicioso detectado. Por favor, revisa tu información.';
          } else {
            this.errorMessage = error.error?.mensaje || 'Error al crear el trámite. Intenta nuevamente.';
          }

          this.generateCaptcha();
          return of(null);
        })
      )
      .subscribe(response => {
        this.isSubmittingTramite = false;

        // El interceptor extrae el .data, así que recibimos directamente: {tramite: {...}, codigo: '...'}
        if (response && response.codigo) {
          const codigo = response.codigo;
          this.showToastMessage(`✅ Trámite creado exitosamente con código: ${codigo}`, 'success');
          this.showSuccess = true;
          this.showError = false;
          this.successMessage = `Trámite creado exitosamente con código: ${codigo}`;
          this.resetCreateForm();

          setTimeout(() => {
            this.backToLanding();
          }, 4000);
        }
      });
  }

  validateTramiteForm(): boolean {
    const tipoDoc = this.getTipoDocumentoConfig();
    const numeroDocRegex = new RegExp(tipoDoc.pattern);

    if (!this.tramiteForm.numeroDocumento || !numeroDocRegex.test(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage(`❌ Número de documento inválido. Debe contener entre 8 y 15 dígitos numéricos`, 'error');
      return false;
    }

    if (!/^[0-9]+$/.test(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage('❌ El número de documento solo debe contener números', 'error');
      return false;
    }
    if (!this.isValidNumeroDocumento(this.tramiteForm.numeroDocumento)) {
      this.showToastMessage('❌ El número de documento no es válido. No puede ser números repetidos (ej: 88888888) ni secuenciales (ej: 12345678 o 98765432)', 'error');
      return false;
    }

    if (!this.tramiteForm.nombres || !this.tramiteForm.nombres.trim()) {
      this.showToastMessage('❌ El campo Nombres es obligatorio', 'error');
      return false;
    }

    if (!this.tramiteForm.apellidos || !this.tramiteForm.apellidos.trim()) {
      this.showToastMessage('❌ El campo Apellidos es obligatorio', 'error');
      return false;
    }

    if (!this.tramiteForm.email || !this.tramiteForm.email.trim()) {
      this.showToastMessage('❌ El correo electrónico es obligatorio', 'error');
      return false;
    }

    if (!/@/.test(this.tramiteForm.email)) {
      this.showToastMessage('❌ El correo debe contener el símbolo @', 'error');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.tramiteForm.email)) {
      this.showToastMessage('❌ Ingrese un correo electrónico válido (ejemplo: correo@dominio.com)', 'error');
      return false;
    }
    if (this.tramiteForm.telefono && this.tramiteForm.telefono.trim() !== '') {
      if (!/^[0-9]+$/.test(this.tramiteForm.telefono)) {
        this.showToastMessage('❌ El celular solo debe contener números', 'error');
        return false;
      }
      if (!/^[0-9]{9}$/.test(this.tramiteForm.telefono)) {
        this.showToastMessage('❌ El celular debe contener exactamente 9 dígitos', 'error');
        return false;
      }

      if (!this.isValidCelular(this.tramiteForm.telefono)) {
        this.showToastMessage('❌ El número de celular no es válido. No puede ser números repetidos (ej: 999999999) ni secuenciales (ej: 123456789 o 987654321)', 'error');
        return false;
      }
    }

    if (!this.tramiteForm.tipoTramite) {
      this.showToastMessage('❌ Debe seleccionar un Tipo de Trámite', 'error');
      return false;
    }

    if (!this.tramiteForm.asunto || !this.tramiteForm.asunto.trim()) {
      this.showToastMessage('❌ El campo Asunto es obligatorio', 'error');
      return false;
    }

    if (this.tramiteForm.asunto.length > 200) {
      this.showToastMessage('⚠️ El Asunto no puede exceder los 200 caracteres', 'warning');
      return false;
    }

    if (this.tramiteForm.descripcion && this.tramiteForm.descripcion.length > 2000) {
      this.showToastMessage('⚠️ La Descripción no puede exceder los 2000 caracteres', 'warning');
      return false;
    }

    if (!this.tramiteForm.captchaCode || !this.tramiteForm.captchaCode.trim()) {
      this.showToastMessage('❌ Debe ingresar el código CAPTCHA', 'error');
      return false;
    }

    return true;
  }
}