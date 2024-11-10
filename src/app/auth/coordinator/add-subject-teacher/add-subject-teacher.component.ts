import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-subject-teacher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbProgressbarModule],
  templateUrl: './add-subject-teacher.component.html',
  styleUrl: './add-subject-teacher.component.css'
})
export class AddSubjectTeacherComponent {

  valor = 0;
  asignaturas$: Observable<any>;
  profesores$: Observable<any>;


  asignacionMaterias: FormGroup = this.fb.group({
    'id_teacher': ['', Validators.required],
    'id_subject': ['', Validators.required],
  });

  constructor(private coordinadorService: CoordinadorService, private fb: FormBuilder){}

  disable: boolean = true;

  ngOnInit(): void {
    this.obtenerMaestros();
  }

  obtenerMaestros(): void{
    this.profesores$ = this.coordinadorService.getProfesores();

    this.valorCien()
  }

  obtenerAsignaturas(): void{
    if(this.asignacionMaterias.controls['id_teacher'].value){
      this.asignaturas$ = this.coordinadorService.getAsignaturas();
    }else{
      this.asignaturas$ = new BehaviorSubject(null);
    }

    this.valorCien()
  }

  valorCien(){
    if(this.asignacionMaterias.controls['id_subject'].value && this.asignacionMaterias.controls['id_teacher'].value){
      this.valor = 100;
    }else if(this.asignacionMaterias.controls['id_teacher'].value){
      this.valor = 50;
    }else{
      this.valor = 0;
    }

  }


  addAsignaturaAMaestro(): void{
    this.coordinadorService.postAsignaturaMaestro(this.asignacionMaterias.value).subscribe({
      next: (res: any) => {
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'La asignatura se ha establecido exitosamente',
            icon: 'success'
          });
          this.asignacionMaterias.reset();
        }else{
          Swal.fire({
            title: 'Error',
            text: 'El profesor no se ha podido asignar a la asignatura, ah ocurrido un error',
            icon: 'error'
          });
        }
      },
      error: (err: any) => {
        Swal.fire({
          title: 'Conflicto',
          text: `El profesor ya esta dando esta asignatura`,
          icon: 'error'
        });
        this.asignacionMaterias.patchValue({
          'id_subject' : ''
        });
      },
      complete: () => { this.valorCien();}
    })
  }
}
