import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('🔐 AuthGuard checking access to:', state.url);

    // Validar token del lado del cliente (verifica si existe y no ha expirado)
    if (this.authService.isAuthenticated() && this.authService.currentUserValue) {
      console.log('✓ Acceso permitido a ruta:', state.url);
      return true;
    }

    console.warn('✗ No autenticado. Redirigiendo a login desde:', state.url);
    this.router.navigate(['/servicios-administrativos'], {
      queryParams: { returnUrl: state.url }
    });
    return false;
  }
}