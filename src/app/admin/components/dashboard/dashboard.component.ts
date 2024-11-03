import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

  cantidadEstudiantes: number = 0 ;
  cantidadProfesores: number = 35;
  cantidadCoordinadores: number = 5;
  carrerasDestacadas: string[] = ['Ingeniería de Software', 'Medicina', 'Derecho'];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    let observable: Observable<number> = interval(1000);
    observable.subscribe(
      (numero: number) =>  {
        this.cantidadEstudiantes = numero;
        this.cantidadProfesores += 1;
        this.cantidadCoordinadores += 1;

      }
    )
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }
}
