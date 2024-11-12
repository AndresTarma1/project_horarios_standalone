import { Routes } from '@angular/router';
import { authGuardAdmin, authGuardCoordinador, authGuardEstudiante, authGuardProfesor } from './guards/auth.guard';


export const routes: Routes = [{
  path: 'login', loadChildren: () => import('./pages/forms/login.routes'),
},{
  path: 'main', loadChildren: () => import('./pages/main-page/main.routes'),
},{
  path: 'admin', canActivate: [authGuardAdmin] ,loadChildren: () => import('./admin/admin-navbar/admin.routes'), title: 'Admin'
},{
  path: 'coordinator', canActivate: [authGuardCoordinador] ,loadChildren: () => import('./auth/coordinator/nav-bar/coordinator.routes')
},
{
  path: 'student', canActivate: [authGuardEstudiante] , loadChildren: () => import('./auth/student/student.routes')
},
{
  path: 'teacher', canActivate: [authGuardProfesor] , loadChildren: () => import('./auth/teacher/teacher.routes')
},
{
  path: '', redirectTo: '/main', pathMatch: 'full'
}];
