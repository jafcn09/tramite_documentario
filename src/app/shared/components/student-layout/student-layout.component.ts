import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { ModalComponent } from '../../modal/modal.component';
import { ToastComponent } from '../toast/toast.component';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';
import { MisTramitesService } from '../../../services/mis-tramites.service';

@Component({
  selector: 'app-student-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, ModalComponent, ToastComponent, NotificationBellComponent],
  templateUrl: './student-layout.component.html',
  styleUrls: ['./student-layout.component.css']
})
export class StudentLayoutComponent implements OnInit {
  currentUser: User | null = null;
  showUserMenu = false;
  studentStats: any = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private misTramitesService: MisTramitesService
  ) {}

  ngOnInit() {
    this.authService.currentUser.subscribe(user => {
      this.currentUser = user;
      if (user) {
        this.loadStudentStats();
      }
    });
  }

  loadStudentStats() {
    this.misTramitesService.getMisTramites(1, 100).subscribe({
      next: (response) => {
        const tramites = response.data || [];

        const tramitesActivos = tramites.filter((t: any) =>
          ['En Revisión', 'Enviado', 'En Proceso', 'Aprobado', 'Derivado'].includes(t.estado?.nombre)
        ).length;

        const tramitesCompletados = tramites.filter((t: any) =>
          ['Finalizado', 'Archivado'].includes(t.estado?.nombre) || t.estaVencido
        ).length;

        this.studentStats = {
          tramitesActivos,
          tramitesCompletados,
          totalTramites: tramites.length
        };
      },
      error: (error) => {
        this.studentStats = {
          tramitesActivos: 0,
          tramitesCompletados: 0,
          totalTramites: 0
        };
      }
    });
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return 'Estudiante';
    return fullName.split(' ')[0];
  }

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/perfil']);
  }

  viewNotifications(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/estudiante/notificaciones']);
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.router.navigate(['/cambiar-contrasena']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.showUserMenu = false;
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile')) {
      this.showUserMenu = false;
    }
  }
}
