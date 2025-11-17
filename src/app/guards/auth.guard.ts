import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    // ✅ MEJORA: Primero validar el token contra el servidor
    // Si el token es inválido, se limpiará automáticamente el localStorage
    return this.authService.validateTokenWithBackend().pipe(
      map(isValid => {
        if (isValid) {
          console.log('✓ Acceso permitido a ruta:', state.url);
          return true;
        } else {
          console.warn('✗ Token inválido. Redirigiendo a login:', state.url);
          this.router.navigate(['/servicios-administrativos'], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        }
      })
    );
  }
}