import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJefePageRoutingModule } from './home-jefe-routing.module';

import { HomeJefePage } from './home-jefe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJefePageRoutingModule
  ],
  declarations: [HomeJefePage]
})
export class HomeJefePageModule {}
