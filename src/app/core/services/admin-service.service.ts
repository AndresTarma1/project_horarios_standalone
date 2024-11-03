import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { appConfig } from '../../app.config';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseHeader: HttpHeaders = new HttpHeaders().set('ngrok-skip-browser-warning', 'true');

  apiUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);
  constructor() { }

  getProfesores(): Observable<any>{
    return this.http.get(`${this.apiUrl}/teacher`, { headers: this.baseHeader});
  }

  getEstudiantes(): Observable<any>{
    return this.http.get(`${this.apiUrl}/student`, { headers: this.baseHeader})
  }

  getCoordinadores(): Observable<any>{
    return this.http.get(`${this.apiUrl}/coordinator`, { headers: this.baseHeader});
  }

  postProfesor(inter: any): Observable<any>{
    console.log(inter);
    return this.http.post(`${this.apiUrl}/teacher`, inter, { headers: this.baseHeader});
  }

  postEstudiante(inter: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/student`, inter, { headers: this.baseHeader});
  }

  postCoordinador(inter: any): Observable<any>{
    return this.http.post(`${this.apiUrl}/coordinator`, inter, { headers: this.baseHeader});
  }

  patchProfesor(inter: any): Observable<any>{
    return this.http.patch(`${this.apiUrl}/teacher`, inter, { headers: this.baseHeader});
  }

  patchEstudiante(inter: any): Observable<any>{
    return this.http.patch(`${this.apiUrl}/student`, inter, { headers: this.baseHeader});
  }

  patchCoordinador(inter: any): Observable<any>{
    return this.http.patch(`${this.apiUrl}/coordinator`, inter);
  }

  deleteProfesore(inter: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/teacher`, inter);
  }

  deleteEstudiante(inter: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/student`, inter);
  }

  deleteCoordinador(inter: any): Observable<any>{
    return this.http.delete(`${this.apiUrl}/coordinator`, inter);
  }


}
