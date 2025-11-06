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

        if (error.status === 0) {
      
          if (!error.url?.includes('/api/auth/login')) {
            this.toastService.error('Sin conexión al servidor', 'Error de Conexión');
            this.redirectToHome();
          }
        } else if (error.status === 401) {
    
        } else if (error.status === 403) {
          console.error('ERROR 403 - URL:', error.url);
          console.error('ERROR 403 - Message:', error.message);
          console.error('ERROR 403 - Error completo:', error);
          if (!error.url?.includes('/usuarios/recent') && !error.url?.includes('/usuarios/stats')) {
            this.toastService.error('No tienes permisos para realizar esta acción', 'Acceso Denegado');
            this.router.navigate(['/access-denied']);
          }
        } else if (error.status === 404) {

          this.toastService.error('Recurso no encontrado', 'Error 404');
        } else if (error.status >= 500) {
        
          this.toastService.error('Error interno del servidor', 'Error del Servidor');
          this.redirectToHome();
        } else if (error.status === -1 || error instanceof TimeoutError) {
     
          this.toastService.error('Tiempo de espera agotado', 'Error de Conexión');
          this.redirectToHome();
        }

        return throwError(() => error);
      })
    );
  }

  private redirectToHome(): void {

    this.authService.logout();
  }
}