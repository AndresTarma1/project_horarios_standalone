import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {

  constructor(private router: Router){}

  logout(){
    localStorage.removeItem('profesor');
    this.router.navigateByUrl('page');
  }
}
