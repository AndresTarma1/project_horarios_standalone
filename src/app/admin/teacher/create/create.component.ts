import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../../core/services/admin-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {

  teacherForm: FormGroup;

  private adminService: AdminService = inject(AdminService);

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      last_name: ['', [Validators.required, Validators.minLength(2)]],
      identify: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      specialty: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.teacherForm.valid) {
      console.log('Formulario enviado:', this.teacherForm.value);
      this.adminService.postProfesor(this.teacherForm.value).subscribe(
        (res: any) => {
          if(res.ok){
            Swal.fire({
              icon: 'success',
              title: 'Correcto',
              text: `El profesor se ha creado correctamente`
            });
          }else{
            Swal.fire({
              icon: 'info',
              title: 'Error',
              text: `Ah ocurrido un error al crearlo`
            });
        }
        }
      );


    } else {
      Swal.fire(
        {
          title: 'Precaucion',
          text: 'Debe completar todos los campos',
          icon: 'warning'
        }
      )
    }
  }

}
