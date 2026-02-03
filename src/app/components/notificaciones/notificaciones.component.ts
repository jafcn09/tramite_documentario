import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { 
  Notificacion, 
  NotificacionFiltro, 
  NotificacionEstadisticas,
  NotificacionGrupo,
  NotificacionRequest,
  NotificacionValidationErrors,
  PaginatedResponse,
  TipoDestinatario,
  RoleInfo
} from '../../shared/interfaces/notificacion.interface';
import { NotificacionService } from '../../services/notificacion.service';
import { WebSocketService } from '../../services/websocket.service';
import { AuthService } from '../../services/auth.service';
import { TramiteService } from '../../services/tramite.service';
import { BandejaTramitesService } from '../../services/bandeja-tramites.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-notificaciones',
    imports: [CommonModule, FormsModule],
    templateUrl: './notificaciones.component.html',
    styleUrls: ['./notificaciones.component.css'],
    animations: [
        trigger('slideDown', [
            transition(':enter', [
                style({ height: '0', opacity: 0 }),
                animate('300ms ease-out', style({ height: '*', opacity: 1 }))
            ]),
            transition(':leave', [
                animate('300ms ease-in', style({ height: '0', opacity: 0 }))
            ])
        ]),
        trigger('slideIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateX(-20px)' }),
                animate('200ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
            ])
        ])
    ]
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  notificaciones: Notificacion[] = [];
  notificacionesFiltradas: Notificacion[] = [];
  notificacionesAgrupadas: NotificacionGrupo[] = [];
  estadisticas: NotificacionEstadisticas = {
    totalNotificaciones: 0,
    noLeidas: 0,
    leidas: 0,
    ultimoMes: 0
  };

  contadorNoLeidas = 0;

  get estadisticasLocales(): NotificacionEstadisticas {
    const now = new Date();
    const mesAnterior = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());

    return {
      totalNotificaciones: this.notificaciones.length,
      noLeidas: this.notificaciones.filter(n => !n.esLeida).length,
      leidas: this.notificaciones.filter(n => n.esLeida).length,
      ultimoMes: this.notificaciones.filter(n => new Date(n.fechaCreacion) >= mesAnterior).length
    };
  }
  
  currentPage = 0;
  pageSize = 20;
  totalElements = 0;
  totalPages = 0;
  isLastPage = true;
  
  filtros: NotificacionFiltro = {};
  mostrarFiltros = false;
  
  cargando = false;
  estaConectadoWs = false;
  
  private subscriptions: Subscription[] = [];
  
  mostrarModalCrear = false;
  enviandoNotificacion = false;
  
  mostrarModalEditar = false;
  editandoNotificacion = false;
  notificacionEditando: Notificacion | null = null;
  
  mostrarModalEliminar = false;
  eliminandoNotificacion = false;
  notificacionEliminar: Notificacion | null = null;
  
  mostrarModalLimpiar = false;
  limpiandoAntiguas = false;
  cargandoPreview = false;
  previewNotificaciones: any = null;
  diasAntiguedad = 7; // Por defecto 7 días en lugar de 30
  usuarios: any[] = [];
  roles: RoleInfo[] = [];
  tipoDestinatario: TipoDestinatario = TipoDestinatario.USUARIO_ESPECIFICO;
  nuevaNotificacion: NotificacionRequest = {
    usuarioDestinatarioId: 0,
    titulo: '',
    mensaje: '',
    tipo: '',
    prioridad: 'NORMAL'
  };
  
  validationErrors: NotificacionValidationErrors = {};
  
  constructor(
    private notificacionService: NotificacionService,
    private webSocketService: WebSocketService,
    private authService: AuthService,
    private router: Router,
    private tramiteService: TramiteService,
    private bandejaTramitesService: BandejaTramitesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.inicializarComponente();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private inicializarComponente(): void {
    this.cargarNotificaciones();

    if (this.esAdmin()) {
      this.cargarUsuarios();
      this.cargarRoles();
    }

    this.subscriptions.push(
      this.notificacionService.nuevaNotificacion$.subscribe(notificacion => {
        this.agregarNuevaNotificacion(notificacion);
      })
    );

    this.subscriptions.push(
      this.notificacionService.contadorNoLeidas$.subscribe(count => {
        this.contadorNoLeidas = count;
      })
    );

    this.subscriptions.push(
      this.webSocketService.connected$.subscribe(conectado => {
        this.estaConectadoWs = conectado;
      })
    );
  }

  cargarNotificaciones(): void {
    this.cargando = true;


    const observable = this.esAdmin()
      ? this.notificacionService.obtenerTodasNotificaciones(
          this.currentPage,
          this.pageSize,
          'fechaCreacion',
          'desc'
        )
      : this.notificacionService.obtenerMisNotificaciones(
          this.currentPage,
          this.pageSize,
          'fechaCreacion',
          'desc'
        );


    this.subscriptions.push(
      observable.subscribe({
        next: (response: PaginatedResponse<Notificacion>) => {

          if (this.currentPage === 0) {
            this.notificaciones = response.content;
          } else {
            this.notificaciones = [...this.notificaciones, ...response.content];
          }

          this.totalElements = response.totalElements;
          this.totalPages = response.totalPages;
          this.isLastPage = response.last;

          this.aplicarFiltros();
          this.agruparNotificaciones();

          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
        }
      })
    );
  }

  cargarMas(): void {
    if (!this.isLastPage && !this.cargando) {
      this.currentPage++;
      this.cargarNotificaciones();
    }
  }

  aplicarFiltros(): void {
    let filtradas = [...this.notificaciones];

    if (this.filtros.tipo) {
      filtradas = filtradas.filter(n => n.tipo === this.filtros.tipo);
    }

    if (this.filtros.prioridad) {
      filtradas = filtradas.filter(n => n.prioridad === this.filtros.prioridad);
    }

    if (this.filtros.esLeida !== undefined) {
      filtradas = filtradas.filter(n => n.esLeida === this.filtros.esLeida);
    }

    if (this.filtros.busqueda) {
      const busqueda = this.filtros.busqueda.toLowerCase();
      filtradas = filtradas.filter(n => 
        n.titulo.toLowerCase().includes(busqueda) ||
        n.mensaje.toLowerCase().includes(busqueda)
      );
    }

    this.notificacionesFiltradas = filtradas;
  }

  agruparNotificaciones(): void {
    const grupos: { [fecha: string]: Notificacion[] } = {};
    
    this.notificacionesFiltradas.forEach(notificacion => {
      const fecha = this.formatearFechaGrupo(notificacion.fechaCreacion);
      if (!grupos[fecha]) {
        grupos[fecha] = [];
      }
      grupos[fecha].push(notificacion);
    });

    this.notificacionesAgrupadas = Object.keys(grupos)
      .map(fecha => ({
        fecha,
        notificaciones: grupos[fecha].sort((a, b) => 
          new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
        )
      }))
      .sort((a, b) => this.compararFechasGrupo(b.fecha, a.fecha));
  }

  marcarLeida(notificacion: Notificacion, event?: Event): void {
    if (event) {
      event.stopPropagation();
    }

    if (notificacion.esLeida) return;

    this.notificacionService.marcarLeidaLocal(notificacion.id);
  }

  marcarTodasLeidas(): void {
    const noLeidas = this.notificaciones.filter(n => !n.esLeida);
    if (noLeidas.length === 0) return;

    this.notificacionService.marcarTodasLeidasLocal();
  }

  crearNotificacion(): void {
    if (!this.esAdmin()) return;
    
    if (!this.validarFormulario()) {
      return;
    }
    
    this.enviandoNotificacion = true;
    
    const request: NotificacionRequest = {
      titulo: this.nuevaNotificacion.titulo.trim(),
      mensaje: this.nuevaNotificacion.mensaje.trim(),
      tipo: this.nuevaNotificacion.tipo,
      prioridad: this.nuevaNotificacion.prioridad,
      rutaDestino: this.nuevaNotificacion.rutaDestino?.trim() || undefined
    };
    
    switch (this.tipoDestinatario) {
      case TipoDestinatario.USUARIO_ESPECIFICO:
        request.usuarioDestinatarioId = this.nuevaNotificacion.usuarioDestinatarioId;
        break;
      case TipoDestinatario.ROL_COMPLETO:
        request.roleDestinatario = this.nuevaNotificacion.roleDestinatario;
        break;
      case TipoDestinatario.TODOS_USUARIOS:
        request.enviarATodos = true;
        break;
    }
    
    this.subscriptions.push(
      this.notificacionService.crearNotificacion(request).subscribe({
        next: () => {

          this.mostrarModalCrear = false;
          this.resetearFormulario();
          this.cargarNotificaciones(); // Recargar lista
          this.enviandoNotificacion = false;
        },
        error: (error) => {
          this.enviandoNotificacion = false;
        }
      })
    );
  }

  abrirNotificacion(notificacion: Notificacion): void {
    this.marcarLeida(notificacion);

    // ✅ CAMBIO: Siempre mostrar modal con detalles completos de la notificación
    // En lugar de navegar a una ruta que podría ser rechazada por el guard de rol
    this.mostrarDetalleNotificacion(notificacion);

    // Si es notificación de trámite y el usuario quiere ver el trámite completo,
    // puede usar el botón "Ver Trámite" dentro del modal
  }

  esTramiteNotificacion(tipo: string): boolean {
    if (!tipo) return false;
    return tipo.includes('TRAMITE') || tipo === 'DERIVACION';
  }

  esNotificacionAntigua(notificacion: Notificacion): boolean {
    const ahora = new Date();
    const fechaCreacion = new Date(notificacion.fechaCreacion);
    const diferenciaHoras = (ahora.getTime() - fechaCreacion.getTime()) / (1000 * 60 * 60);
    return diferenciaHoras > 24;
  }

  puedeInteractuarConNotificacion(notificacion: Notificacion): boolean {
    return !notificacion.esLeida || !this.esNotificacionAntigua(notificacion);
  }

  esAdministrativo(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;
    return userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN';
  }

  asignarseTramite(notificacion: Notificacion, event: Event): void {
    event.stopPropagation();
    if (!notificacion.referenciaId) return;

    if (!this.puedeAsignarseAsiMismo()) {
      return;
    }

    if (confirm('¿Deseas asignarte este trámite?')) {
      this.tramiteService.asignarseTramite(notificacion.referenciaId).subscribe({
        next: () => {
          this.marcarLeida(notificacion, event);
          this.cargarNotificaciones();
        },
        error: (error) => {}
      });
    }
  }

  responderTramiteRapido(notificacion: Notificacion, event: Event): void {
    event.stopPropagation();
    if (!notificacion.referenciaId) return;

    const userRole = this.authService.currentUserValue?.role?.name;
    if (userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN') {
      this.router.navigate(['/administrativo/mis-tramites'], {
        queryParams: { tramiteId: notificacion.referenciaId, action: 'responder' }
      });
    }
  }

  derivarTramiteRapido(notificacion: Notificacion, event: Event): void {
    event.stopPropagation();
    if (!notificacion.referenciaId) return;

    if (!this.puedeDerivarTramite()) {
      return;
    }

    this.bandejaTramitesService.verificarPermisosAcciones(notificacion.referenciaId).subscribe({
      next: (permisos) => {
        if (!permisos.puedeDerivar) {
          this.toastService.error(
            'Acción no permitida',
            'No puedes derivar este trámite. Solo se puede derivar si no estás asignado al mismo.'
          );
          return;
        }

        const userRole = this.authService.currentUserValue?.role?.name;
        if (userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN') {
          this.router.navigate(['/administrativo/mis-tramites'], {
            queryParams: { tramiteId: notificacion.referenciaId, action: 'derivar' }
          });
        }
      },
      error: () => {
        this.toastService.error(
          'Error',
          'No se pudieron verificar los permisos del trámite'
        );
      }
    });
  }

  mostrarDetalleNotificacion(notificacion: Notificacion): void {


    let botonesAdicionales = '';
    let infoAdicional = '';


    if (notificacion.tipo === 'TRAMITE_DERIVADO' && notificacion.metadatos) {
      try {
        const metadatos = typeof notificacion.metadatos === 'string'
          ? JSON.parse(notificacion.metadatos)
          : notificacion.metadatos;

        if (metadatos.nuevoTrabajadorNombre) {
          infoAdicional = `
            <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 12px 15px; margin: 15px 0; border-radius: 4px;">
              <strong style="color: #2e7d32;">👤 Derivado a:</strong><br>
              <span style="color: #1976d2; font-size: 14px;">${metadatos.nuevoTrabajadorNombre}</span>
            </div>
          `;
        }
      } catch (e) {
        console.error('Error parsing metadatos:', e);
      }
    }

    // Si es notificación de trámite, mostrar botón para ver el trámite
    if (this.esTramiteNotificacion(notificacion.tipo) && notificacion.referenciaId) {
      const userRole = this.authService.currentUserValue?.role?.name;
      const ruta = (userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN')
        ? '/administrativo/mis-tramites'
        : '/usuario/mis-tramites';

      botonesAdicionales = `
        <a href="${ruta}?tramiteId=${notificacion.referenciaId}&openDetail=true"
           style="background: #28a745; color: white; text-decoration: none; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; display: inline-block; margin-right: 8px;">
          Ver Trámite
        </a>
      `;
    }

    const modalContent = `
      <div style="background: white; padding: 25px; border-radius: 8px; max-width: 600px; margin: 50px auto; box-shadow: 0 4px 15px rgba(0,0,0,0.3);">
        <div style="margin-bottom: 20px;">
          <span style="background: #e7f3ff; color: #0056b3; padding: 5px 10px; border-radius: 4px; font-size: 12px; font-weight: bold;">
            ${this.getTipoDisplay(notificacion.tipo)}
          </span>
          <span style="background: #fff3cd; color: #856404; padding: 5px 10px; border-radius: 4px; font-size: 12px; margin-left: 8px;">
            ${notificacion.prioridad}
          </span>
        </div>
        <h3 style="margin: 15px 0; color: #333;">${notificacion.titulo}</h3>
        <p style="color: #666; line-height: 1.6; white-space: pre-wrap; word-break: break-word;">${notificacion.mensaje}</p>
        ${infoAdicional}
        <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; font-size: 12px; color: #999;">
          <strong>Fecha:</strong> ${this.formatearTiempo(notificacion.fechaCreacion)}<br>
          <strong>Estado:</strong> ${notificacion.esLeida ? 'Leída' : 'No leída'}
        </div>
        <div style="text-align: right; margin-top: 20px;">
          ${botonesAdicionales}
          <button onclick="this.parentElement.parentElement.parentElement.remove()"
                  style="background: #6c757d; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">
            Cerrar
          </button>
        </div>
      </div>
    `;

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000; display: flex; align-items: center; justify-content: center;';
    overlay.innerHTML = modalContent;
    overlay.onclick = (e) => {
      if (e.target === overlay) overlay.remove();
    };

    document.body.appendChild(overlay);
  }

  reenviarPorEmail(notificacion: Notificacion, event: Event): void {
    event.stopPropagation();
    
    this.subscriptions.push(
      this.notificacionService.reenviarPorEmail(notificacion.id).subscribe({
        next: () => {

        },
        error: (error) => {
        }
      })
    );
  }

  toggleFiltros(): void {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  setFiltroEstado(esLeida: boolean | undefined): void {
    this.filtros.esLeida = esLeida;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }

  setFiltroTipo(tipo: string | undefined): void {
    this.filtros.tipo = tipo;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }

  setFiltroPrioridad(prioridad: string | undefined): void {
    this.filtros.prioridad = prioridad;
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }

  limpiarFiltros(): void {
    this.filtros = {};
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }

  limpiarNotificacionesAntiguas(): void {
    if (!this.esAdmin()) return;
    
    this.diasAntiguedad = 7;
    this.mostrarModalLimpiar = true;
    
    this.previewNotificaciones = null;
  }

  confirmarLimpiarAntiguas(): void {
    if (!this.esAdmin()) return;

    this.limpiandoAntiguas = true;
    
    this.subscriptions.push(
      this.notificacionService.limpiarNotificacionesAntiguas(this.diasAntiguedad).subscribe({
        next: (eliminadas) => {

          if (eliminadas > 0) {
            alert(`✅ Se eliminaron ${eliminadas} notificaciones antiguas exitosamente.`);
          } else {
            alert(`ℹ️ No se encontraron notificaciones antiguas para eliminar.`);
          }
          
          this.cerrarModalLimpiar();
          this.cargarNotificaciones(); // Recargar lista (las estadísticas se calculan automáticamente)
          this.limpiandoAntiguas = false;
        },
        error: (error) => {
          alert('❌ Error al limpiar notificaciones antiguas. Inténtalo nuevamente.');
          this.limpiandoAntiguas = false;
        }
      })
    );
  }

  editarNotificacion(notificacion: Notificacion, event: Event): void {
    if (!this.esAdmin()) return;
    event.stopPropagation();
    
    this.notificacionEditando = { ...notificacion };
    this.mostrarModalEditar = true;
  }

  eliminarNotificacion(notificacion: Notificacion, event: Event): void {
    if (!this.esAdmin()) return;
    event.stopPropagation();
    
    this.notificacionEliminar = notificacion;
    this.mostrarModalEliminar = true;
  }

  confirmarEditarNotificacion(): void {
    if (!this.notificacionEditando || !this.esAdmin()) return;
    
    if (!this.notificacionEditando.titulo.trim() || !this.notificacionEditando.mensaje.trim()) {
      return;
    }
    
    this.editandoNotificacion = true;
    
    const request: NotificacionRequest = {
      titulo: this.notificacionEditando.titulo.trim(),
      mensaje: this.notificacionEditando.mensaje.trim(),
      tipo: this.notificacionEditando.tipo,
      prioridad: this.notificacionEditando.prioridad,
      rutaDestino: this.notificacionEditando.rutaDestino || undefined
    };
    
    this.subscriptions.push(
      this.notificacionService.actualizarNotificacion(this.notificacionEditando.id, request).subscribe({
        next: () => {

          this.cerrarModalEditar();
          this.cargarNotificaciones(); // Recargar lista
          this.editandoNotificacion = false;
        },
        error: (error) => {
          this.editandoNotificacion = false;
        }
      })
    );
  }

  confirmarEliminarNotificacion(): void {
    if (!this.notificacionEliminar || !this.esAdmin()) return;
    
    this.eliminandoNotificacion = true;
    
    this.subscriptions.push(
      this.notificacionService.eliminarNotificacion(this.notificacionEliminar.id).subscribe({
        next: () => {

          this.notificaciones = this.notificaciones.filter(n => n.id !== this.notificacionEliminar!.id);
          this.aplicarFiltros();
          this.agruparNotificaciones();
          this.cerrarModalEliminar();
          this.eliminandoNotificacion = false;
        },
        error: (error) => {
          this.eliminandoNotificacion = false;
        }
      })
    );
  }

  cerrarModalEditar(): void {
    this.mostrarModalEditar = false;
    this.editandoNotificacion = false;
    this.notificacionEditando = null;
  }

  cerrarModalEliminar(): void {
    this.mostrarModalEliminar = false;
    this.eliminandoNotificacion = false;
    this.notificacionEliminar = null;
  }

  cerrarModalLimpiar(): void {
    this.mostrarModalLimpiar = false;
    this.limpiandoAntiguas = false;
    this.cargandoPreview = false;
    this.previewNotificaciones = null;
  }

  private agregarNuevaNotificacion(notificacion: Notificacion): void {
    const existe = this.notificaciones.some(n => n.id === notificacion.id);
    if (existe) {

      return;
    }

    this.notificaciones = [notificacion, ...this.notificaciones];
    this.aplicarFiltros();
    this.agruparNotificaciones();
  }

  esAdmin(): boolean {
    return this.authService.hasRole('ADMIN');
  }

  getIcono(tipo: string): string {
    return this.notificacionService.getIcono(tipo);
  }

  getClaseTipo(tipo: string): string {
    return 'notificacion-icon ' + this.notificacionService.getClaseTipo(tipo);
  }

  getClasePrioridad(prioridad: string): string {
    return this.notificacionService.getClasePrioridad(prioridad);
  }

  formatearTiempo(fecha: Date | string): string {
    // ✅ MEJORADO: Mostrar fecha y hora completa en lugar de "Hace X tiempo"
    // Esto proporciona información más específica y clara al usuario
    const fechaNot = new Date(fecha);

    const opciones: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };

    return fechaNot.toLocaleString('es-PE', opciones);
  }

  formatearFechaGrupo(fecha: Date | string): string {
    const fechaNot = new Date(fecha);
    const ahora = new Date();
    const hoy = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate());
    const ayer = new Date(hoy.getTime() - 24 * 60 * 60 * 1000);
    
    if (fechaNot >= hoy) return 'Hoy';
    if (fechaNot >= ayer) return 'Ayer';
    
    const opciones: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return fechaNot.toLocaleDateString('es-PE', opciones);
  }

  private compararFechasGrupo(fechaA: string, fechaB: string): number {
    const prioridades: { [key: string]: number } = {
      'Hoy': 3,
      'Ayer': 2
    };
    
    const prioridadA = prioridades[fechaA] || 1;
    const prioridadB = prioridades[fechaB] || 1;
    
    if (prioridadA !== prioridadB) {
      return prioridadA - prioridadB;
    }
    
    return fechaA.localeCompare(fechaB);
  }

  trackGroup(_index: number, grupo: NotificacionGrupo): string {
    return grupo.fecha;
  }

  trackNotification(_index: number, notificacion: Notificacion): number {
    return notificacion.id;
  }

  getTipoDisplay(tipo: string): string {
    const tipos: { [key: string]: string } = {
      'TRAMITE_CREADO': 'Trámite Creado',
      'TRAMITE_APROBADO': 'Trámite Aprobado', 
      'TRAMITE_RECHAZADO': 'Trámite Rechazado',
      'TRAMITE_OBSERVADO': 'Trámite Observado',
      'DERIVACION': 'Derivación',
      'SISTEMA': 'Sistema'
    };
    return tipos[tipo] || tipo;
  }

  tienesFiltrosActivos(): boolean {
    return !!(this.filtros.tipo || 
              this.filtros.prioridad || 
              this.filtros.busqueda || 
              this.filtros.esLeida !== undefined);
  }

  
  cargarUsuarios(): void {
    if (!this.esAdmin()) return;
    
    this.subscriptions.push(
      this.notificacionService.obtenerUsuarios().subscribe({
        next: (usuarios) => {

          this.usuarios = usuarios.filter(usuario => usuario.role?.name !== 'ADMIN');

        },
        error: (error) => {
          this.usuarios = [
            { id: 2, nombre: 'Usuario Demo', usuario: 'demo', role: { name: 'USUARIO' } }
          ];
        }
      })
    );
  }

  cargarRoles(): void {
    if (!this.esAdmin()) return;
    
    this.subscriptions.push(
      this.notificacionService.obtenerRoles().subscribe({
        next: (roles) => {
          this.roles = roles.filter(rol => rol.name !== 'ADMIN');

        },
        error: (error) => {
          this.roles = [
            { id: 2, name: 'USUARIO', description: 'Usuario', userCount: 0 },
            { id: 3, name: 'ALUMNO', description: 'Alumno', userCount: 0 },
            { id: 4, name: 'EXTERNO', description: 'Usuario Externo', userCount: 0 },
            { id: 5, name: 'ADMINISTRATIVO', description: 'Administrativo', userCount: 0 }
          ];
        }
      })
    );
  }

  resetearFormulario(): void {
    this.tipoDestinatario = TipoDestinatario.USUARIO_ESPECIFICO;
    this.nuevaNotificacion = {
      usuarioDestinatarioId: 0,
      titulo: '',
      mensaje: '',
      tipo: '',
      prioridad: 'NORMAL'
    };
    this.validationErrors = {};
  }

  cancelarCreacion(): void {
    this.mostrarModalCrear = false;
    this.resetearFormulario();
    this.enviandoNotificacion = false;
  }

  validarFormulario(): boolean {
    this.validationErrors = {};
    let esValido = true;

  
    if (this.tipoDestinatario === TipoDestinatario.USUARIO_ESPECIFICO) {
      if (!this.nuevaNotificacion.usuarioDestinatarioId || this.nuevaNotificacion.usuarioDestinatarioId === 0) {
        this.validationErrors.usuarioDestinatarioId = 'Debe seleccionar un usuario destinatario';
        esValido = false;
      }
    } else if (this.tipoDestinatario === TipoDestinatario.ROL_COMPLETO) {
      if (!this.nuevaNotificacion.roleDestinatario || this.nuevaNotificacion.roleDestinatario.trim().length === 0) {
        this.validationErrors.roleDestinatario = 'Debe seleccionar un rol destinatario';
        esValido = false;
      }
    }
   
    if (!this.nuevaNotificacion.titulo || this.nuevaNotificacion.titulo.trim().length === 0) {
      this.validationErrors.titulo = 'El título es requerido';
      esValido = false;
    } else if (this.nuevaNotificacion.titulo.trim().length > 200) {
      this.validationErrors.titulo = 'El título no puede exceder 200 caracteres';
      esValido = false;
    }

    if (!this.nuevaNotificacion.mensaje || this.nuevaNotificacion.mensaje.trim().length === 0) {
      this.validationErrors.mensaje = 'El mensaje es requerido';
      esValido = false;
    } else if (this.nuevaNotificacion.mensaje.trim().length > 500) {
      this.validationErrors.mensaje = 'El mensaje no puede exceder 500 caracteres';
      esValido = false;
    }

    if (!this.nuevaNotificacion.tipo || this.nuevaNotificacion.tipo.trim().length === 0) {
      this.validationErrors.tipo = 'Debe seleccionar un tipo de notificación';
      esValido = false;
    }

    if (!this.nuevaNotificacion.prioridad || this.nuevaNotificacion.prioridad.trim().length === 0) {
      this.validationErrors.prioridad = 'Debe seleccionar una prioridad';
      esValido = false;
    }

    return esValido;
  }

  tieneError(campo: keyof NotificacionValidationErrors): boolean {
    return !!this.validationErrors[campo];
  }

  getError(campo: keyof NotificacionValidationErrors): string {
    return this.validationErrors[campo] || '';
  }

  onTipoDestinatarioChange(): void {
    this.nuevaNotificacion.usuarioDestinatarioId = 0;
    this.nuevaNotificacion.roleDestinatario = undefined;
    this.nuevaNotificacion.enviarATodos = undefined;
    
    this.validationErrors.destinatario = undefined;
    this.validationErrors.usuarioDestinatarioId = undefined;
    this.validationErrors.roleDestinatario = undefined;
  }

  getUsuariosPorRol(roleName: string): number {
  
    const rol = this.roles.find(r => r.name === roleName);
    if (rol && rol.userCount > 0) {
      return rol.userCount;
    }

    return this.usuarios.filter(u => u.role?.name === roleName).length;
  }

  abrirModalCrear(): void {
    if (!this.esAdmin()) return;


    this.cargarUsuarios();
    this.cargarRoles();

    this.mostrarModalCrear = true;
  }


  
  puedeAsignarseAsiMismo(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;
    return userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN';
  }

  
  puedeDerivarTramite(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;

    if (userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden derivar trámites'
      );
      return false;
    }

    if (userRole !== 'ADMINISTRATIVO' && userRole !== 'ADMIN') {
      this.toastService.warning(
        'Acción no permitida',
        'Solo el personal administrativo puede derivar trámites'
      );
      return false;
    }

    return true;
  }

  puedeAprobarTramite(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;

    if (userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden aprobar trámites'
      );
      return false;
    }

    return userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN';
  }


  puedeRechazarTramite(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;

    if (userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden rechazar trámites'
      );
      return false;
    }

    return userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN';
  }

  puedeDescargarDocumentos(): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;

   
    if (userRole === 'ESTUDIANTE') {
      this.toastService.warning(
        'Acción no permitida',
        'Los estudiantes no pueden descargar documentos de trámites'
      );
      return false;
    }

    return true;
  }

 
  puedeVerAccionesRapidas(accion: 'derivar' | 'responder' | 'aprobar' | 'rechazar' | 'descargar'): boolean {
    const userRole = this.authService.currentUserValue?.role?.name;

    if (userRole === 'ESTUDIANTE') {
      return false;
    }


    if (userRole === 'USUARIO') {
      return accion === 'responder'; 
    }
    return userRole === 'ADMINISTRATIVO' || userRole === 'ADMIN';
  }

}