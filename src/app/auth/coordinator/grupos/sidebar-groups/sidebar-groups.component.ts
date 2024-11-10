import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Estudiante } from '../../../../interfaces/estudiante.interface';
import { CommonModule } from '@angular/common';
import { NgbModal, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalEditComponent } from '../../../../components/modal-edit/modal-edit.component';

@Component({
  selector: 'app-sidebar-groups',
  standalone: true,
  imports: [CommonModule, NgbPopoverModule],
  templateUrl: './sidebar-groups.component.html',
  styleUrl: './sidebar-groups.component.css'
})
export class SidebarGroupsComponent implements OnInit{

  selectedGrupo: any;
  private modalService: NgbModal = inject(NgbModal);

  @Input() grupos: any[];
  @Output() grupoConEstudiantes: EventEmitter<any> = new EventEmitter<any>();
  campos: {field: string, header: string}[] = [{field: 'id', header: 'ID'}, {field: 'name', header: 'Nombre'}];
  @Output() emitirCambiosGrupo: EventEmitter<any> = new EventEmitter<any>();
  @Output() emitirBorrarGrupo: EventEmitter<any> = new EventEmitter<any>();
  editarGrupo(grupo: any): void{
    const modalRef = this.modalService.open(ModalEditComponent);
    modalRef.componentInstance.grupo = grupo;
    modalRef.componentInstance.campos = this.campos;

    modalRef.closed.subscribe(
      (grupo: any) => {
        if(grupo != undefined){
          if(grupo.delete){
            this.emitirBorrarGrupo.emit(grupo.id);
          }else{
            this.emitirCambiosGrupo.emit(grupo);
          }
        }

      }
    )

  }

  @Output() emitirCrearGrupo: EventEmitter<any> = new EventEmitter<any>();

  CrearGrupo()
  {
    this.emitirCrearGrupo.emit();
  }

  ngOnInit(): void {
  }

  emitirGrupoConEstudiantes(grupo: any){
    this.selectedGrupo = grupo;
    this.grupoConEstudiantes.emit(grupo);
  }
}


