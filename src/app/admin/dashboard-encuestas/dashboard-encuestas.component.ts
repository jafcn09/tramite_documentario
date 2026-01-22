import { Component, OnInit, OnDestroy, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartData } from 'chart.js';
import { EncuestaSatisfaccionService, DashboardMetricas } from '../../services/encuesta-satisfaccion.service';
import { ThemeService } from '../../services/theme.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-encuestas',
  standalone: true,
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './dashboard-encuestas.component.html',
  styleUrls: ['./dashboard-encuestas.component.css']
})
export class DashboardEncuestasComponent implements OnInit, OnDestroy {
  private encuestaService = inject(EncuestaSatisfaccionService);
  private themeService = inject(ThemeService);
  private destroy$ = new Subject<void>();

  loading = true;
  error: string | null = null;
  dashboardData: DashboardMetricas | null = null;
  currentTheme: 'light' | 'dark' = 'light';


  selectedAreaId: number | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

 
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: (context) => `Promedio: ${context.parsed.y ? context.parsed.y.toFixed(2) : '0'}`
        }
      }
    }
  };
  barChartType = 'bar' as const;
  barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  
  doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };
  doughnutChartType = 'doughnut' as const;
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [],
    datasets: []
  };


  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 5
      }
    }
  };
  lineChartType: ChartType = 'line';
  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: []
  };

  ngOnInit(): void {

    this.themeService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(theme => {
        this.currentTheme = theme;
        this.updateChartsTheme();
      });

    this.cargarDashboard();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cargarDashboard(): void {
    this.loading = true;
    this.error = null;

    this.encuestaService.obtenerDashboardMetricas(
      this.selectedAreaId ?? undefined,
      this.fechaInicio || undefined,
      this.fechaFin || undefined
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.dashboardData = response.data;
          this.actualizarGraficos();
        } else {
          this.error = response.message || 'Error al cargar el dashboard';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar el dashboard: ' + (err.error?.message || err.message);
        this.loading = false;
      }
    });
  }

  actualizarGraficos(): void {
    if (!this.dashboardData) return;


    const promedios = this.dashboardData.promediosPorCriterio;
    this.barChartData = {
      labels: [
        'Tiempo de Respuesta',
        'Calidad de Respuesta',
        'Claridad',
        'Amabilidad',
        'Resolución',
        'General'
      ],
      datasets: [{
        data: [
          promedios.tiempoRespuesta,
          promedios.calidadRespuesta,
          promedios.claridad,
          promedios.amabilidad,
          promedios.resolucion,
          promedios.general
        ],
        backgroundColor: this.getBarColors(),
        borderColor: this.getBorderColors(),
        borderWidth: 2
      }]
    };

 
    const distribucion = this.dashboardData.distribucionCalificaciones;
    this.doughnutChartData = {
      labels: ['1 Estrella', '2 Estrellas', '3 Estrellas', '4 Estrellas', '5 Estrellas'],
      datasets: [{
        data: [
          distribucion[1] || 0,
          distribucion[2] || 0,
          distribucion[3] || 0,
          distribucion[4] || 0,
          distribucion[5] || 0
        ],
        backgroundColor: this.getDoughnutColors(),
        borderColor: this.currentTheme === 'dark' ? '#1e293b' : '#ffffff',
        borderWidth: 2
      }]
    };
  }

  private getBarColors(): string[] {
    if (this.currentTheme === 'dark') {
      return [
        'rgba(59, 130, 246, 0.7)',  // blue-500
        'rgba(16, 185, 129, 0.7)',  // emerald-500
        'rgba(139, 92, 246, 0.7)',  // violet-500
        'rgba(236, 72, 153, 0.7)',  // pink-500
        'rgba(245, 158, 11, 0.7)',  // amber-500
        'rgba(37, 99, 235, 0.7)'    // blue-600
      ];
    } else {
      return [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(236, 72, 153, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(37, 99, 235, 0.8)'
      ];
    }
  }

  private getBorderColors(): string[] {
    return [
      'rgb(59, 130, 246)',
      'rgb(16, 185, 129)',
      'rgb(139, 92, 246)',
      'rgb(236, 72, 153)',
      'rgb(245, 158, 11)',
      'rgb(37, 99, 235)'
    ];
  }

  private getDoughnutColors(): string[] {
    return [
      'rgba(239, 68, 68, 0.8)',   // red-500
      'rgba(245, 158, 11, 0.8)',  // amber-500
      'rgba(234, 179, 8, 0.8)',   // yellow-500
      'rgba(34, 197, 94, 0.8)',   // green-500
      'rgba(37, 99, 235, 0.8)'    // blue-600
    ];
  }

  private updateChartsTheme(): void {
 
    if (this.dashboardData) {
      this.actualizarGraficos();
    }

 
    const textColor = this.currentTheme === 'dark' ? '#f8fafc' : '#111827';
    const gridColor = this.currentTheme === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(0, 0, 0, 0.1)';

    if (this.barChartOptions?.scales?.['y']) {
      this.barChartOptions.scales['y'].ticks = {
        ...this.barChartOptions.scales['y'].ticks,
        color: textColor
      };
      this.barChartOptions.scales['y'].grid = {
        color: gridColor
      };
    }
    if (this.barChartOptions?.scales?.['x']) {
      this.barChartOptions.scales['x'].ticks = {
        color: textColor
      };
      this.barChartOptions.scales['x'].grid = {
        color: gridColor
      };
    }
  }

  aplicarFiltros(): void {
    this.cargarDashboard();
  }

  limpiarFiltros(): void {
    this.selectedAreaId = null;
    this.fechaInicio = '';
    this.fechaFin = '';
    this.cargarDashboard();
  }


  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    return Array(5).fill(0).map((_, index) => {
      if (index < fullStars) return 1;
      if (index === fullStars && rating % 1 >= 0.5) return 0.5;
      return 0;
    });
  }

  getStarClass(star: number): string {
    if (star === 1) return 'text-yellow-400';
    if (star === 0.5) return 'text-yellow-400 opacity-50';
    return 'text-gray-300 dark:text-gray-600';
  }
}