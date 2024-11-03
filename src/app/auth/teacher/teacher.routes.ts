import { Routes } from "@angular/router";
import { TeacherComponent } from "./teacher.component";

export const routes: Routes = [
  {
    path: '', component: TeacherComponent,
    children: [
      {
        path: 'config', loadComponent: () => import('./config/config.component').then( c => c.ConfigComponent)
      },
      {
        path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then( c => c.PerfilComponent)
      },
      {
        path: 'horario', loadComponent: () => import('./horario/horario.component').then( c => c.HorarioComponent)
      },
      {
        path: '**', redirectTo: 'perfil'
      }
    ]
  }
];

export default routes;