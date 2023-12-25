import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeJefePage } from './home-jefe.page';

const routes: Routes = [
  {
    path: '',
    component: HomeJefePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeJefePageRoutingModule {}
