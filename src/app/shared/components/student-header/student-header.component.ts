import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../services/auth.service';
import { NotificationBellComponent } from '../notification-bell/notification-bell.component';

@Component({
  selector: 'app-student-header',
  standalone: true,
  imports: [CommonModule, NotificationBellComponent],
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {
  @Input() currentUser: User | null = null;
  @Input() stats: any = null;
  @Output() toggleSidebar = new EventEmitter<void>();

  showUserDropdown = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this.currentUser) {
      this.authService.currentUser.subscribe(user => {
        this.currentUser = user;
      });
    }
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return 'Estudiante';
    return fullName.split(' ')[0];
  }

  toggleUserDropdown() {
    this.showUserDropdown = !this.showUserDropdown;
  }

  toggleMobileMenu() {
    // Emit event to parent layout to toggle sidebar
    this.toggleSidebar.emit();
  }

  navigateToTramites() {
    this.router.navigate(['/estudiante/mis-tramites']);
  }

  createNewTramite() {
    this.router.navigate(['/estudiante/nuevo-tramite']);
  }

  viewProfile(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/perfil']);
  }

  viewNotifications(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/estudiante/notificaciones']);
  }

  changePassword(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.router.navigate(['/cambiar-contrasena']);
  }

  logout(event: Event) {
    event.preventDefault();
    this.showUserDropdown = false;
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-section')) {
      this.showUserDropdown = false;
    }
  }
}
