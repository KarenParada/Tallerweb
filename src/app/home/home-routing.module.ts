import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'home-func',
        loadChildren: () => import('./home-func/home-func.module').then( m => m.HomeFuncPageModule)
      },
      {
        path: 'home-jefe',
        loadChildren: () => import('./home-jefe/home-jefe.module').then( m => m.HomeJefePageModule)
      },
      {
        path: 'home-jefe-gestionpersonal',
        loadChildren: () => import('./home-jefe-gestionpersonal/home-jefe-gestionpersonal.module').then( m => m.HomeJefeGestionpersonalPageModule)
      },
      {
        path: 'home-jefe-gestionturnos',
        loadChildren: () => import('./home-jefe-gestionturnos/home-jefe-gestionturnos.module').then( m => m.HomeJefeGestionTurnosPageModule)
      },
      {
        path: 'home-jefe-calendario',
        loadChildren: () => import('./home-jefe-calendario/home-jefe-calendario.module').then( m => m.HomeJefeCalendarioPageModule)
      },
      {
        path: 'home-jefe-estadistica',
        loadChildren: () => import('./home-jefe-estadistica/home-jefe-estadistica.module').then( m => m.HomeJefeEstadisticaPageModule)
      },

    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
