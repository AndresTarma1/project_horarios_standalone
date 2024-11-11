import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ErrorServidorComponent } from "../../../../components/error-servidor/error-servidor.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbCollapseModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CargasAcademicasModalComponent } from './cargas-academicas-modal/cargas-academicas-modal.component';
import Swal from 'sweetalert2';
import { AsignarMateriasModalComponent } from './asignar-materias-modal/asignar-materias-modal.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ErrorServidorComponent, NgxSpinnerModule, NgbCollapseModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  carreras$: Observable<any>;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  constructor(private spinner: NgxSpinnerService, private modalService: NgbModal){

  }

  ngOnInit(): void {
    this.spinner.show();
    this.obtenerCarreras();
  }

  cambio: boolean= false;
  error: boolean = false;
  obtenerCarreras(): void{
    this.cambio = false;
    this.carreras$ = this.coordinadorService.getCarreras().pipe(
      catchError ( (err: any) => {
        this.error = true;
        throw new Error('Ah ocurrido un error dentro del servidor');
      })
    );
  }

  openModalMaterias(carga: any){
    const modalref = this.modalService.open(AsignarMateriasModalComponent);
    modalref.componentInstance.cargaAcademica = carga;
    modalref.closed.subscribe(
      (res: any) => {
        if(res != undefined){
          this.coordinadorService.postAsignaturasCargaAcademica(res).subscribe(
            (response: any) => {
              if(response.ok){
                Swal.fire({
                  title: 'Exito',
                  text: 'La asignatura ha sido agregada correctamente',
                  icon: 'success'
                }).then(
                  () => {
                    this.recargarCargaSeleccionada(res.carga);
                  }
                )
              }else{
                Swal.fire({
                  title: 'Error',
                  text: `${res.msg}`,
                  icon: 'warning'
                })
              }
            }
          )
        }
      }
    )
  }

  isCollapse: boolean[];

  carreraSeleccionada: any = null;
  mostrarDetalle: boolean = false;
  openModalAcademico(carrera: any) {
    this.mostrarDetalle = true;
    this.carreraSeleccionada = carrera;
    this.isCollapse = new Array(this.carreraSeleccionada.academic_loads?.length || 0).fill(true);
  }

  toggleCollapse(index: number) {
    this.isCollapse[index] = !this.isCollapse[index];
  }

  // Método para regresar a la vista general de carreras
  regresar() {
    if(this.cambio){
      this.obtenerCarreras();
    }
    this.mostrarDetalle = false;
    this.carreraSeleccionada = null;
  }

  crearCargaAcademica(carrera: any){
    const modalref =this.modalService.open(CargasAcademicasModalComponent);
    modalref.componentInstance.carrera = carrera;

    modalref.closed.subscribe(
      (cargaAcademica: any) => {
        if(cargaAcademica != undefined){
          this.coordinadorService.postCargaAcademica(cargaAcademica).subscribe(
            (res: any) => {
              if(res.ok){
                Swal.fire({
                  title: 'Exito',
                  text: 'Carga academica agregada con exito',
                  icon: 'success'
                }).then(
                  () => {
                    this.recargarCargaSeleccionada(cargaAcademica);
                  }
                )
              }else{
                Swal.fire({
                  title: 'Error',
                  text: 'Carga academica no se ha podido agregar.',
                  icon: 'error'
                })
              }
            }
          )
        }
      }
    )
  }

  eliminarCarrera(carrera: any) {
    Swal.fire({
      title: `¿Estás seguro de eliminar la carrera "${carrera.name}"?`,
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coordinadorService.deleteCarrera(carrera.id).subscribe(
          (res: any) => {
            if(res.ok){
              Swal.fire(
                'Eliminado',
                `La carrera "${carrera.name}" ha sido eliminada exitosamente.`,
                'success'
              ).then( () => { this.obtenerCarreras(); });
            }else{
              Swal.fire(
                'Error',
                `La carrera "${carrera.name}" no ha sido eliminada.`,
                'error'
              );
            }
          }
        )
      }
    });
  }

  eliminarCargaAcademica(carga: any){
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¿Quieres eliminar la carga académica "${carga.name}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coordinadorService.deleteCargaAcademica(carga.id).subscribe({
          next: (res: any) => {

            if(res.ok){
              Swal.fire(
                'Eliminado!',
                `La carga académica "${carga.name}" ha sido eliminada.`,
                'success'
              ).then(
                () => {
                  this.recargarCargaSeleccionada(carga);
                }
              );
            }else{
              Swal.fire(
                'Error',
                `La carga "${carga.name}" no ha sido eliminada.`,
                'error'
              );
            }

          }
        })
      }
    }
    )
  }

  recargarCargaSeleccionada(carga: any): void{
    this.coordinadorService.getCarrera(carga.id_career).subscribe(
      (res: any) => {
        this.cambio = true;
        this.carreraSeleccionada = res.data;
        this.isCollapse = new Array(this.carreraSeleccionada.academic_loads?.length || 0).fill(true);
      }
    );
  }

}
