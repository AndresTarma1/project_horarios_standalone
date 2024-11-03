import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { AdminService } from '../../../core/services/admin-service.service';
import { TableComponent } from "../../../components/table/table.component";
import { NgxSpinner, NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [AsyncPipe, CommonModule, TableComponent, NgxSpinnerModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  public estudiantes$: Observable<any>;
  public columnas: string[] = ["ID", "nombre", "apellido", "email", "telefono"];
  adminService: AdminService = inject(AdminService);
  error: boolean = false;

  constructor(){

  }

  ngOnInit(): void {
    this.estudiantes$ = this.adminService.getEstudiantes().pipe(
      catchError ((err: any) => {
        this.error = true;
        throw new Error("Ah ocurrido un error en el servidor");
      })
    );
  }



}
