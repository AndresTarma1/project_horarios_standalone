import { Component, inject, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from '../../../../components/schedule/schedule.component';
import { map, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ErrorServidorComponent } from "../../../../components/error-servidor/error-servidor.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, FormsModule, ScheduleComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent implements OnInit {

  public horario$: Observable<any>;
  public grupos$: Observable<any>;

  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  grupo_id: string;

  constructor(private activeRoute: ActivatedRoute) {
    let id_grupo;
    activeRoute.paramMap.subscribe((param: any) => {
      id_grupo = param.id;
    });

    if (id_grupo) {

    } else {

    }
    this.grupos$ = this.coordinadorService.getGrupos();
  }

  buscarHorario() {
    if(!this.grupo_id){
      return;
    }else{
      this.horario$ = this.coordinadorService.getHorario(this.grupo_id);
    }
  }



  ngOnInit(): void {}
}
