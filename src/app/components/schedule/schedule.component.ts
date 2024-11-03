import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

  @Input() horario: any;

  horas = ['08:00 - 10:00', '10:00 - 12:00', '12:00 - 14:00'];

  clasePorHora(clases: any[], hora: string) {
    const [horaInicio] = hora.split(' - ');
    return clases.find(clase => clase['h:i'] === horaInicio + ':00');
  }

}
