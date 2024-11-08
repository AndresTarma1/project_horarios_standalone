import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {

  constructor(){}

  private http: HttpClient = inject(HttpClient);

  apiURL:string  = environment.apiUrl;

  getEstudiantesSinGrupo(): Observable<any>{
    return this.http.get(`${this.apiURL}/student/not-group`,{ headers: {'ngrok-skip-browser-warning':'true'} });
  }

  getCarreras(): Observable<any>{
    return this.http.get(`${this.apiURL}/careers`, { headers: {'ngrok-skip-browser-warning':'true'}});
  }

  getCargasAcademicasCarrera(id_carrera: number){
    return this.http.get(`${this.apiURL}/academic_load/ver-con-carrera/${id_carrera}`, { headers: {'ngrok-skip-browser-warning':'true'}});
  }

  getProfesores(): Observable<any>{
    return this.http.get(`${this.apiURL}/teacher`, { headers: { 'ngrok-skip-browser-warning' : 'true' }});
  }

  postAsignaturaMaestro(credenctials: any): Observable<any>{
    const { id_subject, id_teacher} = credenctials;
    return this.http.post(`${this.apiURL}/subject_teacher`, {}, {params: {
      "id_subject" : id_subject,
      "id_teacher": id_teacher
    }});
  }

  postGrupoEstudiante(credentials: any): Observable<any> {
    const { id_group, id_student} = credentials;
    return this.http.patch(`${this.apiURL}/student/add-group`, {}, {params: {
      "id_group" : id_group,
      "id_student": id_student
    }});
  }

  postCargaAcademica(cargaAcademica: any){
    console.log(cargaAcademica);
    return this.http.post(`${this.apiURL}/academic_load`,
      { "name": cargaAcademica.name, "description": cargaAcademica.description },
      { headers: {'ngrok-skip-browser-warning':'true'} }
    );
  }

  postAsignaturasCargaAcademica(cargaAcademica: number, asignaturas: string[]){
    // console.log(cargaAcademica, asignaturas);
    let datos : string = '';
    for(let i: number = 0; i < asignaturas.length ; i++){
      datos += `${i},`;
    }
    return this.http.post(`${this.apiURL}/academic_load-subject`, { "id_academic_load": `${cargaAcademica}`, "id_subject": `${asignaturas}` });
  }

  getAsignaturas(): Observable<any>{
    return this.http.get(`${this.apiURL}/subject`,{ headers: {'ngrok-skip-browser-warning':'true'} });
  }

  getCargaAcademicas(): Observable<any> {
    return this.http.get(`${this.apiURL}/academic_load`, { headers: {'ngrok-skip-browser-warning':'true'} });
  }

  getAsignaturasCargaAcademica(id: number): Observable<any>{
    return this.http.get(`${this.apiURL}/academic_load/${id}`, { headers: {'ngrok-skip-browser-warning':'true'} });
  }

  getProfesoresAsignatura(id: string): Observable<any>{
    return this.http.get(`${this.apiURL}/subject_teacher/${id}`, { headers: {'ngrok-skip-browser-warning':'true'} });
  }

  getGrupos(): Observable<any>{
    return this.http.get(`${this.apiURL}/group`, {headers: {'ngrok-skip-browser-warning':'true'}});
  }

  getHorario(grupoId: any): Observable<any>{
    return this.http.get(`${this.apiURL}/schedule/${grupoId}`, {headers: {'ngrok-skip-browser-warning':'true'}});
  }

  deleteHorario(horario: number): Observable<any>{
    return this.http.delete(`${this.apiURL}/schedule/${horario}`, {headers : {'ngrok-skip-browser-warning':'true'}});
  }

  deleteCargaAcademica(id: number): Observable<any>{
    return this.http.delete(`${this.apiURL}/academic_load/${id}`,
      { headers:
        {'ngrok-skip-browser-warning':'true'}
      });
  }

  postHorario(horario: any): Observable<any>{
    return this.http.post(`${this.apiURL}/schedule`, horario , {headers : {'ngrok-skip-browser-warning':'true'} });
  }

  postHorarioAutomatico(horario: any): Observable<any>{
    return this.http.post(`${this.apiURL}/schedule`, horario, { headers: {'ngrok-skip-browser-warning':'true'} })
  }
}
