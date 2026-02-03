import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Module, Stat } from '../shared/interfaces/module.interface';
import { ThemeToggleComponent } from '../shared/components/theme-toggle/theme-toggle.component';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-home',
    imports: [CommonModule, ThemeToggleComponent],
    template: `
    <section class="relative py-20 px-4 transition-colors duration-300"
             [ngClass]="{'bg-gradient-to-br from-university-50 to-university-100': !isDarkMode, 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900': isDarkMode}">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 animate-fade-in transition-colors"
              [ngClass]="{'text-university-800': !isDarkMode, 'text-slate-50': isDarkMode}">
            Plataforma de Gestión
            <br>
            <span class="transition-colors" [ngClass]="{'text-university-600': !isDarkMode, 'text-blue-400': isDarkMode}">Documentaria Universitaria</span>
          </h1>
          <p class="text-xl mb-10 max-w-3xl mx-auto animate-slide-up delay-100 transition-colors"
             [ngClass]="{'text-gray-700': !isDarkMode, 'text-slate-300': isDarkMode}">
            Sistema integral para la administración eficiente de trámites académicos y administrativos de nuestra institución educativa pública.
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-200">
            <button (click)="goToManual()"
                    class="px-8 py-4 rounded-lg font-semibold text-lg transition-all"
                    [ngClass]="{'btn-outline-university': !isDarkMode, 'bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-500': isDarkMode}">
              Manual de Usuario
              <svg class="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 lg:py-16 px-4 transition-colors duration-300"
             [ngClass]="{'bg-white': !isDarkMode, 'bg-slate-900': isDarkMode}">
      <div class="max-w-6xl mx-auto">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 lg:mb-16">
          <div *ngFor="let stat of stats"
               class="rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 animate-fade-in delay-100 border"
               [ngClass]="{
                 'bg-gradient-to-br from-white to-university-50 border-university-100': !isDarkMode,
                 'bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600': isDarkMode
               }">
            <div class="flex flex-col items-center text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-xl shadow-md transition-colors"
                   [ngClass]="{'bg-university-100': !isDarkMode, 'bg-blue-500/20': isDarkMode}">
                <svg class="w-8 h-8 transition-colors"
                     [ngClass]="{'text-university-600': !isDarkMode, 'text-blue-400': isDarkMode}"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="stat.icon"></path>
                </svg>
              </div>
              <div class="text-4xl md:text-5xl font-bold mb-2 transition-colors"
                   [ngClass]="{'text-university-800': !isDarkMode, 'text-slate-50': isDarkMode}">{{ stat.value }}</div>
              <div class="text-sm md:text-base font-medium transition-colors"
                   [ngClass]="{'text-gray-600': !isDarkMode, 'text-slate-300': isDarkMode}">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 transition-colors duration-300"
             [ngClass]="{'bg-gray-50': !isDarkMode, 'bg-slate-800': isDarkMode}">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4 transition-colors"
              [ngClass]="{'text-university-800': !isDarkMode, 'text-slate-50': isDarkMode}">
            Módulos del Sistema
          </h2>
          <p class="text-xl transition-colors"
             [ngClass]="{'text-gray-600': !isDarkMode, 'text-slate-300': isDarkMode}">Herramientas especializadas para la gestión académica y administrativa</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mx-auto">
          <div *ngFor="let module of modules; let i = index"
               class="rounded-xl p-6 lg:p-8 animate-fade-in cursor-pointer hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border"
               [class.delay-100]="i === 0"
               [class.delay-200]="i === 1"
               [class.delay-300]="i === 2"
               [class.delay-400]="i === 3"
               [ngClass]="{
                 'institutional-card': !isDarkMode,
                 'bg-slate-700/50 border-slate-600': isDarkMode
               }"
               (click)="handleModuleClick(module)">

            <div class="flex items-center justify-center w-16 h-16 mb-6 rounded-xl shadow-lg bg-opacity-10"
                 [ngClass]="module.bgClass">
              <svg class="w-8 h-8" [ngClass]="module.iconColor" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="module.icon"></path>
              </svg>
            </div>

            <h3 class="text-xl font-bold mb-3 transition-colors"
                [ngClass]="{'text-university-800': !isDarkMode, 'text-slate-50': isDarkMode}">{{ module.title }}</h3>
            <p class="mb-6 transition-colors"
               [ngClass]="{'text-gray-600': !isDarkMode, 'text-slate-300': isDarkMode}">{{ module.subtitle }}</p>

            <div class="space-y-3 mb-6">
              <div *ngFor="let feature of module.features" class="flex items-center space-x-3 transition-colors"
                   [ngClass]="{'text-gray-700': !isDarkMode, 'text-slate-300': isDarkMode}">
                <div class="w-2 h-2 rounded-full flex-shrink-0 transition-colors"
                     [ngClass]="{'bg-university-500': !isDarkMode, 'bg-blue-400': isDarkMode}"></div>
                <span class="text-sm">{{ feature }}</span>
              </div>
            </div>

            <button class="w-full px-6 py-3 rounded-lg font-medium hover:shadow-md transition-all duration-300"
                    [ngClass]="{
                      'btn-outline-university': !isDarkMode,
                      'bg-blue-500 text-white hover:bg-blue-600': isDarkMode
                    }">
              Acceder al Módulo
              <svg class="inline-block w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  currentYear = new Date().getFullYear();
  isDarkMode = false;
  private themeSubscription?: Subscription;

  constructor(
    private router: Router,
    private themeService: ThemeService
  ) {}
  
  modules: Module[] = [

    {
      id: 'internal',
      title: 'Servicios Administrativos',
      subtitle: 'Trámites institucionales y administrativos',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      gradient: 'from-university-700 to-university-800',
      bgClass: 'bg-blue-100',
      iconColor: 'text-blue-700',
      delay: 200,
      features: [
        'Autorizaciones oficiales',
        'Permisos especiales',
        'Documentación legal',
        'Registro de actividades'
      ]
    },
    {
      id: 'search',
      title: 'Consulta y Seguimiento',
      subtitle: 'Sistema de búsqueda y monitoreo de trámites',
      icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      gradient: 'from-university-500 to-university-600',
      bgClass: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      delay: 300,
      features: [
        'Estado de solicitudes',
        'Historial de trámites',
        'Notificaciones automáticas',
        'Reportes personalizados'
      ]
    },
    {
      id: 'grados',
      title: 'Consulta de Grados',
      subtitle: 'Verificación de diplomas y grados académicos',
      icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
      gradient: 'from-green-500 to-green-600',
      bgClass: 'bg-green-100',
      iconColor: 'text-green-600',
      delay: 400,
      features: [
        'Búsqueda por DNI',
        'Búsqueda por código diploma',
        'Verificación de autenticidad',
        'Constancia digital'
      ]
    }
  ];
  
  stats: Stat[] = [
    { value: '98.5%', label: 'Satisfacción Usuario', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
    { value: '5,200+', label: 'Trámites Mensuales', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
    { value: '24hrs', label: 'Tiempo Promedio', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
  ];
  
  activeModule: string | null = null;

  ngOnInit(): void {
    
    this.themeSubscription = this.themeService.theme$.subscribe(theme => {
      this.isDarkMode = theme === 'dark';
    });

    this.initializeAnimations();
  }

  ngAfterViewInit(): void {
    this.initializeAnimations();
  }

  ngOnDestroy(): void {
    if (this.themeSubscription) {
      this.themeSubscription.unsubscribe();
    }
  }
  
  private initializeAnimations(): void {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animate-fade-in');
            }
          });
        },
        { threshold: 0.1 }
      );
      
      setTimeout(() => {
        document.querySelectorAll('.observe-animation').forEach((el) => {
          observer.observe(el);
        });
      }, 100);
    }
  }
  
  setActiveModule(moduleId: string | null): void {
    this.activeModule = moduleId;
  }
  
  handleModuleClick(module: Module): void {
    if (module.id === 'search') {
      this.router.navigate(['/verificar']);
    } else if (module.id === 'external') {
      this.router.navigate(['/tramites-externos']);
    } else if (module.id === 'internal') {
      this.router.navigate(['/servicios-administrativos']);
    } else if (module.id === 'grados') {
      this.router.navigate(['/grados']);
    } else {

    }
  }
  
  goToManual(): void {
    this.router.navigate(['/manual']);
  }
}