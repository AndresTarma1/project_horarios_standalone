import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-group-student',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-group-student.component.html',
  styleUrl: './add-group-student.component.css'
})
export class AddGroupStudentComponent {

  groupStudent: any;
  grupos: any = [];
  estudiantes: any[] = [];
  constructor(private coordinatorService: CoordinadorService){}

  grupo: any;
  estudiante: any;
  disable: boolean = true;

  ngOnInit(): void {
      this.obtenerEstudiantes();
      this.obtenerGrupos();
  }

  onChangeEstudent(event: any){
    this.estudiante = event.target.value;
  }

  onChangeGroup(event: any){
    this.grupo = event.target.value;
    this.disable = false;
  }

  addGrupoEstudiante(){
    let credential: any = {
      id_group : this.grupo,
      id_student : this.estudiante,
    }

    this.coordinatorService.postGrupoEstudiante(credential).subscribe(
      (res: any) =>  {
        if(res.ok){
          Swal.fire({
            title: 'Correcto',
            text: `${res.msg}`,
            icon: 'success'
          });
          this.obtenerEstudiantes();
        }else{
          Swal.fire({
            title: 'error',
            text: `${res.msg}`,
            icon: 'error'
          });
        }
      }
    );
  }

  obtenerGrupos(){
    this.coordinatorService.getGrupos().subscribe(
      (res: any) => {
        this.grupos = res.groups;
      }
    )
  }

  obtenerEstudiantes(){
    this.coordinatorService.getEstudiantesSinGrupo().subscribe(
      (res: any) => {
        this.estudiantes = res.student;
      }
    );
  }

}
