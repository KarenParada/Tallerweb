import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import '@fullcalendar/core/locales/es';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import * as $ from 'jquery';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

interface Dia {
  fecha: Date;
  turnoLargo: string | null;
  turnoNoche: string | null;
}

interface Turno {
  realizado: boolean;
  profesionalID: string;
  id: string;
  categoria:string;
  fecha:string;
  tipoTurno:string;
}

@Component({
  selector: 'app-home-jefe-calendario',
  templateUrl: './home-jefe-calendario.page.html',
  styleUrls: ['./home-jefe-calendario.page.scss'],
})
export class HomeJefeCalendarioPage implements OnInit {
  @ViewChild('confirmModal') confirmModal: ModalDirective;
  eventDate: string;
  tipoTurno: string;
  selectedTab = 'calendario';
  unreadNotifications = 0; 
  events: any[] = [];
  calendarOptions: any;
  
  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router,

  ) {}


  ngOnInit() {
    this.afs.collection('turnosgrupo').valueChanges().subscribe((data: any[]) => {
      this.events = data.flatMap((d: any) => {
        const fecha = new Date(`${d.fecha}T00:00:00`);
        
        let turnoLargo = null;
        let turnoNoche = null;
      
        if (d.tipoTurno === 'Largo') {
          turnoLargo = d.grupoTurno;
        } else if (d.tipoTurno === 'Noche') {
          turnoNoche = d.grupoTurno;
        } else if (d.tipoTurno === 'Libre') {
          return []; 
        }

      
        return {
          title: '', 
          start: fecha,
          end: fecha,
          allDay: true,
          extendedProps: {
            turnoLargo: turnoLargo,
            turnoNoche: turnoNoche,
          },
        };
      });

      var calendarEl = document.getElementById('calendar');
      if (!calendarEl) {
        throw new Error('No se pudo encontrar el elemento del calendario');
      }
      var calendar = new Calendar(calendarEl, {
        plugins: [ dayGridPlugin ],
        initialView: 'dayGridMonth',
        locale : 'es',
        firstDay: 1,
        headerToolbar: {
          left: 'title', 
          center: '',
          right: 'today prev,next'
        },
        buttonText: {
          today: 'Hoy'
        },
        titleFormat: { year: 'numeric', month: 'long' }, 
        events: this.events,
        eventContent: this.renderEventContent,
        
        
      });
    
      calendar.render();
    });
  }
  
  renderEventContent = (eventInfo: any) => {
    let domNodes = [ $('<div></div>')[0], $('<div></div>')[0] ];
  
    if (eventInfo.event.extendedProps.turnoLargo) {
      let turnoLargo = $('<div></div>');
      turnoLargo.addClass('turno-largo');
      turnoLargo.css('backgroundColor', this.getColor(eventInfo.event.extendedProps.turnoLargo));
      turnoLargo.text(`🌞`);
      domNodes[0] = turnoLargo[0];
    }
  
    if (eventInfo.event.extendedProps.turnoNoche) {
      let turnoNoche = $('<div></div>');
      turnoNoche.addClass('turno-noche');
      turnoNoche.css('backgroundColor', this.getColor(eventInfo.event.extendedProps.turnoNoche));
      turnoNoche.text(`🌙`);
      domNodes[1] = turnoNoche[0];
    }
  
    return { domNodes: domNodes };
  }
  
  
  getColor(grupoTurno: string) {
    switch (grupoTurno) {
      case 'Grupo 1':
        return 'rgb(213, 229, 235)';
      case 'Grupo 2':
        return 'rgb(228, 241, 228)';
      case 'Grupo 3':
        return '#FFEAE9';
      default:
        return 'white';
    }
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
    this.navigateToPage(`/home-jefe-${this.selectedTab}`);
  }
  navigateToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  
}