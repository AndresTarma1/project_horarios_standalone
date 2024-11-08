import { Component } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ManualComponent } from '../semi-automatico/manual.component';
import { AutomaticoComponent } from "../automatico/automatico.component";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [NgbNavModule, ManualComponent, AutomaticoComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  active = 1;
}
