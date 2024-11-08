import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
  imports: [],
  standalone: true
})
export class PerfilComponent {

  estudiante: any;

  constructor(){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // this.estudiante = JSON.parse(localStorage.getItem('estudiante')!);
  }
}
