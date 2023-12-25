import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { ListModalComponent } from 'src/app/list-modal/list-modal.component';

@Component({
  selector: 'app-home-jefe-gestionpersonal',
  templateUrl: './home-jefe-gestionpersonal.page.html',
  styleUrls: ['./home-jefe-gestionpersonal.page.scss']
})
export class HomeJefeGestionpersonalPage {
  today = new Date();
  isDayTime = this.today.getHours() > 8 && this.today.getHours() < 20;
  unreadNotifications = 0; 
  selectedTab = 'gestionpersonal';

  items1: any[] = [];
  items2: any[] = [];
  items3: any[] = [];
  items4: any[] = [];
  items5: any[] = [];

  selectedItem1: any;  
  selectedItem2: any;  
  selectedItem3: any;  
  selectedItem4: any;  
  selectedItem5: any;  

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

    this.afs.collection('profesionales').valueChanges().subscribe(data => {
      this.items1 = data;
      console.log(this.items1);  
    }, error => {
      console.error("Error al leer datos de Firestore: ", error);
    });

    this.afs.collection('Grupoturno').valueChanges().subscribe(data => {
      this.items2 = data;
    });

    this.afs.collection('TipoTurno').valueChanges().subscribe(data => {
      this.items3 = data;
    });

    this.afs.collection('Salas').valueChanges().subscribe(data => {
      this.items4 = data;
    });

    this.afs.collection('Tratamientos').valueChanges().subscribe(data => {
      this.items5 = data;
    });
  }

  navigateToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }
  
  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
    this.navigateToPage(`/home-jefe-${this.selectedTab}`);
  }

  async openListModal(items: any[],title: string) {
    const modal = await this.modalController.create({
      component: ListModalComponent,
      componentProps: {
        items: items,
        title: title
      }
    });

    await modal.present();
  }
}
