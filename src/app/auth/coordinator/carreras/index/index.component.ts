import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ErrorServidorComponent } from "../../../../components/error-servidor/error-servidor.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CargasAcademicasModalComponent } from './cargas-academicas-modal/cargas-academicas-modal.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ErrorServidorComponent, NgxSpinnerModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  carreras$: Observable<any>;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal){

  }

  openModalAcademico(carrera: any){
    const modalRef = this.modalService.open(CargasAcademicasModalComponent);
    modalRef.componentInstance.cargasAcademicas = carrera.academic_loads;
    modalRef.componentInstance.carrera = carrera.name;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerCarreras();
  }

  error: boolean = false;
  obtenerCarreras(): void{
    this.carreras$ = this.coordinadorService.getCarreras().pipe(
      catchError ( (err: any) => {
        this.error = true;
        throw new Error('Ah ocurrido un error dentro del servidor');
      })
    );
  }
}
