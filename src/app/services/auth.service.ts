import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError, timer, Subscription } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { ModalService } from './modal.service';
import { AdministrativeUser, ChangePasswordRequest, LoginRequest, LoginResponse, User } from '../shared/interfaces/auth.interface';



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
  private readonly INACTIVITY_TIME = 20 * 60 * 1000; 
  private readonly WARNING_TIME = 18 * 60 * 1000;

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    const storedUser = this.getStoredUser();


    if (storedUser && this.isAuthenticated()) {
  
      this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
      this.startInactivityTimer();
      this.setupUserActivityListeners();
    } else {


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

          const loginData = response?.data || response;
          const token = loginData?.token;
          const refreshToken = loginData?.refreshToken;
          const usuario = loginData?.usuario;

          if (response && token) {
            this.modalService.clearAllModals();

            this.storeTokens(token, refreshToken || '');

            if (usuario) {
              this.storeUser(usuario);

              this.currentUserSubject.next(usuario);

           
              if (usuario.mustChangePassword === true) {
            
              } else {
                this.startInactivityTimer();
                this.setupUserActivityListeners();
              }
            }

       
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
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
    this.modalService.clearAllModals();

    if (this.isBrowser) {
   
      localStorage.removeItem(this.tokenKey);
      localStorage.removeItem(this.refreshTokenKey);
      localStorage.removeItem(this.userKey);

      sessionStorage.clear();

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
     
      if (typeof window !== 'undefined' && (window as any).notificacionService) {
        (window as any).notificacionService.limpiarEstado();
      }


      if (typeof window !== 'undefined' && (window as any).bandejaTramitesService) {
        (window as any).bandejaTramitesService.clearTramites();
      }

    } catch (error) {

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
 
        const loginData = response?.data || response;
        const token = loginData?.token;
        const newRefreshToken = loginData?.refreshToken;

        if (token) {
          this.storeTokens(token, newRefreshToken || '');
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

  validateTokenWithBackend(): Observable<boolean> {
    const token = this.getToken();

    if (!token) {
      return new Observable(observer => {
        observer.next(false);
        observer.complete();
      });
    }

    return this.http.get<any>(`${environment.apiUrl}/api/usuarios/perfil`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(response => {
        // Token es válido, usuario está autenticado
        console.log('✓ Token validado contra el servidor');
      }),
      map(() => true),
      catchError(error => {
        // Token es inválido o expiró
        console.warn('✗ Token inválido contra el servidor. Limpiando sesión...');
        this.clearSessionData();
        this.currentUserSubject.next(null);
        return new Observable<boolean>(observer => {
          observer.next(false);
          observer.complete();
        });
      })
    );
  }

  hasRole(role: string): boolean {
    const user = this.currentUserValue;
    if (!user || !user.role || !user.role.name) return false;
    return user.role.name.toLowerCase() === role.toLowerCase();
  }

  hasAnyRole(roles: string[]): boolean {
    const user = this.currentUserValue;
    if (!user || !user.role) return false;
    return roles.some(role => role.toLowerCase() === user.role.name.toLowerCase());
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
  
    this.warningTimer = timer(this.WARNING_TIME).subscribe(() => {
      this.showSessionWarning();
    });
    

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
      this.resetInactivityTimer();
    } else {

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
          return throwError(() => error);
        })
      );
  }

  getAdministrativosDisponibles(excludeUserId?: number): Observable<AdministrativeUser[]> {
    let url = `${environment.apiUrl}/api/usuarios/administrativos-disponibles`;
    if (excludeUserId) {
      url += `?excludeUserId=${excludeUserId}`;
    }
    return this.http.get<AdministrativeUser[]>(url)
      .pipe(
        catchError(error => {
          return throwError(() => error);
        })
      );
  }
}