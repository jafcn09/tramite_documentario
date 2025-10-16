import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesService } from '../../services/reportes.service';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent implements OnInit {
  fechaGeneracion: Date = new Date();
  reporteCompleto: any = null;
  resumenGeneral: any = {};
  tramitesPorTipo: any[] = [];
  tramitesUrgentes: any[] = [];
  cargando = true;

  constructor(private reportesService: ReportesService) {}

  ngOnInit() {
    this.cargarReportes();
  }

  cargarReportes() {
    this.cargando = true;
    this.reportesService.obtenerReporteCompleto().subscribe({
      next: (reporte) => {
        this.reporteCompleto = reporte;
        this.resumenGeneral = reporte.resumenGeneral;
        this.tramitesPorTipo = reporte.tramitesPorTipo;
        this.tramitesUrgentes = reporte.tramitesUrgentes;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
      }
    });
  }

  imprimirReporte() {
    window.print();
  }

  exportarExcel() {
    if (!this.reporteCompleto) {
      alert('No hay datos para exportar');
      return;
    }

    // Crear contenido CSV con datos reales
    let csvContent = 'REPORTE DE TRAMITES - UNIVERSIDAD NACIONAL DE TUMBES\n';
    csvContent += 'Fecha de generacion: ' + this.fechaGeneracion.toLocaleDateString('es-PE') + '\n\n';

    // Resumen General
    csvContent += 'RESUMEN GENERAL\n';
    csvContent += `Total Tramites,${this.resumenGeneral.totalTramites}\n`;
    csvContent += `Completados,${this.resumenGeneral.completados}\n`;
    csvContent += `En Proceso,${this.resumenGeneral.enProceso}\n`;
    csvContent += `Vencidos,${this.resumenGeneral.vencidos}\n`;
    csvContent += `Rechazados,${this.resumenGeneral.rechazados}\n`;
    csvContent += `Observados,${this.resumenGeneral.observados}\n\n`;

    // Tramites por Tipo
    csvContent += 'TRAMITES POR TIPO DE DOCUMENTO\n';
    csvContent += 'Tipo,Cantidad,Completados,Pendientes\n';
    this.tramitesPorTipo.forEach(tipo => {
      csvContent += `${tipo.tipo},${tipo.cantidad},${tipo.completados},${tipo.pendientes}\n`;
    });
    csvContent += '\n';

    // Tramites Urgentes
    csvContent += 'TRAMITES QUE REQUIEREN ATENCION URGENTE\n';
    csvContent += 'Codigo,Asunto,Estado,Area Responsable,Responsable,Dias Vencido\n';
    this.tramitesUrgentes.forEach(tramite => {
      csvContent += `${tramite.codigo},${tramite.asunto},${tramite.estado},${tramite.areaResponsable},${tramite.responsable},${tramite.diasVencido}\n`;
    });

    // Crear blob y descargar
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', 'reporte_tramites_' + this.fechaGeneracion.getTime() + '.csv');
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  obtenerEstadoUrgente(tramite: any): string {
    if (tramite.diasVencido > 0) {
      return `VENCIDO (${tramite.diasVencido} ${tramite.diasVencido === 1 ? 'día' : 'días'})`;
    } else if (tramite.diasVencido === 0) {
      return 'VENCE HOY';
    } else if (tramite.diasVencido === -1) {
      return 'VENCE MAÑANA';
    } else {
      return `VENCE EN ${Math.abs(tramite.diasVencido)} DÍAS`;
    }
  }

  obtenerClaseEstado(tramite: any): string {
    if (tramite.diasVencido > 0) {
      return 'fila-vencida';
    } else if (tramite.diasVencido === 0) {
      return 'fila-hoy';
    } else {
      return 'fila-pronto';
    }
  }

  obtenerClaseEstadoTexto(tramite: any): string {
    if (tramite.diasVencido > 0) {
      return 'vencido';
    } else if (tramite.diasVencido === 0) {
      return 'hoy';
    } else {
      return 'pronto';
    }
  }
}