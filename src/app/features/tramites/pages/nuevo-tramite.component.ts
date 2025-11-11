import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NuevoTramiteModalComponent } from '../components/nuevo-tramite-modal/nuevo-tramite-modal.component';
import { Tramite } from '../../../shared/interfaces/tramite.interface';

@Component({
  selector: 'app-nuevo-tramite-page',
  standalone: true,
  imports: [CommonModule, NuevoTramiteModalComponent],
  template: `
    <div class="nuevo-tramite-page">
      <div class="page-header">
        <h1>
          <i class="fas fa-plus-circle"></i>
          Nuevo Trámite
        </h1>
        <button class="btn btn-secondary" (click)="goBack()">
          <i class="fas fa-arrow-left"></i>
          Volver
        </button>
      </div>
      
      <app-nuevo-tramite-modal 
        [show]="true"
        (close)="goBack()"
        (tramiteCreado)="onTramiteCreado($event)">
      </app-nuevo-tramite-modal>
    </div>
  `,
  styles: [`
    .nuevo-tramite-page {
      padding: 20px;
      min-height: 100vh;
    }
    
    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
      padding: 0 20px;
    }
    
    .page-header h1 {
      font-size: 28px;
      font-weight: 600;
      color: #2c3e50;
      display: flex;
      align-items: center;
      gap: 12px;
      margin: 0;
    }
    
    .page-header h1 i {
      color: #3498db;
    }
    
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-weight: 500;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s;
    }
    
    .btn-secondary {
      background: #ecf0f1;
      color: #2c3e50;
    }
    
    .btn-secondary:hover {
      background: #d5dbdb;
    }
  `]
})
export class NuevoTramitePageComponent {
  
  constructor(private router: Router) {}
  
  goBack() {

    const currentPath = this.router.url;
    if (currentPath.includes('/admin/')) {
      this.router.navigate(['/admin/tramites']);
    } else if (currentPath.includes('/administrativo/')) {
      this.router.navigate(['/administrativo/mis-tramites']);
    } else if (currentPath.includes('/usuario/')) {
      this.router.navigate(['/usuario/mis-tramites']);
    } else if (currentPath.includes('/estudiante/')) {
      this.router.navigate(['/estudiante/tablero']);
    } else {
      this.router.navigate(['/']);
    }
  }
  
  onTramiteCreado(tramite: Tramite) {
    this.goBack();
  }
}