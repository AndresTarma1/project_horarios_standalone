import { Routes } from '@angular/router';
import { NavBarComponent } from './nav-bar.component';

export const routes: Routes = [
  {
    path: '',
    component: NavBarComponent,
    children: [
      {
        path: 'dashboard',
        redirectTo: 'profile',
      },
      {
        path: 'config',
        redirectTo: 'profile',
      },
      {
        path: 'groups',
        loadComponent: () =>
          import('../grupos/index/index.component').then(
            (c) => c.IndexComponent
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('../profile/profile.component').then(
            (c) => c.ProfileComponent
          ),
      },
      {
        path: 'subject-teacher',
        loadComponent: () =>
          import('../add-subject-teacher/add-subject-teacher.component').then(
            (c) => c.AddSubjectTeacherComponent
          ),
      },
      {
        path: 'horario',
        loadChildren: () => import('../horarios/horarios.routes'),
      },
      {
        path: 'academic_load',
        loadChildren: () => import('../carga-academica/carga-academica.routes'),
      },
      {
        path: '**',
        redirectTo: 'profile',
      },
    ],
  },
];

export default routes;
