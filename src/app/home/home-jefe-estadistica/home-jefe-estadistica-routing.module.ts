import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJefeEstadisticaPage } from './home-jefe-estadistica.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJefeEstadisticaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJefeEstadisticaPageRoutingModule {}
