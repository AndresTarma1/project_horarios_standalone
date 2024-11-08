import { Routes } from "@angular/router";
import { NavBarComponent } from "./nav-bar.component";

export const routes: Routes = [{
  path: '', component: NavBarComponent ,children: [
    {
      path: 'dashboard', redirectTo: 'profile'
    },
    {
      path: 'config', redirectTo: 'profile'
    },
    {
      path: 'profile', loadComponent: () => import('../profile/profile.component').then( c => c.ProfileComponent)
    },
    {
      path: 'group-student', loadComponent: () => import('../add-group-student/add-group-student.component').then( c => c.AddGroupStudentComponent)
    }
    ,{
      path: 'subject-teacher', loadComponent: () => import('../add-subject-teacher/add-subject-teacher.component').then( c => c.AddSubjectTeacherComponent)
    },{
      path: 'horario', loadChildren: () => import('../horarios/horarios.routes')
    },{
      path: 'academic_load', loadChildren: () => import('../carga-academica/carga-academica.routes')
    },{
      path: '**', redirectTo: 'profile'
    }
  ]
}];

export default routes;