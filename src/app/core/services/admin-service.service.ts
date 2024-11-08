import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { appConfig } from '../../app.config';
import { Profesor } from '../../interfaces/profesor.interface';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { Coordinador } from '../../interfaces/coordinador.interface';

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

  postProfesor(profesor: Profesor): Observable<any>{
    return this.http.post(`${this.apiUrl}/teacher`, profesor, { headers: this.baseHeader});
  }

  postEstudiante(estudiante: Estudiante): Observable<any>{
    return this.http.post(`${this.apiUrl}/student`, estudiante, { headers: this.baseHeader});
  }

  postCoordinador(coordinador: Coordinador): Observable<any>{
    return this.http.post(`${this.apiUrl}/coordinator`, coordinador, { headers: this.baseHeader});
  }

  patchProfesor(profesor: Profesor): Observable<any>{
    return this.http.patch(`${this.apiUrl}/teacher/${profesor.id}`, profesor, { headers: this.baseHeader});
  }

  patchEstudiante(estudiante: Estudiante): Observable<any>{
    return this.http.patch(`${this.apiUrl}/student/${estudiante.id}`, estudiante, { headers: this.baseHeader});
  }

  patchCoordinador(coordinador: Coordinador): Observable<any>{
    return this.http.patch(`${this.apiUrl}/coordinator/${coordinador.id}`, coordinador, { headers: this.baseHeader});
  }

  deleteProfesor(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/teacher/${id}`, { headers: this.baseHeader });
  }

  deleteEstudiante(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/student/${id}`, { headers: this.baseHeader });
  }

  deleteCoordinador(id: string): Observable<any>{
    return this.http.delete(`${this.apiUrl}/coordinator/${id}`, { headers: this.baseHeader });
  }


}
