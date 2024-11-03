
import { Routes } from '@angular/router';
import { StudentComponent } from './student.component';
import { MainComponent } from './main/main.component';
import { HorarioComponent } from './horario/horario.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ConfigComponent } from './config/config.component';

const routes: Routes = [{
  path: '', component: StudentComponent,
  children: [
    {
      path: 'main', loadComponent: () => import('./main/main.component').then( c => c.MainComponent)
    },
    {
      path: 'perfil', loadComponent: () => import('./perfil/perfil.component').then( c => c.PerfilComponent)
    }
    ,{
      path: 'horario', loadComponent: () => import('./horario/horario.component').then( c => c.HorarioComponent)
    },
    {
      path: 'config', loadComponent: () => import('./config/config.component').then( c => c.ConfigComponent)
    },{
      path: '**', redirectTo: 'main'
    }
]
  },
  {
    path: '**', redirectTo: ''
  },
];

export default routes;