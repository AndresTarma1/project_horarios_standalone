import { Component } from '@angular/core';
import { CarrerasCardComponent } from "../../components/carreras-card/carreras-card.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CarrerasCardComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  lista: string[] = ["a", "e", "i", "o", "u", "a"];
}
