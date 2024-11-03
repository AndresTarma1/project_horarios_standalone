import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import Swal from 'sweetalert2';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  cargasAcademicas$: Observable<any>;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.cargasAcademicas$ = this.coordinadorService.getCargaAcademicas();
  }

  eliminarCargaAcademica(id: number) {
    // Lógica para eliminar la carga académica
    console.log('Eliminando carga académica con ID:', id);
    this.coordinadorService.deleteCargaAcademica(id).subscribe(
      (res: any) => {
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Eliminada correctamente',
            icon: 'success'
          });
          this.cargasAcademicas$ = this.coordinadorService.getCargaAcademicas();
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Eliminacion erronea',
            icon: 'warning'
          });
        }
      }
    );
  }

  verAsignaturas(id: number) {
    // Lógica para redirigir a la pantalla de asignación de materias
    console.log('Asignando materias a carga académica con ID:', id);
    this.router.navigateByUrl(`/coordinator/academic_load/asignaturas/${id}`);
  }

}
