import { Component, inject, OnInit } from '@angular/core';
import { CoordinadorService } from '../../../../../core/services/coordinador.service';
import { BehaviorSubject, interval, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { getBsVer } from 'ngx-bootstrap/utils';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-automatico',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './automatico.component.html',
  styleUrl: './automatico.component.css'
})
export class AutomaticoComponent implements OnInit {

  private coordinatorService: CoordinadorService = inject(CoordinadorService);
  public carreras$: Observable<any>;
  public cargas_academicas$: Observable<any>;
  public grupos$: Observable<any>;

  horarioForm: FormGroup = this.fb.group({
    id_career: ['', [Validators.required]],
    id_academic_load: ['', [Validators.required]],
    id_group: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.obtenerCarreras();
  }

  obtenerCarreras(): void{
    this.carreras$ = this.coordinatorService.getCarreras();
  }

  obtenerCargasAcademicas(): void{
    let id_carrera = this.horarioForm.controls['id_career'].value;
    if(id_carrera){
      this.cargas_academicas$ = this.coordinatorService.getCargasAcademicasCarrera(id_carrera);
      return;
    }else{
      Swal.fire({
        title: 'Advertencia',
        text: 'Seleccione una carrera',
        icon: 'warning'
      });
      this.cargas_academicas$ = new BehaviorSubject(null);
    }
  }

  obtenerGrupos(): void{
    let id_carga_academica = this.horarioForm.controls['id_academic_load'].value;
    if(id_carga_academica){
      this.grupos$ = this.coordinatorService.getGrupos();
      return
    }else{
      Swal.fire({
        title: 'Advertencia',
        text: 'Seleccione una carrera y/o carga academica',
        icon: 'warning'
      });
    }
  }




}
