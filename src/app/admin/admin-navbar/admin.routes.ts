import { Routes } from "@angular/router";
import { AdminNavbarComponent } from "./admin-navbar.component";

export const routes: Routes = [
  {
    path: '', component: AdminNavbarComponent,
    children: [
      {
        path: 'carrer', loadChildren: () => import('../carreras/carreras.routes')
      },
      {
        path: 'student', loadChildren: () => import('../student/student.routes')
      },
      {
        path: 'teacher', loadChildren: () => import('../teacher/teacher.routes')
      },
      {
        path: 'coordinator', loadChildren: () => import('../coordinator/coordinator.routes')
      },
      {
        path: 'tasks', loadComponent: () => import('../components/task/task.component').then( c => c.TaskComponent)
      },
      {
        path: 'config', loadComponent: () => import('../components/config/config.component').then( c => c.ConfigComponent)
      },
      {
        path: 'profile', loadComponent: () => import('../components/profile/profile.component').then( c => c.ProfileComponent)
      },
      {
        path: 'dashboard', loadComponent: () => import('../components/dashboard/dashboard.component').then( c => c.DashboardComponent)
      }
    ]
  }
];

export default routes;