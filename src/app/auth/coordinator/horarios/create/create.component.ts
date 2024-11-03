import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { catchError, map, Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxSpinnerModule, AsyncPipe],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  datos: any = {
    cargaAcademica: true,
    grupo: true,
    asignatura: true,
    profesor: true
  };

  horarioForm: FormGroup = this.fb.group({
    id_academic_load: [{value: '', disabled: true }, [Validators.required]],
    id_subject: [{value: '', disabled: true}, [Validators.required]],
    id_teacher: [{value: '', disabled: true}, [Validators.required]],
    id_group: [{value: '', disabled: true}, [Validators.required]]
  });

  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  public cargaAcademicas$: Observable<any>;
  public asignaturas$: Observable<any>;
  public profesores$: Observable<any>;
  public grupos$: Observable<any>;
  private id: number;


  constructor(private fb: FormBuilder){
  }

  ngOnInit(): void {
    this.obtenerCargasAcademicas();
  }

  obtenerCargasAcademicas(): void{
    this.cargaAcademicas$ = this.coordinadorService.getCargaAcademicas()
    .pipe(  map ( (res) => { this.horarioForm.get('id_academic_load')?.enable() ; return res; }));
  }

  onChangeCargaAcademica(): void{
    this.obtenerGrupos();
  }

  obtenerGrupos() : void{
    this.grupos$ = this.coordinadorService.getGrupos().pipe( map ( (res) => { this.horarioForm.get('id_group')?.enable() ; return res;}));
  }

  obtenerAsignaturas(): void{
    let cargaAcademica = this.horarioForm.controls['id_academic_load'].value;
    this.asignaturas$ = this.coordinadorService.getAsignaturasCargaAcademica(cargaAcademica).pipe( map( (res: any) => {
      if(res.ok){
        this.horarioForm.get('id_subject')?.enable();
      }else{
        Swal.fire({
          title: 'Error',
          text: 'Esta carga academica no contiene asignaturas',
          icon: 'error'
        });
      }
      return res;
    }),
    catchError( (err: any) => {
      if(!err.error.ok){
        Swal.fire({
          title: 'Error',
          text: 'Esta carga academica no contiene asignaturas',
          icon: 'error'
        });
      }
      throw new Error('Ah ocurrido un error');
    })

  );}

  obtenerProfesores(): void{
    let asignatura: string = this.horarioForm.controls['id_subject'].value;
    this.profesores$ = this.coordinadorService.getProfesoresAsignatura(asignatura).pipe( map((res) => {
      this.horarioForm.get('id_teacher')?.enable() ; return res;
    }));
  }

  crearHorario(){
    let horario: any = this.horarioForm.value;
    this.coordinadorService.postHorario(horario).subscribe({
      next: (res: any) => {
        if( res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Horario Creado Correctamente',
            icon: 'success'
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Ah ocurrido un error dentro del servidor',
            icon: 'error'
          });
        }
      }
    });
  }

}
