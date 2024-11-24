import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8000';

  constructor(private httpClient: HttpClient, private router: Router) {}

  // Méthode d'inscription
  signup(data: any) {
    return this.httpClient.post(`${this.baseUrl}/userCreate`, data, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  login(data: any) {
    return this.httpClient.post(`${this.baseUrl}/api/login_check`, data).pipe(
      tap((result: any) => {
        if (result?.roles && result?.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('roles', JSON.stringify(result.roles));
        } else {
          console.error('Rôles ou token manquants dans la réponse');
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    this.router.navigate(['/login']);
  }

  getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
