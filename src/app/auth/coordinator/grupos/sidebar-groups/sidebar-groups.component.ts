import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Estudiante } from '../../../../interfaces/estudiante.interface';

@Component({
  selector: 'app-sidebar-groups',
  standalone: true,
  imports: [],
  templateUrl: './sidebar-groups.component.html',
  styleUrl: './sidebar-groups.component.css'
})
export class SidebarGroupsComponent {

  @Input() grupos: any[];
  @Output() EstudiantesLista: EventEmitter<any> = new EventEmitter<any>();

  emitirGrupo(grupo: any){
    this.EstudiantesLista.emit(grupo);
  }
}
