import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {


    
    const token = this.authService.getToken();
    const currentUser = this.authService.currentUserValue;
    const isAuth = this.authService.isAuthenticated();
    

    // Primero verificar autenticación
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/servicios-administrativos'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
    
    const expectedRoles = route.data['roles'] as string[];
    const userRole = currentUser?.role?.name;
    

    
    if (!expectedRoles || expectedRoles.length === 0) {

      return true;
    }
    
    const hasRole = this.authService.hasAnyRole(expectedRoles);

    
    if (hasRole) {

      return true;
    }
    

    this.router.navigate(['/access-denied']);
    return false;
  }
}