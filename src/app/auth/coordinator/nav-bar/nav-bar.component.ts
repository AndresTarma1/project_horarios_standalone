import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  isSidebarActive: boolean = true;

  toggleSidebar() {
    this.isSidebarActive = !this.isSidebarActive;
  }


  router: Router = inject(Router);
  logout(): void{
    localStorage.removeItem('coordinador');
    this.router.navigateByUrl('/main');
  }
}
