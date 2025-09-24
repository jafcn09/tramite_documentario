import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        if (error.status === 0) {
          // Network error - no connection to server
          this.toastService.error('Sin conexión al servidor', 'Error de Conexión');
          this.redirectToHome();
        } else if (error.status === 401) {
          // Unauthorized - handled by auth interceptor
          // No need to redirect here as auth interceptor will handle it
        } else if (error.status === 403) {
          // Forbidden - No redirigir en llamadas de dashboard
          if (!error.url?.includes('/usuarios/recent') && !error.url?.includes('/usuarios/stats')) {
            this.toastService.error('No tienes permisos para realizar esta acción', 'Acceso Denegado');
            this.router.navigate(['/access-denied']);
          }
        } else if (error.status === 404) {
          // Not Found
          this.toastService.error('Recurso no encontrado', 'Error 404');
        } else if (error.status >= 500) {
          // Server Error
          this.toastService.error('Error interno del servidor', 'Error del Servidor');
          this.redirectToHome();
        } else if (error.status === -1 || error instanceof TimeoutError) {
          // Timeout or network error
          this.toastService.error('Tiempo de espera agotado', 'Error de Conexión');
          this.redirectToHome();
        }

        return throwError(() => error);
      })
    );
  }

  private redirectToHome(): void {
    // Clear session if there's a connection issue
    this.authService.logout();
  }
}