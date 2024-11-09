import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { Estudiante } from '../../../../interfaces/estudiante.interface';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModal, NgbPopover, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { ModalAddStudentGroupComponent } from '../modal-add-student-group/modal-add-student-group.component';

@Component({
  selector: 'app-students-list-group',
  standalone: true,
  imports: [CommonModule, FormsModule, NgbPopoverModule, ],
  templateUrl: './students-list-group.component.html',
  styleUrl: './students-list-group.component.css',
})
export class StudentsListGroupComponent implements OnInit {

  private modalService = inject(NgbModal);

  addEstudiantesGrupo(): void{

    const modalRef = this.modalService.open(ModalAddStudentGroupComponent);
    modalRef.componentInstance.grupo =  this.grupo;

    modalRef.result.then(
      (resultado: any) => {
        if(resultado){
          this.cambios.emit(true);
        }
      }
    )
  }

  @Output() cambios: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() grupo: any;

  @Input() estudiantes: any;
  coordinadorService: CoordinadorService = inject(CoordinadorService);
  unFiltro: Estudiante[];
  inputFiltro: string = '';
  @Output() quitarGrupo: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  ngOnInit(): void {
    if (this.estudiantes) {
      this.estudiantes.forEach((estudiante: Estudiante) => {
        estudiante.name_completo = estudiante.name + ' ' + estudiante.last_name;
      });
      this.unFiltro = [...this.estudiantes];
    }
  }

  buscarFiltro() {
    if (this.inputFiltro) {
      this.estudiantes = this.unFiltro.filter((estudiantes: Estudiante) => {
        return estudiantes
          .name_completo!.toLowerCase()
          .includes(this.inputFiltro.toLowerCase());
      });
    } else {
      this.estudiantes = this.unFiltro;
    }
  }

  quitarGrupoEstudiante(estudiante: any){
    Swal.fire({
      title: 'Seguro?',
      text: `Estas seguro de quitar el grupo al estudiante ${estudiante.name} \n
      de codigo ${estudiante.id}...?`,
      icon: 'warning',
      confirmButtonText: 'Eliminar del grupo',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.quitarGrupo.emit(estudiante);
      }
    });
  }
}
