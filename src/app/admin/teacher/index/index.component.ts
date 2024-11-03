import { Component, inject, OnInit } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AdminService } from '../../../core/services/admin-service.service';
import { CommonModule } from '@angular/common';
import { TableComponent } from "../../../components/table/table.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, TableComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  public profesores$: Observable<any>;
  private adminService = inject(AdminService);
  public error: boolean = false;
  public columnas: string[] = ["Id", "Nombres", "Apellidos", "Telefono", "email"];
  constructor(){

  }

  ngOnInit(): void {
    this.profesores$ = this.adminService.getProfesores().pipe(
      catchError( (err: any) => {
        this.error = true;
        throw new Error(err.msg);
      })
    );

  }

}
