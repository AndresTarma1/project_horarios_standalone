import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';


interface Dia {
  dia: string;
  clases: {
    id: number;
    name: string;
    "h:i": string;
    "h:f": string;
  }[];
}
@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit {

  @Input() horario: any;
  horarioTransformado_ : any;

  ngOnInit(): void {
    this.horarioTransformado_ = this.transformarHorario(this.horario);
  }

  transformarHorario(horario: any): any {
    const horarioTransformado : any = {
      lunes: ['', '', '', '', ''],
      martes: ['', '', '', '', ''],
      miercoles: ['', '', '', '', ''],
      jueves: ['', '', '', '', ''],
      viernes: ['', '', '', '', ''],
      sabado: ['', '', '', '', '']
    };

    horario.forEach((dia: any) => {
      dia.clases.forEach((clase: any) => {
        const horaInicio = clase["h:i"];
        const indiceHora = this.obtenerIndiceHora(horaInicio);

        if (indiceHora !== -1) {
          horarioTransformado[dia.dia][indiceHora] = clase.name;
        }
      });
    });

    return horarioTransformado;
  }

  obtenerIndiceHora(horaInicio: string): number {
    const horas: any = {
      "08:00:00": 0,
      "10:00:00": 1,
      "12:00:00": 2,
      "14:00:00": 3,
      "16:00:00": 4
    };

    return horas[horaInicio] !== undefined ? horas[horaInicio] : -1;
  }


}
