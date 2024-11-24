import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {
private baseUrl='http://localhost:8000'; 
  constructor( private http: HttpClient ) { }

  getEvenements(): Observable<any[]>{
      return this.http.get<any[]>(`${this.baseUrl}/evenement`);
  }

  getEvenement(id: number): Observable<any>{
  return this.http.get<any>(`${this.baseUrl}/evenement/${id}`);
 }

 createEvenement(evenement: any): Observable<any>{
  return this.http.post<any>(`${this.baseUrl}/evenement/createEven`, evenement);
 }

 updateEvenement(id: number, evenement: any):Observable<any>{
  return this.http.put<any>(`${this.baseUrl}/evenements/${id}`, evenement);
 }
                                                  
 deleteEvenement(id: number):Observable<any>{
  return this.http.delete<any>(`${this.baseUrl}/evenement/delete/${id}`)
 }
}
