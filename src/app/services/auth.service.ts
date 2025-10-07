import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { ModalService } from './modal.service';

export interface LoginRequest {
  usuario: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  refreshToken: string;
  redirectUrl?: string;
  role?: string;
  usuario?: any;
  message?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  correo: string;
  foto?: string;
  tipoDocumento?: string;
  numDocumento?: string;
  direccion?: string;
  celular?: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
}

export interface AdministrativeUser {
  id: number;
  usuario: string;
  nombre: string;
  apellidos: string;
  correo: string;
  foto?: string;
  role: {
    id: number;
    name: string;
    description: string;
  };
  area?: {
    id: number;
    nombre: string;
    descripcion: string;
    activa: boolean;
  };
  workloadCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private tokenKey = 'auth_token';
  private refreshTokenKey = 'refresh_token';
  private userKey = 'current_user';
  private isBrowser: boolean;
  private inactivityTimer: Subscription | null = null;
  private warningTimer: Subscription | null = null;
  private readonly INACTIVITY_TIME = 20 * 60 * 1000; // 20 minutes
  private readonly WARNING_TIME = 18 * 60 * 1000; // 18 minutes (2 minutes before logout)

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const storedUser = this.getStoredUser();


    // Validate token before setting user
    if (storedUser && this.isAuthenticated()) {
  
      this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
      this.startInactivityTimer();
      this.setupUserActivityListeners();
    } else {

      // Clear invalid session data
      this.clearSessionData();
      this.currentUserSubject = new BehaviorSubject<User | null>(null);
    }

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
   
    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/login`, credentials)
      .pipe(
        tap(response => {

          if (response.token) {
            // Clear any remaining modals from previous sessions
            this.modalService.clearAllModals();

            this.storeTokens(response.token, response.refreshToken);
            if (response.usuario) {

              this.storeUser(response.usuario);
              this.currentUserSubject.next(response.usuario);

              this.startInactivityTimer();
              this.setupUserActivityListeners();
            } else {
              console.warn('AuthService: No se recibió usuario en la respuesta');
            }
            // La redirección será manejada por el componente de login
          } else {
            console.warn('AuthService: No se recibió token en la respuesta');
          }
        }),
        catchError(error => {
          console.error('Login error details:', {
            status: error.status,
            statusText: error.statusText,
            message: error.message,
            error: error.error,
            url: error.url,
            ok: error.ok
          });
          return throwError(() => error);
        })
      );
  }

  logout(): void {

    this.stopInactivityTimer();
    this.removeUserActivityListeners();


    this.clearSessionData();
    this.clearAllServiceStates();


    this.currentUserSubject.next(null);


    this.modalService.confirm({
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión exitosamente. Se han limpiado todos los datos de la sesión.',
      type: 'info',
      confirmText: 'Entendido',
      icon: 'fas fa-sign-out-alt'
    });

    this.router.navigate(['/servicios-administrativos']);


  }

  private clearSessionData(): void {

    // Clear all modals first
    this.modalService.clearAllModals();

    if (this.isBrowser) {
      // Limpiar localStorage
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
      localStorage.removeItem(this.userKey);

      // Limpiar sessionStorage también
      sessionStorage.clear();

      // Limpiar cualquier otro dato relacionado con la sesión
      const keysToRemove = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith('auth_') || key.startsWith('user_') || key.startsWith('token_'))) {
          keysToRemove.push(key);
        }
      }

      keysToRemove.forEach(key => localStorage.removeItem(key));

    }
  }

  private clearAllServiceStates(): void {
    try {
      // Limpiar servicio de notificaciones si está disponible
      if (typeof window !== 'undefined' && (window as any).notificacionService) {
        (window as any).notificacionService.limpiarEstado();
      }

      // Limpiar servicio de bandeja de trámites si está disponible
      if (typeof window !== 'undefined' && (window as any).bandejaTramitesService) {
        (window as any).bandejaTramitesService.clearTramites();
      }

    } catch (error) {
      console.warn('⚠️ Error al limpiar algunos estados de servicios:', error);
    }
  }

  refreshToken(): Observable<LoginResponse> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<LoginResponse>(`${environment.apiUrl}/api/auth/refresh`, {}, {
      headers: {
        'Authorization': `Bearer ${refreshToken}`
      }
    }).pipe(
      tap(response => {
        if (response.token) {
          this.storeTokens(response.token, response.refreshToken);
        }
      }),
      catchError(error => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem(this.refreshTokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    
    
    if (!token) {

      return false;
    }
    
    try {
      const payload = this.parseJwt(token);
      const expirationDate = new Date(payload.exp * 1000);
      const isValid = expirationDate > new Date();
     
      return isValid;
    } catch (error) {

      return false;
    }
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    return user?.role?.name === role;
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    if (!user || !user.role) return false;
    return roles.some(role => role.toUpperCase() === user.role.name.toUpperCase());
  }

  private storeTokens(token: string, refreshToken: string): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.tokenKey, token);
    if (refreshToken) {
      localStorage.setItem(this.refreshTokenKey, refreshToken);
    }
  }

  private storeUser(user: User): void {
    if (!this.isBrowser) return;
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  private getStoredUser(): User | null {
    if (!this.isBrowser) return null;
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  private parseJwt(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  private startInactivityTimer(): void {
    if (!this.isBrowser) return;
    
    this.stopInactivityTimer();
    
    // Warning timer (2 minutes before logout)
    this.warningTimer = timer(this.WARNING_TIME).subscribe(() => {
      this.showSessionWarning();
    });
    
    // Logout timer
    this.inactivityTimer = timer(this.INACTIVITY_TIME).subscribe(() => {

      this.logout();
    });
  }

  private stopInactivityTimer(): void {
    if (this.inactivityTimer) {
      this.inactivityTimer.unsubscribe();
      this.inactivityTimer = null;
    }
    if (this.warningTimer) {
      this.warningTimer.unsubscribe();
      this.warningTimer = null;
    }
  }

  private async showSessionWarning(): Promise<void> {
    const result = await this.modalService.confirm({
      title: 'Sesión por expirar',
      message: 'Tu sesión expirará en 2 minutos por inactividad. ¿Deseas continuar?',
      type: 'warning',
      confirmText: 'Continuar',
      cancelText: 'Cerrar sesión',
      icon: 'fas fa-clock'
    });

    if (result) {
      // User wants to continue, reset the timer
      this.resetInactivityTimer();
    } else {
      // User chose to logout or didn't respond
      this.logout();
    }
  }

  private resetInactivityTimer(): void {
    if (this.currentUserValue) {
      this.startInactivityTimer();
    }
  }

  private setupUserActivityListeners(): void {
    if (!this.isBrowser) return;
    
    const events = ['click', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.addEventListener(event, this.handleUserActivity.bind(this), true);
    });
  }

  private removeUserActivityListeners(): void {
    if (!this.isBrowser) return;
    
    const events = ['click', 'keypress', 'scroll', 'mousemove'];
    events.forEach(event => {
      document.removeEventListener(event, this.handleUserActivity.bind(this), true);
    });
  }

  private handleUserActivity(): void {
    this.resetInactivityTimer();
  }

  changePassword(request: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/auth/change-password`, request)
      .pipe(
        catchError(error => {
          console.error('Change password error:', error);
          return throwError(() => error);
        })
      );
  }

  getAdministrativosDisponibles(): Observable<AdministrativeUser[]> {
    return this.http.get<AdministrativeUser[]>(`${environment.apiUrl}/api/usuarios/administrativos-disponibles`)
      .pipe(
        catchError(error => {
          console.error('Error fetching administrative users:', error);
          return throwError(() => error);
        })
      );
  }

  private redirectBasedOnRole(role?: string): void {
    if (!role) {
      this.router.navigate(['/home']);
      return;
    }

    const roleRoutes: { [key: string]: string } = {
      'ADMIN': '/admin/tablero',
      'USUARIO': '/usuario/tablero',
      'ADMINISTRATIVO': '/administrativo/tablero',
      'ESTUDIANTE': '/estudiante/tablero'
    };

    const route = roleRoutes[role] || '/home';
    this.router.navigate([route]);
  }
}