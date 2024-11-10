import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ErrorServidorComponent } from "../../../../components/error-servidor/error-servidor.component";
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { NgbCollapseModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { CargasAcademicasModalComponent } from './cargas-academicas-modal/cargas-academicas-modal.component';
import Swal from 'sweetalert2';

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

  error: boolean = false;
  obtenerCarreras(): void{
    this.carreras$ = this.coordinadorService.getCarreras().pipe(
      catchError ( (err: any) => {
        this.error = true;
        throw new Error('Ah ocurrido un error dentro del servidor');
      })
    );
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
    this.mostrarDetalle = false;
    this.carreraSeleccionada = null;
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

  }

}
