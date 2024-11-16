import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit{

  asignaturas$: Observable<any>;
  asignaturasPertenecientes$: Observable<any>;

  p: number = 1;
  tamañoAsignaturas: number = 0;
  botonSeleccionado: number | null = null;

  constructor(private coordinadorService: CoordinadorService){


  }

  ngOnInit(): void {

    this.asignaturas$ = this.coordinadorService.getAsignaturas();

  }

  total(asignaturas_object: any): number{
    this.tamañoAsignaturas = asignaturas_object.subjects.length;

    return this.tamañoAsignaturas;
  }

  buscarInformacionAsignatura(id_subject: number): void{
    this.botonSeleccionado = id_subject;

    this.asignaturasPertenecientes$ = this.coordinadorService.getProfesoresConCargaAcademica(id_subject);
  }
}
