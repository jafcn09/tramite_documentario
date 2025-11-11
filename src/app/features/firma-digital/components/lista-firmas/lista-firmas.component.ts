import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

import { FirmaDigitalService } from '../../../../services/firma-digital.service';
import { ModalService } from '../../../../services/modal.service';
import { AuthService } from '../../../../services/auth.service';
import {
  FirmaDigitalResponse,
  FiltrosFirma,
  PaginacionFirmas,
  EstadoFirma,
  EstadoAutorizacion,
  TipoFirma
} from '../../../../shared/interfaces/firma-digital.interface';

@Component({
  selector: 'app-lista-firmas',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lista-firmas.component.html',
  styleUrl: './lista-firmas.component.css'
})
export class ListaFirmasComponent implements OnInit, OnDestroy {
  firmas: FirmaDigitalResponse[] = [];
  loading = false;

  currentPage = 0;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;

  filtros: FiltrosFirma = {};
  filtroTexto = '';
  estadoFirmaSeleccionado = '';
  estadoAutorizacionSeleccionado = '';
  tipoFirmaSeleccionado = '';

  estadosFirma = Object.values(EstadoFirma);
  estadosAutorizacion = Object.values(EstadoAutorizacion);
  tiposFirma = Object.values(TipoFirma);

  sortField = 'fechaCreacion';
  sortDirection: 'asc' | 'desc' = 'desc';

  mostrarFiltros = false;
  firmaSeleccionada: FirmaDigitalResponse | null = null;
  mostrarDetalle = false;
  mostrarAutorizacion = false;
  mostrarFirmar = false;

  puedeAutorizar = false;
  puedeCrear = false;
  puedeEditar = false;
  puedeEliminar = false;

  private subscriptions = new Subscription();

