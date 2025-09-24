import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ManualSection {
  id: string;
  title: string;
  content: string;
  steps?: string[];
}

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule],
  template: `
<div class="max-w-6xl mx-auto px-4 py-8">
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      <div class="university-gradient text-white p-8 text-center">
           <div class="bg-university-gradient text-white p-8 text-center">
        <h2 class="text-2xl font-bold mb-2">Bienvenido al Manual de Usuario</h2>
        <p class="text-sm">Aquí encontrarás toda la información necesaria para utilizar el Sistema de Secretaria General de la Universidad Nacional de Tumbes.</p>
      </div>

      </div>

      <div class="p-8">
        <div class="grid md:grid-cols-4 gap-8">
          <div class="md:col-span-1">
            <div class="sticky top-24">
              <h3 class="font-bold text-university-700 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                </svg>
                Índice
              </h3>
              <nav class="space-y-2">
                <button *ngFor="let section of manualSections; let i = index" 
                   (click)="scrollToSection(section.id)"
                   class="w-full text-left px-3 py-2 text-sm text-gray-600 hover:text-university-600 hover:bg-university-50 rounded-lg transition-colors flex items-center">
                  <span class="w-6 h-6 bg-university-100 text-university-700 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                    {{ i + 1 }}
                  </span>
                  {{ section.title }}
                </button>
              </nav>
            </div>
          </div>

          <div class="md:col-span-2 space-y-8">
            <div *ngFor="let section of manualSections; let i = index" 
                 [id]="section.id" 
                 class="bg-gray-50 rounded-xl p-6 border-l-4 border-university-500 scroll-mt-24">
              <div class="flex items-center mb-4">
                <span class="w-8 h-8 university-gradient text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  {{ i + 1 }}
                </span>
                <h2 class="text-xl font-bold text-university-800">{{ section.title }}</h2>
              </div>
              <p class="text-gray-700 mb-6 leading-relaxed">{{ section.content }}</p>
              
              <div *ngIf="section.steps" class="bg-white rounded-lg p-4">
                <h4 class="font-semibold text-university-700 mb-4 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                  Pasos a seguir:
                </h4>
                <ol class="space-y-3">
                  <li *ngFor="let step of section.steps; let stepIndex = index" 
                      class="flex items-start">
                    <span class="w-6 h-6 bg-university-500 text-white rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5 flex-shrink-0">
                      {{ stepIndex + 1 }}
                    </span>
                    <span class="text-gray-700" [innerHTML]="step"></span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  `
})
export class ManualComponent {
  
  manualSections: ManualSection[] = [
    {
      id: 'introduccion',
      title: 'Introducción al Sistema',
      content: 'El Sistema de Secretaria General de la Universidad Nacional de Tumbes permite gestionar de manera eficiente todos los trámites académicos y administrativos de forma digital.',
    },
    {
      id: 'registro',
      title: 'Registro y Acceso',
      content: 'Para acceder al sistema, los usuarios deben registrarse con sus datos personales y académicos.',
      steps: [
        'Hacer clic en "Acceder al Sistema" desde la página principal',
        'Completar el formulario de registro con datos personales',
        'Verificar el correo electrónico',
        'Confirmar el registro'
      ]
    },
    {
      id: 'servicios-admin',
      title: 'Servicios Administrativos',
      content: 'Trámites institucionales y administrativos internos de la universidad.',
      steps: [
        'Acceder con credenciales institucionales',
        'Seleccionar tipo de trámite administrativo',
        'Completar información requerida',
        'Obtener aprobaciones necesarias',
        'Descargar documento final'
      ]
    },
    {
      id: 'consultas',
      title: 'Consultas y Seguimiento',
      content: 'Sistema de búsqueda y monitoreo del estado de los trámites realizados.',
      steps: [
        'Ingresar número de documento',
        'Consultar estado actual del trámite',
        'Verificar documentos pendientes',
        'Recibir notificaciones automáticas',
        'Descargar documentos finalizados'
      ]
    },
  ];

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

}