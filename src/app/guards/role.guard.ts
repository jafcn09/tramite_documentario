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
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/servicios-administrativos'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }


    const expectedRoles = route.data['roles'] as string[];

  
    if (!expectedRoles || expectedRoles.length === 0) {
      return true;
    }

    const currentUser = this.authService.currentUserValue;

    if (!currentUser || !currentUser.role || !currentUser.role.name) {
      this.router.navigate(['/acceso-denegado']);
      return false;
    }

    const hasRole = this.authService.hasAnyRole(expectedRoles);

    if (hasRole) {
      return true;
    }

    this.router.navigate(['/acceso-denegado']);
    return false;
  }
}