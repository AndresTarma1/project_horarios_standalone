import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignaturas',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './asignaturas.component.html',
  styleUrl: './asignaturas.component.css'
})
export class AsignaturasComponent implements OnInit {

  private id_CargaAcademica: number;
  public asignaturasCargaAcademica$: Observable<any>;
  public asignaturas$: Observable<any>;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);
  error: boolean = false;

  constructor(private activeRoute: ActivatedRoute) {
    this.id_CargaAcademica = parseInt(this.activeRoute.snapshot.paramMap.get('id')!);
  }

  ngOnInit(): void {
    this.asignaturasCargaAcademica$ = this.coordinadorService.getAsignaturasCargaAcademica(this.id_CargaAcademica).pipe
      (
        catchError((err: any) => {
          this.error = true;
          throw new Error('Ha ocurrido un error');
        })
      );

    this.asignaturas$ = this.coordinadorService.getAsignaturas();
  }

  selectedSubjects: string[] = [];
  maxSelection = 6;

  toggleSelection(subject: string) {
    const index = this.selectedSubjects.indexOf(subject);
    if (index > -1) {
      this.selectedSubjects.splice(index, 1);
    } else if (this.selectedSubjects.length < this.maxSelection) {
      this.selectedSubjects.push(subject);
    }
  }

  assignSubjects() {
    if (this.selectedSubjects.length > 0) {
      this.coordinadorService.postAsignaturasCargaAcademica(this.id_CargaAcademica, this.selectedSubjects).subscribe(
        (res: any) => {
          if (res.ok) {
            Swal.fire({
              title: 'Exito',
              text: 'Añadidas con exito',
              icon: 'success'
            });
            this.asignaturasCargaAcademica$ = this.coordinadorService.getAsignaturasCargaAcademica(this.id_CargaAcademica);
          } else {
            Swal.fire({
              title: 'Error',
              text: 'Ha ocurrido un error al tratar de añadir las asignaturas',
              icon: 'error'
            });
          }

        })
    } else {
      alert('Por favor, selecciona al menos una asignatura.');
    }
  }


}
