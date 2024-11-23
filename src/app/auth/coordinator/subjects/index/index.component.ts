import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, retry } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { RouterModule } from '@angular/router';
import { EditModalComponent } from './edit-modal/edit-modal.component';
import Swal from 'sweetalert2';

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

  constructor(private coordinadorService: CoordinadorService, private modalService: NgbModal){
  }

  ngOnInit(): void {

    this.obtenerAsignatura();

  }

  obtenerAsignatura(): void{

    this.asignaturas$ = this.coordinadorService.getAsignaturas().pipe(
      retry({delay: 4000}),
    );
  }

  total(asignaturas_object: any): number{
    this.tamañoAsignaturas = asignaturas_object.subjects.length;

    return this.tamañoAsignaturas;
  }

  buscarInformacionAsignatura(id_subject: number): void{

    if(this.botonSeleccionado == id_subject){
      this.botonSeleccionado = null;
      this.asignaturasPertenecientes$ = new BehaviorSubject(null);
      return;
    }

    this.botonSeleccionado = id_subject;
    this.asignaturasPertenecientes$ = this.coordinadorService.getProfesoresConCargaAcademica(id_subject).pipe(
      retry({delay: 4000}),
    );
  }

  openModalEdit(asignatura: any): void{
    const modalref = this.modalService.open(EditModalComponent);
    modalref.componentInstance.asignatura = asignatura;

    modalref.componentInstance.updateAsignatura.subscribe( (res: any) => {
      this.coordinadorService.putAsignatura(res).subscribe(
        (res: any) => {
          if(res.ok){
            Swal.fire({
              title: 'Exito',
              text: 'Asignatura modificada con exito',
              icon: 'success'
            }).then(
              () => this.obtenerAsignatura()
            )
          }else{
            Swal.fire({
              title: 'Error',
              text: 'Ah ocurrido un error al intentar modificar la asignatura',
              icon: 'warning'
            })
          }
        }
      )
    });

    modalref.componentInstance.deleteAsignatura.subscribe( (asignatura: any) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: `Esta acción eliminará la asignatura ${asignatura.name}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.coordinadorService.deleteAsignatura(asignatura.id).subscribe(
            (res: any) => {
              if(res.ok){
                Swal.fire({
                  title: 'Exito',
                  text: 'La asignatura fue eliminada con exito.',
                  icon: 'success'
                }).then(
                  () => {
                    this.obtenerAsignatura();
                  }
                )
              }else{
                Swal.fire({
                  title: 'Error',
                  text: 'La asignatura no se ha podido',
                  icon: 'error'
                });
              }
            }
          );
        }
      });
    });

  }
}
