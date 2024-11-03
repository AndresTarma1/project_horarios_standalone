import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoginService } from '../../../core/services/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './student-login.component.html',
  styleUrl: './student-login.component.css'
})
export default class StudentLoginComponent {

  studentLogin: FormGroup = this.fb.group({
    email: ['', Validators.email],
    password: ['', Validators.required]
  });


  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router){

  }

  loginStudent(){
    console.log(this.studentLogin.value);

    if(this.studentLogin.invalid){
      return;
    }
    this.loginService.loginEstudiante(this.studentLogin.value).subscribe(
      (res: any) => {
        console.log(res);
        if(res.ok){
          localStorage.setItem('estudiante', JSON.stringify(res.student));
          this.router.navigateByUrl('student');
        }else{
          Swal.fire({
            title: 'Error',
            text: `${res.msg}`,
            icon: 'info'
          })
        }
      }
    );
  }
}
