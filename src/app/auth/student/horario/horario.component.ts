import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from "../../../components/schedule/schedule.component";
import { delay, map, Observable, retry } from 'rxjs';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  standalone: true,
  imports: [CommonModule, ScheduleComponent],
  styleUrl: './horario.component.scss'
})
export class HorarioComponent {
  estudiante:any = {};

  horario$: Observable<any>;
  constructor(private studentService: StudentService, private spinner: NgxSpinnerService){

  }


  ngOnInit(): void {
    this.estudiante = JSON.parse(localStorage.getItem('estudiante')!);
    this.estudianteHorario();
  }

  estudianteHorario(){
    this.horario$ = this.studentService.getHorario(this.estudiante.id).pipe(
      retry({delay: 4000}),
      map( (res: any) => {
        console.log(res);
        if(!res.horario){
          res.horario = [];
        }
        return res;
      })
    );
  }
}
