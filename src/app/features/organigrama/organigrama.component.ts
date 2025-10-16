import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganigramaService } from '../../services/organigrama.service';
import { AreaJerarquica } from '../../models/organigrama.interface';

@Component({
  selector: 'app-organigrama',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './organigrama.component.html',
  styleUrl: './organigrama.component.css'
})
export class OrganigramaComponent implements OnInit {
  organigrama: AreaJerarquica[] = [];
  organigramaFiltrado: AreaJerarquica[] = [];
  areasPlanas: AreaJerarquica[] = [];
  vistaJerarquica = true;
  terminoBusqueda = '';
  cargando = true;
  totalAreas = 0;
  noResultados = false;
  expandirTodos = false;
  stats = {
    nivel1: 0,
    nivel2: 0,
    nivel3: 0,
    nivel4: 0
  };

  constructor(private organigramaService: OrganigramaService) {}

  ngOnInit() {
    this.cargarDatos();
  }

  async cargarDatos() {
    this.cargando = true;
    try {
      this.organigramaService.obtenerOrganigramaCompleto().subscribe({
        next: (organigramaData) => {

          const datos = organigramaData || [];
          const rectorado = datos.find(a => a.codigoOrganigrama === 'RECTORADO' || a.nombre.includes('RECTORADO'));
          const otros = datos.filter(a => a.id !== rectorado?.id);

          this.organigrama = rectorado ? [rectorado, ...otros] : datos;
          this.organigramaFiltrado = [...this.organigrama];
          this.totalAreas = this.organigramaService.contarTotalAreas(this.organigrama);
          this.calcularEstadisticas();
          this.cargando = false;
        },
        error: (error) => {
          this.cargando = false;
        }
      });

      this.organigramaService.obtenerAreasPlanas().subscribe({
        next: (areasData) => {
          this.areasPlanas = areasData || [];
        },
        error: (error) => {
        }
      });
    } catch (error) {
      this.cargando = false;
    }
  }

  toggleVista() {
    this.vistaJerarquica = !this.vistaJerarquica;
    this.filtrarAreas();
  }

  filtrarAreas() {
    if (!this.terminoBusqueda.trim()) {
      this.organigramaFiltrado = [...this.organigrama];
      this.noResultados = false;
      return;
    }

    if (this.vistaJerarquica) {
      this.organigramaFiltrado = this.organigramaService.buscarAreaEnOrganigrama(
        this.organigrama,
        this.terminoBusqueda
      );
    } else {
      this.organigramaFiltrado = this.areasPlanas.filter(area =>
        area.nombre.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        area.descripcion?.toLowerCase().includes(this.terminoBusqueda.toLowerCase()) ||
        area.codigoOrganigrama?.toLowerCase().includes(this.terminoBusqueda.toLowerCase())
      );
    }

    this.noResultados = this.organigramaFiltrado.length === 0;
  }

  toggleExpansion(area: AreaJerarquica) {
    area.expanded = !area.expanded;
  }

  obtenerClaseNivel(nivel: number): string {
    const clases = ['nivel-1', 'nivel-2', 'nivel-3', 'nivel-4', 'nivel-5'];
    return clases[nivel - 1] || 'nivel-default';
  }

  obtenerIconoArea(area: AreaJerarquica): string {
    if (area.nombre.includes('Consejo')) return 'fas fa-university';
    if (area.nombre.includes('Rectorado')) return 'fas fa-crown';
    if (area.nombre.includes('Vicerrectorado')) return 'fas fa-user-tie';
    if (area.nombre.includes('Facultad')) return 'fas fa-graduation-cap';
    if (area.nombre.includes('Escuela')) return 'fas fa-school';
    if (area.nombre.includes('Oficina')) return 'fas fa-building';
    if (area.nombre.includes('Dirección')) return 'fas fa-sitemap';
    if (area.nombre.includes('Instituto')) return 'fas fa-flask';
    if (area.nombre.includes('Secretaría')) return 'fas fa-file-alt';
    return 'fas fa-folder';
  }

  calcularEstadisticas() {
    this.stats = { nivel1: 0, nivel2: 0, nivel3: 0, nivel4: 0 };
    this.contarPorNivel(this.organigrama);
  }

  private contarPorNivel(areas: AreaJerarquica[]) {
    areas.forEach(area => {
      switch(area.nivelJerarquico) {
        case 1: this.stats.nivel1++; break;
        case 2: this.stats.nivel2++; break;
        case 3: this.stats.nivel3++; break;
        case 4: this.stats.nivel4++; break;
      }
      if (area.subAreas?.length) {
        this.contarPorNivel(area.subAreas);
      }
    });
  }

  toggleExpandirTodos() {
    this.expandirTodos = !this.expandirTodos;
    this.aplicarExpansionRecursiva(this.organigramaFiltrado, this.expandirTodos);
  }

  private aplicarExpansionRecursiva(areas: AreaJerarquica[], expandir: boolean) {
    areas.forEach(area => {
      area.expanded = expandir;
      if (area.subAreas?.length) {
        this.aplicarExpansionRecursiva(area.subAreas, expandir);
      }
    });
  }

  limpiarBusqueda() {
    this.terminoBusqueda = '';
    this.filtrarAreas();
  }

  async inicializarEstructura() {
    try {
      this.organigramaService.inicializarEstructura().subscribe({
        next: () => {
          this.cargarDatos();
        },
        error: (error) => {
        }
      });
    } catch (error) {
    }
  }

  formatearUsuarios(cantidad: number): string {
    if (cantidad === 0) return 'Sin usuarios';
    if (cantidad === 1) return '1 usuario';
    return `${cantidad} usuarios`;
  }

  exportarEstructura() {
    const datos = {
      totalAreas: this.totalAreas,
      fechaExportacion: new Date().toISOString(),
      estructura: this.organigrama,
      estadisticas: this.stats
    };

    const blob = new Blob([JSON.stringify(datos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `organigrama_untumbes_${new Date().getTime()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  trackByAreaId(_: number, area: AreaJerarquica): number {
    return area.id;
  }
}