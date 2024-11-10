import { Component, inject, Input } from '@angular/core';
import {
  NgbAccordionModule,
  NgbActiveModal,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import { catchError, Observable } from 'rxjs';
import { CoordinadorService } from '../../../../core/services/coordinador.service';
import { CommonModule } from '@angular/common';
import { ErrorServidorComponent } from '../../../../components/error-servidor/error-servidor.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { StudentsListGroupComponent } from '../students-list-group/students-list-group.component';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SidebarGroupsComponent } from '../sidebar-groups/sidebar-groups.component';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    FormsModule,
    NgbAccordionModule,
    CommonModule,
    ErrorServidorComponent,
    NgxSpinnerModule,
    StudentsListGroupComponent,
    SidebarGroupsComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  private coordinadorService: CoordinadorService = inject(CoordinadorService);
  public grupos$: Observable<any>;
  grupo: any = [];
  error = false;

  constructor(
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.spinner.show();
    this.obtenerEstudiantesPorGrupo();
  }

  obtenerEstudiantes(grupo: any) {
    this.grupo = grupo;
  }

  cambiosEmitidos(event: any) {
    this.obtenerEstudiantesPorGrupo();
  }

  obtenerCambios(grupo: any) {
    this.coordinadorService.putGrupos(grupo).subscribe((res: any) => {
      if (res.ok) {
        Swal.fire({
          title: 'Exito',
          text: `El grupo ${grupo.name} ha sido editado correctamente`,
          icon: 'success',
        }).then(() => {
          this.obtenerEstudiantesPorGrupo();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: `El grupo ${grupo.name} no se ha podido editar`,
          icon: 'error',
        });
      }
    });
  }

  eliminarGrupo(grupo: string) {
    this.coordinadorService.deleteGrupo(grupo).subscribe((res: any) => {
      if (res.ok) {
        Swal.fire({
          title: 'Exito',
          text: `El grupo sido eliminado correctamente`,
          icon: 'success',
        }).then(() => {
          this.obtenerEstudiantesPorGrupo();
        });
      } else {
        Swal.fire({
          title: 'Error',
          text: `El grupo no se ha podido eliminar`,
          icon: 'error',
        });
      }
    });
  }

  obtenerEstudiantesPorGrupo() {
    this.grupo = [];
    this.grupos$ = this.coordinadorService.getGruposConEstudiantes().pipe(
      catchError((err) => {
        this.error = true;
        throw new Error('Ah ocurrido un error en el servidor');
      })
    );
  }

  eliminarEstudianteDelGrupo(estudiante: any) {
    this.coordinadorService
      .patchQuitarEstudianteDeGrupo(estudiante.id)
      .subscribe((res: any) => {
        if (res.ok) {
          Swal.fire({
            title: 'Degradacion correcta',
            text: `El estudiante ${estudiante.name} ha sido quitado del grupo exitosamente.`,
            icon: 'success',
          }).then(() => {
            this.obtenerEstudiantesPorGrupo();
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: `El estudiante ${estudiante.name} no se ha logrado quitar del grupo`,
            icon: 'error',
          });
        }
      });
  }

  crearGrupo() {
    const modalRef = this.modalService.open(CreateGroupComponent);
    modalRef.closed.subscribe((res: any) => {
      if (res != undefined) {
        this.coordinadorService.postGrupo(res).subscribe((res: any) => {
          if (res.ok) {
            Swal.fire({
              title: 'Exito',
              text: `El grupo ${res} se ha añadido correctamente`,
              icon: 'success',
            }).then(() => {
              this.obtenerEstudiantesPorGrupo();
            });
          } else {
            Swal.fire({
              title: 'Error',
              text: `El grupo no se ha podido crear`,
              icon: 'error',
            });
          }
        });
      }
    });
  }
}

@Component({
  selector: 'app-modal-create-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Crear Grupo</h4>
      <button
        type="button"
        class="btn-close"
        aria-label="Close"
        (click)="activeModal.dismiss('Cross click')"
      ></button>
    </div>
    <form [formGroup]="formGrupo">
      <div class="modal-body">
        <div class="mb-3">
          <label for="nombre" class="form-label">Nombre del grupo:</label>
          <input
            type="text"
            class="form-control"
            id="nombre"
            formControlName="name"
          />
          @if(formGrupo.get('name')!.invalid && formGrupo.get('name')!.touched){
          <div class="text-danger">El nombre es requerido.</div>
          }
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          [disabled]="formGrupo.invalid"
          class="btn btn-primary me-2"
          (click)="activeModal.close(formGrupo.value)"
        >
          Crear Grupo
        </button>

        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="activeModal.close('Close click')"
        >
          Cerrar
        </button>
      </div>
    </form>
  `,
  styles: '',
})
export class CreateGroupComponent {
  activeModal = inject(NgbActiveModal);

  formGrupo: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.formGrupo = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}
