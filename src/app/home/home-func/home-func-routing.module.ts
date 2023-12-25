import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeFuncPage } from './home-func.page';

const routes: Routes = [
  {
    path: '',
    component: HomeFuncPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeFuncPageRoutingModule {}
