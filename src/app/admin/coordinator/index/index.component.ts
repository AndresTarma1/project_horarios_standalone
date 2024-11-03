import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../../core/services/admin-service.service';
import { catchError, Observable } from 'rxjs';
import { TableComponent } from "../../../components/table/table.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [TableComponent, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  columnas: string[] = ["id", "name", "last_name", "phone", "email"];
  error: boolean = false;
  adminService: AdminService = inject(AdminService);
  public coordinadores$: Observable<any>;

  constructor(){

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.coordinadores$ = this.adminService.getCoordinadores().pipe(
      catchError( (err: any) =>
        {
          this.error = true;
          throw new Error("Ha ocurrido un error");
        })
    );
  }
}