  constructor(
    private firmaDigitalService: FirmaDigitalService,
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.verificarPermisos();
    this.cargarFirmas();
    this.suscribirAActualizaciones();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  private verificarPermisos() {
    const user = this.authService.currentUserValue;
    if (user) {
      this.puedeAutorizar = this.authService.hasAnyRole(['ADMIN', 'ADMINISTRATIVO']);
      this.puedeCrear = this.authService.hasAnyRole(['ADMIN', 'ADMINISTRATIVO', 'USUARIO']);
      this.puedeEditar = this.authService.hasAnyRole(['ADMIN', 'ADMINISTRATIVO']);
      this.puedeEliminar = this.authService.hasAnyRole(['ADMIN']);
    }
  }

  private suscribirAActualizaciones() {
    this.subscriptions.add(
      this.firmaDigitalService.loading$.subscribe(loading => {
        this.loading = loading;
      })
    );
  }

  cargarFirmas() {
    const paginacion: PaginacionFirmas = {
      page: this.currentPage,
      size: this.pageSize,
      sort: this.sortField,
      direction: this.sortDirection
    };

    this.aplicarFiltros();

    this.subscriptions.add(
      this.firmaDigitalService.cargarFirmas(this.filtros, paginacion).subscribe({
        next: (response) => {
          this.firmas = response.content;
          this.totalPages = response.totalPages;
          this.totalElements = response.totalElements;
        },
        error: (error) => {
        }
      })
    );
  }

  private aplicarFiltros() {
    this.filtros = {};

    if (this.estadoFirmaSeleccionado) {
      this.filtros.estadoFirma = [this.estadoFirmaSeleccionado as EstadoFirma];
    }

    if (this.estadoAutorizacionSeleccionado) {
      this.filtros.estadoAutorizacion = [this.estadoAutorizacionSeleccionado as EstadoAutorizacion];
    }

    if (this.tipoFirmaSeleccionado) {
      this.filtros.tipoFirma = [this.tipoFirmaSeleccionado as TipoFirma];
    }
  }

  onFiltroChange() {
    this.currentPage = 0;
    this.cargarFirmas();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.cargarFirmas();
  }

  onSort(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.cargarFirmas();
  }

  limpiarFiltros() {
    this.filtros = {};
    this.estadoFirmaSeleccionado = '';
    this.estadoAutorizacionSeleccionado = '';
    this.tipoFirmaSeleccionado = '';
    this.filtroTexto = '';
    this.currentPage = 0;
    this.cargarFirmas();
  }

  toggleFiltros() {
    this.mostrarFiltros = !this.mostrarFiltros;
  }

  verDetalle(firma: FirmaDigitalResponse) {
    this.firmaSeleccionada = firma;
    this.mostrarDetalle = true;
  }

  abrirAutorizacion(firma: FirmaDigitalResponse) {
    if (!this.puedeAutorizar) {
      return;
    }
    this.firmaSeleccionada = firma;
    this.mostrarAutorizacion = true;
  }

  abrirFirmar(firma: FirmaDigitalResponse) {
    this.firmaSeleccionada = firma;
    this.mostrarFirmar = true;
  }

  eliminarFirma(firma: FirmaDigitalResponse) {
    if (!this.puedeEliminar) {
      return;
    }

    this.modalService.confirm(
      '¿Está seguro de eliminar esta firma?',
      'Esta acción no se puede deshacer',
      () => {
        this.subscriptions.add(
          this.firmaDigitalService.eliminarFirma(firma.id).subscribe({
            next: () => {
              this.cargarFirmas();
            },
            error: (error) => {
            }
          })
        );
      }
    );
  }

  descargarDocumento(firma: FirmaDigitalResponse) {
    if (firma.estadoFirma === EstadoFirma.FIRMADO || firma.estadoFirma === EstadoFirma.VERIFICADO) {
      this.subscriptions.add(
        this.firmaDigitalService.descargarDocumentoFirmado(firma.id).subscribe({
          next: (blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `documento-firmado-${firma.id}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
          },
          error: (error) => {
          }
        })
      );
    }
  }

  verificarFirma(firma: FirmaDigitalResponse) {
    this.subscriptions.add(
      this.firmaDigitalService.verificarFirma(firma.id).subscribe({
        next: () => {
          this.cargarFirmas();
        },
        error: (error) => {
        }
      })
    );
  }

  cerrarModal() {
    this.mostrarDetalle = false;
    this.mostrarAutorizacion = false;
    this.mostrarFirmar = false;
    this.firmaSeleccionada = null;
  }

  onAutorizacionCompleta() {
    this.cerrarModal();
    this.cargarFirmas();
  }

  onFirmaCompleta() {
    this.cerrarModal();
    this.cargarFirmas();
  }

  getDescripcionTipoFirma(tipo: TipoFirma): string {
    return this.firmaDigitalService.getDescripcionTipoFirma(tipo);
  }

  getDescripcionEstadoFirma(estado: EstadoFirma): string {
    return this.firmaDigitalService.getDescripcionEstadoFirma(estado);
  }

  getDescripcionEstadoAutorizacion(estado: EstadoAutorizacion): string {
    return this.firmaDigitalService.getDescripcionEstadoAutorizacion(estado);
  }

  getColorEstadoFirma(estado: EstadoFirma): string {
    return this.firmaDigitalService.getColorEstadoFirma(estado);
  }

  getColorEstadoAutorizacion(estado: EstadoAutorizacion): string {
    return this.firmaDigitalService.getColorEstadoAutorizacion(estado);
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) {
      return '⇅';
    }
    return this.sortDirection === 'asc' ? '↑' : '↓';
  }

  puedeSerFirmada(firma: FirmaDigitalResponse): boolean {
    return firma.puedeSerFirmada;
  }

  requiereAutorizacion(firma: FirmaDigitalResponse): boolean {
    return firma.requiereAutorizacion && firma.autorizacionPendiente;
  }

  esFirmaDelUsuario(firma: FirmaDigitalResponse): boolean {
    const user = this.authService.currentUserValue;
    return user ? firma.firmante.id === user.id : false;
  }

  puedeDescargar(firma: FirmaDigitalResponse): boolean {
    return firma.estadoFirma === EstadoFirma.FIRMADO ||
           firma.estadoFirma === EstadoFirma.VERIFICADO;
  }

  trackByFirmaId(index: number, firma: FirmaDigitalResponse): number {
    return firma.id;
  }

  getPageNumbers(): number[] {
    const pages: number[] = [];
    const startPage = Math.max(0, this.currentPage - 2);
    const endPage = Math.min(this.totalPages - 1, this.currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  Math = Math;
}