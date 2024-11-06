import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, output, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { Coordinador } from '../../interfaces/coordinador.interface';
import { NgxPaginationModule } from 'ngx-pagination';
import { StarIcon } from 'primeng/icons/star';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../core/services/admin-service.service';



@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements OnInit {

  @Input() columns: {field: string, header: string}[] = [];
  @Input() datos: any[] = [];
  @Output() userDelete: EventEmitter<any> = new EventEmitter<any>();
  @Output() userEdit: EventEmitter<any> = new EventEmitter<any>();
  editMode: boolean = true;

  unFilter: any[];
  p: number = 1;

  nameFiltro: string;
  filtro(event: any){
    this.nameFiltro = event.target.value;
  }

  saveUser(usuario: any) {
    this.userEdit.emit(usuario);
  }

  constructor(){

  }

  total(): number{
    return this.datos.length;
  }

  ngOnInit(): void {
    this.unFilter = this.datos;
    this.nameFiltro = 'all';
  }

  filtroInput: string = '';
  buscarPorFiltro(){
    if(!this.filtroInput){
      this.datos = this.unFilter;
      return;
    }
    if(this.nameFiltro == 'all'){
      console.log("UWU");

      this.datos = this.unFilter.filter(
        item => Object.values(item).some(
          (value: any) =>
          {return value.toString().toLowerCase().includes(this.filtroInput);}
        )
      );
    }

    this.datos = this.unFilter.filter(
      (user: any) => {
        return user[this.nameFiltro].toLowerCase().startsWith(this.filtroInput.toLowerCase());
      }
    )

  }



  deleteUser(user: any): void{
    Swal.fire({
      title: "Estas seguro?",
      text: `Vas a borrar a ${user.name} ${user.last_name}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {


        Swal.fire({
          title: "Eliminado!",
          text: `${user.name} eliminado exitosamente!`,
          icon: "success"
        });
      }
    });
  }


}
