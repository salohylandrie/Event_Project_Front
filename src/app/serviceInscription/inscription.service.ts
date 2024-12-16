import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class InscriptionService {
  private baseUrl='http://localhost:8000'; 
  
    constructor( private http: HttpClient,private authService: AuthService ) { }
  
    getInscriptions(): Observable<any[]>{
        return this.http.get<any[]>(`${this.baseUrl}/api/inscriptions/listeinscript`);
    }
  
    getInscription(id: number): Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/api/inscriptions/inscrit/${id}`);
   }
  
   createInscription(data: any): Observable<any>{
    const token = this.authService.getToken(); // Récupère le token depuis AuthService
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    
    return this.http.post<any>(`${this.baseUrl}/api/inscriptions/new`, data,{ headers });
   }
  
   updateInscription(id: number, inscription: any):Observable<any>{
    return this.http.put<any>(`${this.baseUrl}/api/inscriptions/editInscrit/${id}`, inscription);
   }
                                                    
   deleteInscription(id: number):Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}/api/inscriptions/deleteinscript/${id}`)
   }
  }
 