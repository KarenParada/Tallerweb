import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { ListModalComponent } from 'src/app/list-modal/list-modal.component';

@Component({
  selector: 'app-home-jefe-estadistica',
  templateUrl: './home-jefe-estadistica.page.html',
  styleUrls: ['./home-jefe-estadistica.page.scss']
})
export class HomeJefeEstadisticaPage {
  today = new Date();
  isDayTime = this.today.getHours() > 8 && this.today.getHours() < 20;
  unreadNotifications = 0; 
  selectedTab = 'estadistica';
  data = [
    { Indicador: 'Nro de pacientes atendidos', Cirugia: 20, UCI: 9, UTI: 3, Pediatria: 2 },
    { Indicador: 'Tratamientos respiratorios', Cirugia: 11, UCI: 2, UTI: 2, Pediatria: 1 },
    { Indicador: 'Tratamientos motores', Cirugia: 5, UCI: 6, UTI: 1, Pediatria: 0 }
  ];

  // Define tu control de formulario para la fecha
  date = new FormControl(new Date());


  fotoUrl: string;

  constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() {

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('profesionales').doc(user.uid).valueChanges().subscribe((user: any) => {
          this.fotoUrl = user.foto;
        });
      }
    });

  }

  navigateToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }
  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
    this.navigateToPage(`/home-jefe-${this.selectedTab}`);
  }

}
