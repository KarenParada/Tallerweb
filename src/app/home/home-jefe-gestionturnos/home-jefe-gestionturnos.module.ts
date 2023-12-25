import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJefeGestionturnosPageRoutingModule } from './home-jefe-gestionturnos-routing.module';

import { HomeJefeGestionturnosPage } from './home-jefe-gestionturnos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJefeGestionturnosPageRoutingModule
  ],
  declarations: [HomeJefeGestionturnosPage]
})
export class HomeJefeGestionTurnosPageModule {}
