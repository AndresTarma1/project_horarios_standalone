import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminService } from '../../../core/services/admin-service.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../../components/table/table.component";
import { columnasProfesor, Profesor } from '../../../interfaces/profesor.interface';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ErrorServidorComponent } from "../../../components/error-servidor/error-servidor.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, TableComponent, NgxSpinnerModule, ErrorServidorComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  public profesores$: Observable<any>;
  private adminService = inject(AdminService);
  private spinner: NgxSpinnerService = inject(NgxSpinnerService);
  public error: boolean = false;
  public columnas: {field: string, header: string}[] = columnasProfesor;

  constructor(){

  }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout( () => {
      this.obtenerProfesores()
    }, 2500);
  }

  obtenerProfesores(): void{
    this.profesores$ = this.adminService.getProfesores().pipe(
      catchError( (err: any) => {
        this.error = true;
        throw new Error(err.msg);
      })
    )
  }

  editarProfesor(profesor: Profesor): void{
    this.adminService.patchProfesor(profesor).subscribe({
      next: (res: any) => {
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Editado con exito',
            icon: 'success'
          }).then(
            () => {
              this.obtenerProfesores();
            }
          );
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Ah ocurrido un error al intentar editar al profesor',
            icon: 'error'
          });
        }
      }
    });
  }

}
