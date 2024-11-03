import { Component, inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { AdminService } from '../../../core/services/admin-service.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  studenForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    identify : ['', [Validators.required]]
  });

  private adminService: AdminService = inject(AdminService);
  constructor(private fb: FormBuilder){
  }

  onSubmit(){
    this.adminService.postEstudiante(this.studenForm.value).subscribe(
      (res: any) => {
        Swal.fire({
          title: 'Creado Correctamente',
          text: `El estudiante ${this.studenForm.controls['name'].value} ha sido creado correctamente`,
          icon: 'success'
        });
        this.studenForm.reset();
      }
    );
  }
}
