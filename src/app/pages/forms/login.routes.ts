import { Routes } from "@angular/router";

export const routes: Routes = [{
  path: 'admin', loadComponent: () => import('./admin-login/admin-login.component')
},{
  path: 'student', loadComponent: () => import('./student-login/student-login.component')
},{
  path: 'teacher', loadComponent: () => import('./teacher-login/teacher-login.component')
},{
  path: 'coordinator', loadComponent: () => import('./coordinator-login/coordinator-login.component')
}];

export default routes;
