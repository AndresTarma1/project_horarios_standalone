import { Component, OnInit } from '@angular/core';
import { NgbAccordionModule, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { map, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { CargasAcademicasModalComponent } from './cargas-academicas-modal/cargas-academicas-modal.component';
import Swal from 'sweetalert2';
import { add } from 'ngx-bootstrap/chronos';
import { AsignarMateriasModalComponent } from './asignar-materias-modal/asignar-materias-modal.component';

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

  constructor(private coordinadorService: CoordinadorService, private modalService: NgbModal){

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
            (res_v2: any) => {
              element.asignaturas = res_v2.subjects
            }
          );
        });
        return res;
      })
    );
  }

  openAddCargaAcademica(): void{
    const modalref = this.modalService.open(CargasAcademicasModalComponent);
    modalref.componentInstance.carrera = this.selectedCarrera;
    modalref.closed.subscribe( (res: any) => {
      if(res != undefined){
        this.addCargaAcademica(res);
      }
    });
  }

  addCargaAcademica(credenciales: any): void{
    this.coordinadorService.postCargaAcademica(credenciales).subscribe(
      (res: any) => {
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Carga academica creada con exito',
            icon: 'success'
          }).then( () => {
            this.buscarCargasAcademicas();
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: 'La carga academica no se ha podido crear',
            icon: 'warning'
          });
        }
      }
    );
  }

  openModalAsignatura(cargaAcademica: any): void{
    const modalref = this.modalService.open(AsignarMateriasModalComponent);
    modalref.componentInstance.cargaAcademica = cargaAcademica;
    modalref.closed.subscribe( (res: any) => {
      if(res != undefined){
        this.addAsignatura(res);
      }
    })
  }

  addAsignatura(datos: any): void{
    this.coordinadorService.postAsignaturasCargaAcademica(datos).subscribe(
      (res: any) => {
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Asignatura creada con exito',
            icon: 'success'
          }).then( () => {
            this.buscarCargasAcademicas();
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: 'No se ha podido añadir la asignatura',
            icon: 'warning'
          });
        }
      }
    )
  }

  deleteAsignatura(cargaAcademica: any, asignatura: any): void{
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esta acción eliminará ${asignatura.name} de la carga academica ${cargaAcademica.name}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        let credenciales: any = {};
        credenciales.id_subject = asignatura.id;
        credenciales.id_academic_load = cargaAcademica.id;

        console.log(credenciales);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        console.log('Acción cancelada');
      }
    });

  }


}
