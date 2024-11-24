import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: any): boolean {
    const roles = this.authService.getRoles();
    const requiredRole = route.data['role']; // Spécifiez le rôle requis dans les routes

    if (roles.includes(requiredRole)) {
      return true;
    }

    this.router.navigate(['/login']); // Redirection en cas d'accès interdit
    return false;
  }
}
