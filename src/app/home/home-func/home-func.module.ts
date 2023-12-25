import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeFuncPageRoutingModule } from './home-func-routing.module';

import { HomeFuncPage } from './home-func.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeFuncPageRoutingModule
  ],
  declarations: [HomeFuncPage]
})
export class HomeFuncPageModule {}
