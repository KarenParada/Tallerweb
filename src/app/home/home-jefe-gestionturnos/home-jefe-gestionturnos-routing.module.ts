import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJefeGestionturnosPage } from './home-jefe-gestionturnos.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJefeGestionturnosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJefeGestionturnosPageRoutingModule {}
