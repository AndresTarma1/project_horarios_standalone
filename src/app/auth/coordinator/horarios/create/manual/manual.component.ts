import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../../core/services/coordinador.service';
import { AsignaturasComponent } from '../../../carga-academica/asignaturas/asignaturas.component';
import { group } from '@angular/animations';
import { StarIcon } from 'primeng/icons/star';

interface Horario {
  'h:i': string;
  'h:f': string;
}

interface DiaDisponible {
  dia: string;
  horas: Horario[];
}


@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manual.component.html',
  styleUrl: './manual.component.css'
})
export class ManualComponent implements OnInit {



  horarioForm: FormGroup = this.fb.group(
    {
      'id_career': ['', [Validators.required, Validators.minLength(1)]],
      'id_academic_load': ['', [Validators.required, Validators.minLength(1)]],
      'id_subject': ['', [Validators.required, Validators.minLength(1)]],
      'id_group': ['', [Validators.required, Validators.minLength(1)]],
      'id_teacher': ['', [Validators.required, Validators.minLength(1)]]
    }
  );

  //Injeccion del servicio del coordinador
  private coordinadorService: CoordinadorService = inject(CoordinadorService);


  /**
   *
   * @param fb
   * Desarrollamos los observables necesarios para obtener los datos del formulario
   */

  $carreras: Observable<any>;
  $cargas_academicas: Observable<any>;
  $asignaturas: Observable<any>;
  $grupos: Observable<any>;
  $profesores: Observable<any>;
  $disponibilidad: Observable<any>;


  ngOnInit(): void {
      this.obtenerCarreras();
  }
  constructor(private fb: FormBuilder){

  }

  obtenerCarreras(): void{
    this.$carreras = this.coordinadorService.getCarreras();
  }

  obtenerCargasAcademicas(): void{

    let id_academic_load = this.horarioForm.controls['id_career'].value;

    if(id_academic_load){
      this.$cargas_academicas = this.coordinadorService.getCargasAcademicasCarrera(id_academic_load);
    }else{
      this.horarioForm.patchValue({
        'id_academic_load': '',
        'id_subject': '',
        'id_group': '',
        'id_teacher': ''
      });
      this.$cargas_academicas = new BehaviorSubject(null);
      this.obtenerAsignaturas();
    }
  }

  obtenerAsignaturas(): void{
    let id_carga_academica = this.horarioForm.controls['id_academic_load'].value;

    if(id_carga_academica){
      this.$asignaturas = this.coordinadorService.getAsignaturasCargaAcademica(id_carga_academica);
    }else{
      this.horarioForm.patchValue({
        'id_subject': '',
        'id_group': '',
        'id_teacher': ''
      });

      this.$asignaturas = new BehaviorSubject(null);
      this.obtenerMaestros();
    }
  }

  obtenerMaestros(): void{
    let id_asignatura = this.horarioForm.controls['id_subject'].value;

    if(id_asignatura){
      this.$profesores = this.coordinadorService.getProfesoresAsignatura(id_asignatura);
    }else{
      this.horarioForm.patchValue({
        'id_group': '',
        'id_teacher': ''
      });
      this.$profesores = new BehaviorSubject(null);
      this.obtenerGrupos();
    }
  }

  obtenerGrupos(): void{
    if(this.horarioForm.controls['id_teacher'].value){
      this.$grupos = this.coordinadorService.getGrupos();
    }else{
      this.horarioForm.patchValue({
        'id_teacher': ''
      });
      this.$grupos = new BehaviorSubject(null);
      this.obtenerDisponibilidad();
    }
  }

  diasDisponibles: DiaDisponible[] = [];

  obtenerDisponibilidad(): void{
    let credenciales = {
      'id_subject' : this.horarioForm.controls['id_subject'].value,
      'id_teacher' : this.horarioForm.controls['id_teacher'].value,
      'id_group' : this.horarioForm.controls['id_group'].value
    }


    if(credenciales.id_group){
      this.coordinadorService.getProfesoresDisponibilidad(credenciales).subscribe(
        (res: any) => {

          // Object.entries(res.dias_horas).forEach(([key, value]) => {
          //   console.log(value);
          // })
          const devolverHoraDia = (dia: string)  =>{
            return Object.values(res.dias_horas[dia]) as [{'h:i': string, 'h:f': string}];
          }
          Object.keys(res.dias_horas).forEach(
            (valor: string) =>  {
              this.diasDisponibles.push({
                dia: valor,
                horas: devolverHoraDia(valor)
              });
            }
          );
        }
      );
    }else{
      this.diasDisponibles = [];
    }

  }

  crearHorario(){
    console.log(this.horarioForm.value);
  }
}
