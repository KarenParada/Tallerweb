import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJefeEstadisticaPageRoutingModule } from './home-jefe-estadistica-routing.module';

import { HomeJefeEstadisticaPage } from './home-jefe-estadistica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJefeEstadisticaPageRoutingModule
  ],
  declarations: [HomeJefeEstadisticaPage]
})
export class HomeJefeEstadisticaPageModule {}
