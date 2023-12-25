import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthServiceService } from './auth-service.service';
import { environment } from 'src/environments/environment';
import { ListModalComponent } from './list-modal/list-modal.component'; 
import { FormsModule } from '@angular/forms'; 

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { FullCalendarModule} from '@fullcalendar/angular'; 

registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [AppComponent ,ListModalComponent,],
  imports: [BrowserModule,
            AngularFireAuthModule,
            AngularFireModule,
            FormsModule,
            FullCalendarModule,
            AngularFireModule.initializeApp(environment.firebaseConfig),

    IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy, }],
  bootstrap: [AppComponent],
})
export class AppModule {}
