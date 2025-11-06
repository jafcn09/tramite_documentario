import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Areas } from '../../shared/interfaces/areas.interface';
import { Usuario } from '../../shared/interfaces/areas.interface';


@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {
  areas: Areas[] = [];
  filteredAreas: Areas[] = [];
  paginatedAreas: Areas[] = [];
  showModal = false;
  showDetailModal = false;
  showDeleteModal = false;
  isEditing = false;
  isLoading = false;
  currentArea: Areas | null = null;
  selectedArea: Areas | null = null;
  areaToDelete: Areas | null = null;
  areaUsers: Usuario[] = [];
  areaForm: FormGroup;
  successMessage = '';
  errorMessage = '';
  openMenuId: number | null = null;

  searchTerm = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  totalAreas = 0;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder
  ) {
    this.areaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(100)]],
      descripcion: ['', [Validators.maxLength(500)]],
      activa: [true]
    });
  }

  ngOnInit() {
    this.loadAreas();
  }

  loadAreas() {
    const token = localStorage.getItem('auth_token');
    this.http.get<Areas[]>(`${environment.apiUrl}/api/areas`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (areas) => {
        this.areas = areas;
        this.filterAreas();
      },
      error: (error) => {
        this.showError('Error al cargar las áreas');
      }
    });
  }

  openCreateModal() {
    this.isEditing = false;
    this.currentArea = null;
    this.areaForm.reset({ activa: true });
    this.showModal = true;
  }

  editArea(area: Areas) {
    this.isEditing = true;
    this.currentArea = area;
    this.areaForm.patchValue(area);
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.clearMessages();
  }

  saveArea() {
    if (this.areaForm.invalid) {
      this.areaForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const token = localStorage.getItem('auth_token');
    const areaData = this.areaForm.value;

    const request = this.isEditing
      ? this.http.put<Areas>(`${environment.apiUrl}/api/areas/${this.currentArea!.id}`, areaData, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      : this.http.post<Areas>(`${environment.apiUrl}/api/areas`, areaData, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

    request.subscribe({
      next: (area) => {
        this.showSuccess(this.isEditing ? 'Área actualizada correctamente' : 'Área creada correctamente');
        this.loadAreas();
        this.closeModal();
        this.isLoading = false;
      },
      error: (error) => {
        this.showError(error.error?.error || 'Error al guardar el área');
        this.isLoading = false;
      }
    });
  }

  toggleAreaStatus(area: Areas) {
    const token = localStorage.getItem('auth_token');
    this.http.put<Areas>(`${environment.apiUrl}/api/areas/${area.id}/toggle-status`, {}, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (updatedArea) => {
        this.showSuccess(`Área ${updatedArea.activa ? 'activada' : 'desactivada'} correctamente`);
        this.loadAreas();
      },
      error: (error) => {
        this.showError('Error al cambiar el estado del área');
      }
    });
  }

  confirmDeleteArea(area: Areas) {
    this.areaToDelete = area;
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.areaToDelete = null;
  }

  executeDelete() {
    if (!this.areaToDelete) return;

    const token = localStorage.getItem('auth_token');
    this.http.delete(`${environment.apiUrl}/api/areas/${this.areaToDelete.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: () => {
        this.showSuccess('Área eliminada correctamente');
        this.loadAreas();
        this.cancelDelete();
      },
      error: (error) => {
        this.showError(error.error?.error || 'Error al eliminar el área');
        this.cancelDelete();
      }
    });
  }

  private showSuccess(message: string) {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => {
      this.successMessage = '';
    }, 5000);
  }

  private showError(message: string) {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => {
      this.errorMessage = '';
    }, 5000);
  }

  filterAreas() {
    if (!this.searchTerm.trim()) {
      this.filteredAreas = [...this.areas];
    } else {
      this.filteredAreas = this.areas.filter(area =>
        area.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        (area.descripcion && area.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    }
    
    this.totalAreas = this.filteredAreas.length;
    this.totalPages = Math.ceil(this.totalAreas / this.itemsPerPage);
    
    if (this.currentPage > this.totalPages) {
      this.currentPage = 1;
    }
    
    this.updatePaginatedAreas();
  }

  updatePaginatedAreas() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedAreas = this.filteredAreas.slice(startIndex, endIndex);
  }

  clearSearch() {
    this.searchTerm = '';
    this.currentPage = 1;
    this.filterAreas();
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedAreas();
    }
  }

  selectArea(area: Areas) {
    this.selectedArea = area;
    this.loadAreaUsers(area.id);
    this.showDetailModal = true;
  }

  loadAreaUsers(areaId: number) {
    const token = localStorage.getItem('auth_token');

    this.http.get<Usuario[]>(`${environment.apiUrl}/api/usuario-area/area/${areaId}/users`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }).subscribe({
      next: (users) => {

        this.areaUsers = users;
      },
      error: (error) => {
        this.areaUsers = [];
      }
    });
  }

  closeDetailModal() {
    this.showDetailModal = false;
    this.selectedArea = null;
    this.areaUsers = [];
  }

  private clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }

  toggleMenu(areaId: number) {
    this.openMenuId = this.openMenuId === areaId ? null : areaId;
  }

  closeMenu() {
    this.openMenuId = null;
  }
}