import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cargas-academicas-modal',
  standalone: true,
  imports: [CommonModule, NgbCollapseModule],
  templateUrl: './cargas-academicas-modal.component.html',
  styleUrl: './cargas-academicas-modal.component.css'
})
export class CargasAcademicasModalComponent {

  @Input() cargasAcademicas: any[];
  @Input() carrera: string;

  // Arreglo para guardar el estado de colapso (true = colapsado, false = expandido)
  isCollapsed: boolean[] = [];

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    // Inicializa isCollapsed con false para cada cargaAcademica
    this.isCollapsed = new Array(this.cargasAcademicas?.length || 0).fill(true);
  }

  toggleCollapse(index: number) {
    this.isCollapsed[index] = !this.isCollapsed[index];
  }

}
