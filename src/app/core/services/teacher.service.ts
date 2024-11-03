import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {


  urlAPI : string = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getHorario(id: string): Observable<any>{
    return this.http.get(`${this.urlAPI}/teacher/show-schedule/${id}`, { headers: {'ngrok-skip-browser-warning':'true'} });
  }
}
