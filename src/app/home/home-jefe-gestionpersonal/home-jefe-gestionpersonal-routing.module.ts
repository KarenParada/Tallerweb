import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJefeGestionpersonalPage } from './home-jefe-gestionpersonal.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJefeGestionpersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJefeGestionpersonalPageRoutingModule {}
