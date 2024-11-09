import { Component, inject } from '@angular/core';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { catchError, ignoreElements, map, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ErrorServidorComponent } from '../../../../components/error-servidor/error-servidor.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Estudiante } from '../../../../interfaces/estudiante.interface';
import { StudentsListGroupComponent } from '../students-list-group/students-list-group.component';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { SidebarGroupsComponent } from "../sidebar-groups/sidebar-groups.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FormsModule,
    NgbAccordionModule,
    CommonModule,
    ErrorServidorComponent,
    NgxSpinnerModule,
    StudentsListGroupComponent,
    SidebarGroupsComponent
],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  private coordinadorService: CoordinadorService = inject(CoordinadorService);
  public grupos$: Observable<any>;
  grupo: any = [];
  error = false;

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinner.show();
    this.obtenerEstudiantesPorGrupo();
  }

  obtenerEstudiantes(grupo: any){
    console.log(grupo);
    this.grupo = grupo;
  }

  obtenerEstudiantesPorGrupo() {
    this.grupos$ = this.coordinadorService.getGruposConEstudiantes().pipe(
      catchError((err) => {
        this.error = true;
        throw new Error('Ah ocurrido un error en el servidor');
      })
    );
  }


  eliminarEstudianteDelGrupo(estudiante: any) {
    this.coordinadorService
      .patchQuitarEstudianteDeGrupo(estudiante.id)
      .subscribe((res: any) => {
        if (res.ok) {
          Swal.fire({
            title: 'Degradacion correcta',
            text: `El estudiante ${estudiante.name} ha sido quitado del grupo exitosamente.`,
            icon: 'success',
          }).then(() => {
            this.obtenerEstudiantesPorGrupo();
          });
        }else{
          Swal.fire({
            title: 'Error',
            text: `El estudiante ${estudiante.name} no se ha logrado quitar del grupo`,
            icon: 'error',
          })
        }
      });
  }

}