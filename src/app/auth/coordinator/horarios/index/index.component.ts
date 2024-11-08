import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from "../../../../components/schedule/schedule.component";
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, ScheduleComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements OnInit {

  horas = ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00'];
  grupos: any[];
  grupo: number;
  public horario$: Observable<any>;
  disableBuscarHorario: boolean = true;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  clasePorHora(clases: any[], hora: string) {
    const [horaInicio] = hora.split(' - ');
    return clases.find(clase => clase['h:i'] === horaInicio + ':00');
  }

  onChange(event: any){
    this.grupo = event.target.value;
    console.log(this.grupo);
    this.disableBuscarHorario = false;
  }

  constructor(private activeRoute: ActivatedRoute){

    let id_grupo;
    activeRoute.paramMap.subscribe(
      (param: any) => { id_grupo = param.id}
    );

    if(id_grupo){
      console.log('Si hay ', id_grupo)
    }else{
      console.log('no hay ', id_grupo)
    }

    this.coordinadorService.getGrupos().subscribe(
      (res: any) => {
        this.grupos = res.groups;
      }
    );
  }

  buscarHorario(){
    this.horario$ =  this.coordinadorService.getHorario(this.grupo).pipe(
      map ( (res: any) => {
        if(!res.ok){
          Swal.fire({
            title: 'Error',
            text: 'Este grupo no contiene horarios',
            icon: 'warning'
          });
        }
        return res;
      })
    );

  }


  ngOnInit(): void {
  }
}
