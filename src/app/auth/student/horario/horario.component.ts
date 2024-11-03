import { Component } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { StudentService } from '../../../core/services/student.service';
import { CommonModule } from '@angular/common';
import { ScheduleComponent } from "../../../components/schedule/schedule.component";

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  standalone: true,
  imports: [CommonModule, ScheduleComponent],
  styleUrl: './horario.component.scss'
})
export class HorarioComponent {
  estudiante:any = {};
  hayHorario = false;
  horario: any= [] ;

  constructor(private studentService: StudentService, private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.estudiante = JSON.parse(localStorage.getItem('estudiante')!);
    this.spinner.show();
    this.estudianteHorario();
  }


  estudianteHorario(){
    this.studentService.getHorario(this.estudiante.id).subscribe(
      (res: any) => {
        if(res.ok){
          this.hayHorario = true;
          this.horario = res.horario
        }else{
          this.hayHorario = false;
        }
        this.spinner.hide();
      }
    );
  }
}
