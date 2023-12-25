import { FullCalendarModule } from '@fullcalendar/angular'; 
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { IonicModule } from '@ionic/angular';

import { HomeJefeCalendarioPageRoutingModule } from './home-jefe-calendario-routing.module';

import { HomeJefeCalendarioPage } from './home-jefe-calendario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FullCalendarModule,
    HomeJefeCalendarioPageRoutingModule,
    ModalModule.forRoot()
  ],
  declarations: [HomeJefeCalendarioPage]
})
export class HomeJefeCalendarioPageModule {}
