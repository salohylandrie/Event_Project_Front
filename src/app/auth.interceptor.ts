import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupération du token depuis le localStorage ou sessionStorage
    const token = localStorage.getItem('jwtToken'); // Remplacez par votre méthode de stockage

    if (token) {
      // Clonage de la requête pour ajouter le header Authorization
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}
