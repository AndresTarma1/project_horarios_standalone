import { Routes } from "@angular/router"
import { MainPageComponent } from "./main-page.component";

export const routes: Routes = [{
  path: '', component: MainPageComponent,
  children: [
    {
      path: 'academic', loadComponent: () => import('./our-academic/our-academic.component')
    },
    {
      path: 'becas', loadComponent: () => import('./becas/becas.component')
    },
    {
      path: 'courses', loadComponent: () => import('./courses/courses.component')
    }
  ]
}];

export default routes;