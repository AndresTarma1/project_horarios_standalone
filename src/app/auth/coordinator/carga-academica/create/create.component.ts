import { Component, inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CoordinadorService } from '../../../../core/services/coordinador.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit{

  cargaAcademicaForm: FormGroup;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  constructor(private fb: FormBuilder) {
    this.cargaAcademicaForm = this.fb.group({
      name: ['', Validators.required],
      description: ['',Validators.required],
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.cargaAcademicaForm.valid) {
      this.coordinadorService.postCargaAcademica(this.cargaAcademicaForm.value).subscribe(
        (res: any) => {
          if(res.ok){
            Swal.fire({
              title: 'Exito',
              icon: 'success',
              text: 'Carga academica creada con exito'
            });
            this.cargaAcademicaForm.reset();
          }else{
            Swal.fire({
              title: 'Error',
              icon: 'warning',
              text: 'Ha ocurrido un error, intentelo nuevamente'
            });
          }
        }
      );
    }else{
      Swal.fire({
        title: 'Error',
        text: 'Debes ingresar todos los datos para poder crear la carga academica',
        icon: 'warning'
      });
    }
  }
}
