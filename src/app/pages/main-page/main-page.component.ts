import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterModule, NgbDropdownModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class MainPageComponent {
  isWideScreen: boolean = window.innerWidth >= 980;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.isWideScreen = window.innerWidth > 980;
  }
}
