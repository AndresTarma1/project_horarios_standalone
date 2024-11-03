import { Component } from '@angular/core';
import { ScheduleComponent } from "../../../components/schedule/schedule.component";
import { NgxSpinnerService } from 'ngx-spinner';
import { TeacherService } from '../../../core/services/teacher.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-horario',
  standalone: true,
  imports: [ScheduleComponent, CommonModule],
  templateUrl: './horario.component.html',
  styleUrl: './horario.component.css'
})
export class HorarioComponent {

  profesor:any;
  hayHorario = false;
  horario: any= [] ;

  constructor(private teacherService: TeacherService, private spinner: NgxSpinnerService){
  }

  ngOnInit(): void {
    this.profesor = JSON.parse(localStorage.getItem('profesor')!);
    this.spinner.show();
    this.teacherHorario();
  }


  teacherHorario(){
    this.teacherService.getHorario(this.profesor.id).subscribe(
      (res: any) => {

        // console.log(res);
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
