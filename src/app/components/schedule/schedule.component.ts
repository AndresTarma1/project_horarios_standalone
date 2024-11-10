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

  @Input() horario: Dia[];
  horarioCompleto: Dia[] = [];

  horas = ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00', '14:00 - 16:00', '14:00 - 18:00'];
  diasCompletos: string[] = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.horarioCompleto = this.completarHorario(this.horario)
    this.horario = this.horarioCompleto;
  }

  completarHorario(horario: Dia[]): Dia[] {
    const horarioCompleto_: Dia[] = [];

    // Agregar los días existentes al nuevo horario
    horario.forEach(dia => {
      horarioCompleto_.push(dia);
    });

    // Agregar los días faltantes con un arreglo vacío de clases
    this.diasCompletos.forEach((dia: any) => {
      if (!horarioCompleto_.find(d => d.dia === dia)) {
        horarioCompleto_.push({
          dia,
          clases: [

          ]
        });
      }
    });

    return horarioCompleto_;
  }

  clasePorHora(clases: any[], hora: string) {
    const [horaInicio] = hora.split(' - ');
    return clases.find(clase => clase['h:i'] === horaInicio + ':00');
  }

}
