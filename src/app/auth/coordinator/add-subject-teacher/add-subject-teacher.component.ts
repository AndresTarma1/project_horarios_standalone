import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-subject-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-subject-teacher.component.html',
  styleUrl: './add-subject-teacher.component.css'
})
export class AddSubjectTeacherComponent {

  valor = 50;
  maestroAsignatura: any;
  asignaturas: any = [];
  profesores: any[] = [];

  constructor(private coordinadorService: CoordinadorService){}

  asignatura: any;
  profesor: any;
  disable: boolean = true;

  ngOnInit(): void {
      this.obtenerProfesores();
      this.obtenerAsignaturas();
  }

  onChangeProfesor(event: any){
    this.profesor = event.target.value;
  }

  onChangeAsignatura(event: any){
    this.asignatura = event.target.value;
    this.disable = false;
  }

  addAsignaturaMaestro(){
    let credential: any = {
      id_teacher : this.profesor,
      id_subject : this.asignatura,
    }

    this.coordinadorService.postAsignaturaMaestro(credential).subscribe(
      (res: any) =>  {
        console.log(res);
        if(res.ok){
          Swal.fire({
            title: 'Correcto',
            text: `${res.msg}`,
            icon: 'success'
          });
        }else{
          Swal.fire({
            title: 'error',
            text: `${res.msg}`,
            icon: 'error'
          });
        }
      }
    );
    // console.log(credential);
  }

  obtenerAsignaturas(){
    this.coordinadorService.getAsignaturas().subscribe(
      (res: any) => {
        this.asignaturas = res.subjects;
      }
    )
  }

  // adminService = inject(AdminService);

  obtenerProfesores(){
    this.coordinadorService.getProfesores().subscribe(
      (res: any) => {
        this.profesores = res.teachers;
      }
    );
  }

}
