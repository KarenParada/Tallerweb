import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeJefeGestionpersonalPageRoutingModule } from './home-jefe-gestionpersonal-routing.module';

import { HomeJefeGestionpersonalPage } from './home-jefe-gestionpersonal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeJefeGestionpersonalPageRoutingModule
  ],
  declarations: [HomeJefeGestionpersonalPage]
})
export class HomeJefeGestionpersonalPageModule {}
