import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { map, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index-v2',
  standalone: true,
  imports: [NgbAccordionModule, NgxPaginationModule, CommonModule],
  templateUrl: './index-v2.component.html',
  styleUrl: './index-v2.component.css'
})
export class IndexV2Component implements OnInit {

  carreras$: Observable<any>;
  cargasAcademicas$: Observable<any>;
  selectedCarrera: { id: number | null , name?: string } = { id: null};

  ngOnInit(): void {
    this.carreras$ = this.coordinadorService.getCarreras();
  }

  constructor(private coordinadorService: CoordinadorService){

  }

  carreraSeleccionada(carrera: any): void{

    if(carrera.id === this.selectedCarrera.id){
      this.selectedCarrera = {id: null};
      return;
    }

    this.selectedCarrera.id = carrera.id;
    this.selectedCarrera.name = carrera.name;
    this.buscarCargasAcademicas();
  }

  buscarCargasAcademicas(): void{
    this.cargasAcademicas$ = this.coordinadorService.getCargasAcademicasCarrera(this.selectedCarrera.id!).pipe(
      map ( (res: any) => {
        res.cargas.forEach((element: any) => {
          this.coordinadorService.getAsignaturasCargaAcademica(element.id).subscribe(
            (res_v2: any) => { element.asignaturas = res_v2.subjects}
          );
        });
        return res;
      })
    );
  }



}
