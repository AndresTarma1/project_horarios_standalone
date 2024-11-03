import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent {

  estudiante: any;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.estudiante = JSON.parse(localStorage.getItem('estudiante')!);
  }

  logout(){
    localStorage.removeItem('estudiante');
    this.router.navigateByUrl('login/student');
  }
}
