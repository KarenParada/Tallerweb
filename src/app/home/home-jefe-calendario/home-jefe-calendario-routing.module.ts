import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJefeCalendarioPage } from './home-jefe-calendario.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJefeCalendarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJefeCalendarioPageRoutingModule {}
