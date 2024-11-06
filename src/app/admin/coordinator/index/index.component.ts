import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin-service.service';
import { catchError, Observable } from 'rxjs';
import { TableComponent } from "../../../components/table/table.component";
import { CommonModule } from '@angular/common';
import { Coordinador, columnasCoordinador } from '../../../interfaces/coordinador.interface';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ErrorServidorComponent } from "../../../components/error-servidor/error-servidor.component";
import { Spinner } from 'primeng/spinner';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TableComponent, CommonModule, NgxSpinnerModule, ErrorServidorComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  coordinadoresColumns = columnasCoordinador;
  error: boolean = false;
  adminService: AdminService = inject(AdminService);
  spinner: NgxSpinnerService = inject(NgxSpinnerService);
  public coordinadores$: Observable<any>;

  constructor(){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinner.show();
    setTimeout(
      () => {
        this.obtenerCoordinadores();
      }, 2500
    );
  }

  obtenerCoordinadores(): void{
    this.coordinadores$ = this.adminService.getCoordinadores().pipe(
      catchError( (err: any) =>
        {
          this.error = true;
          throw new Error("Ha ocurrido un error");
        })
    );
  }

  editarCoordinador(coordinador: Coordinador): void{
    this.adminService.patchCoordinador(coordinador).subscribe({
      next: (res: any) => {
        console.log(res);
        if(res.ok){
          Swal.fire({
            title: 'Exito',
            text: 'Editado con exito',
            icon: 'success'
          }).then(
            () => {
              this.obtenerCoordinadores();
            }
          );
        }else{
          Swal.fire({
            title: 'Error',
            text: 'Ah ocurrido un error al intentar editar al coordinador',
            icon: 'error'
          });
        }
      }
    })
  }
}
