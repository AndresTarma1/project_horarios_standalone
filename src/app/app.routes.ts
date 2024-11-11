import { Routes } from '@angular/router';


export const routes: Routes = [{
  path: 'login', loadChildren: () => import('./pages/forms/login.routes'),
},{
  path: 'main', loadChildren: () => import('./pages/main-page/main.routes'),
},{
  path: 'admin', loadChildren: () => import('./admin/admin-navbar/admin.routes'), title: 'Admin'
},{
  path: 'coordinator', loadChildren: () => import('./auth/coordinator/nav-bar/coordinator.routes')
},
{
  path: 'student', loadChildren: () => import('./auth/student/student.routes')
},
{
  path: 'teacher', loadChildren: () => import('./auth/teacher/teacher.routes')
},
{
  path: '', redirectTo: '/main', pathMatch: 'full'
}];
