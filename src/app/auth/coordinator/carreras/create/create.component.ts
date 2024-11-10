import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbCollapseModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  isCollapsed = true;
  private coordinadorService: CoordinadorService = inject(CoordinadorService);

  carreraForm: FormGroup;
  cargaAcademicaForm: FormGroup;
  asignaturasForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.carreraForm = fb.group({
      name: ['', Validators.required],
      cargasAcademicas: fb.array([], Validators.required),
    });

    this.cargaAcademicaForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  obtenerCargasAcademicas() {
    return this.carreraForm.controls['cargasAcademicas'];
  }

  agregarCargaAcademica() {
    const cargasAcademicasCarreraForm = this.carreraForm.get(
      'cargasAcademicas'
    ) as FormArray;

    const nuevaCarga: FormGroup = this.fb.group({
      name: this.cargaAcademicaForm.get('name')?.value,
      description: this.cargaAcademicaForm.get('description')?.value,
    });

    cargasAcademicasCarreraForm.push(nuevaCarga);

    this.cargaAcademicaForm.patchValue({
      name: '',
      description: '',
    });
  }

  ngOnInit(): void {
  }

  crearCarrera(): void{
    console.log(this.carreraForm.value);
    this.coordinadorService;

    this.carreraForm.patchValue({
      name: '',
    });
    this.carreraForm.removeControl('cargasAcademicas');
    this.carreraForm.addControl('cargasAcademicas', this.fb.array([], Validators.required));
  }
}
