import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AlertController, ModalController } from '@ionic/angular';
import { ListModalComponent } from 'src/app/list-modal/list-modal.component';

import { registerLocaleData } from '@angular/common';

import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');


interface Grupo {
  id: string;
  Nombre: string;
  tipoTurnoInicial: string;
}

@Component({
  selector: 'app-home-jefe-gestionturnos',
  templateUrl: './home-jefe-gestionturnos.page.html',
  styleUrls: ['./home-jefe-gestionturnos.page.scss']
})

export class HomeJefeGestionturnosPage {
  today = new Date();
  isDayTime = this.today.getHours() > 8 && this.today.getHours() < 20;
  unreadNotifications = 0; 
  selectedTab = 'gestionturnos';
  fecha = new Date().toISOString();
  horizonteDias: number;
  fotoUrl: string;
  profesionales: any[] = [];
  tiposTurno: any[] = [];
  gruposTurno: Grupo[] = [];

  
  constructor(private router: Router, private afs: AngularFirestore, private afAuth: AngularFireAuth, private alertController: AlertController, private modalController: ModalController) { }


  ngOnInit() {

  // Crea un objeto Date a partir de this.fecha
  let fecha = new Date(this.fecha);

  // Resta tres horas
  fecha.setHours(fecha.getHours() - 3);

  // Convierte fecha a una cadena ISO y asigna el valor a this.fecha
  this.fecha = fecha.toISOString();

    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.afs.collection('profesionales').doc(user.uid).valueChanges().subscribe((user: any) => {
          this.fotoUrl = user.foto;
        });
      }
    });
    
    
    this.afs.collection('profesionales').snapshotChanges().subscribe((snapshots: any[]) => {
      this.profesionales = snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data();
        const id = snapshot.payload.doc.id;
        return { id, ...data };
      });
    });
    

    this.afs.collection('TipoTurno').valueChanges().subscribe(data => {
      this.tiposTurno = data;
    });

    this.afs.collection('Grupoturno').snapshotChanges().subscribe((snapshots: any[]) => {
      this.gruposTurno = snapshots.map(snapshot => {
        const data = snapshot.payload.doc.data() as Grupo;
        const id = snapshot.payload.doc.id;
        return { ...data, id: data.id ? data.id : id };
      });
      this.gruposTurno = this.gruposTurno.filter((grupo: Grupo) => grupo.Nombre !== 'Sin definir');
      this.gruposTurno.sort((a, b) => a.Nombre.localeCompare(b.Nombre));
    });
  }


  async programarTurnos() {
    console.log('Fecha:', this.fecha);
    console.log('Horizonte de días:', this.horizonteDias);
    for (let i = 0; i < this.horizonteDias; i++) {
      const fechaTurno = new Date(new Date(this.fecha).getTime());
      fechaTurno.setDate(fechaTurno.getDate() + i);
      console.log('Fecha',fechaTurno)
      for (const profesional of this.profesionales) {
        if (profesional.rol === 'funcionario' && profesional.Activo === true) {
          console.log('cumple condición: ',profesional.nombre)
          const grupo = this.gruposTurno.find(g => g.id === profesional.grupoturno);
          console.log('Grupo desde profesional: ',profesional.grupoturno)
          console.log('Grupo profesional: ',grupo)

          // Formatea la fecha a 'yyyy-mm-dd'
          const fechaFormateada = fechaTurno.toISOString().split('T')[0];

          if (grupo) {
            const tipoTurno = this.getTipoTurno(grupo, i);
            console.log('Tipo turno asignado:',tipoTurno)
  
            // Crea una clave única para cada combinación de fecha y tipo de turno
            const clave = `${fechaFormateada}_${tipoTurno}`;
            const claveturnos = `${fechaFormateada}_${tipoTurno}_${profesional.id}`;

            // Borra las filas existentes en ambas tablas
            const docRefTurnos = this.afs.collection('turnos').doc(claveturnos);
            const docRefTurnosGrupo = this.afs.collection('turnosgrupo').doc(clave);
            
            try {
              const docTurnos = await docRefTurnos.get().toPromise();
              if (docTurnos && docTurnos.exists) {
                await docRefTurnos.delete();
              }
              
              const docTurnosGrupo = await docRefTurnosGrupo.get().toPromise();
              if (docTurnosGrupo && docTurnosGrupo.exists) {
                await docRefTurnosGrupo.delete();
              }
            } catch (error) {
              console.error('Error al borrar datos:', error);
              continue; // pasa a la siguiente iteración del bucle
            }
 
            // Inserta el nuevo turno en la tabla 'turnos'
            try {
              await docRefTurnos.set({
                fecha: fechaFormateada,
                tipoTurno: tipoTurno,
                profesionalId: profesional.id,
                realizado: false,
                categoria:"normal"
              });
            } catch (error) {
              console.error('Error al insertar en turnos:', error);
            }
  
            // Inserta el nuevo turno en la tabla 'turnosgrupo'
            try {
              await docRefTurnosGrupo.set({
                fecha: fechaFormateada,
                tipoTurno: tipoTurno,
                grupoTurno: grupo.Nombre
              });
            } catch (error) {
              console.error('Error al insertar en turnosgrupo:', error);
            }
          }
        }
      }
    }
  }
    //validación para poder programar
    todosLosGruposTienenTipoTurno(): boolean {
      return this.gruposTurno.every(grupo => grupo.tipoTurnoInicial);
    }
  
  getTipoTurno(grupo: Grupo, dia: number) {
    console.log('grupo tipoturno inicial: ',grupo.tipoTurnoInicial)
    console.log('index of: ',this.tiposTurno.indexOf(grupo.tipoTurnoInicial)) 
    console.log('largo tiposturno',this.tiposTurno.length)
    let nombresTiposTurno = this.tiposTurno.map(tipoTurno => tipoTurno.Nombre);
    console.log('nombresTiposTurno: '+nombresTiposTurno)
    console.log('lo que se le suma a dia'+nombresTiposTurno.indexOf(grupo.tipoTurnoInicial))
    const indiceTipoTurno = (dia + nombresTiposTurno.indexOf(grupo.tipoTurnoInicial)) % nombresTiposTurno.length;
    const tipoTurno = this.tiposTurno[indiceTipoTurno];
    console.log('indicetipoturno: '+indiceTipoTurno)
    console.log('dia: '+dia)
    if (tipoTurno) {
      console.log('Tipo de turno para el grupo', grupo.Nombre, 'en el día', dia, ':', tipoTurno.Nombre);
      return tipoTurno.Nombre;
    } else {
      console.error('No se pudo encontrar el tipo de turno para el índice', indiceTipoTurno);
      return null; // o cualquier otro valor por defecto
    }
    console.log('Tipo de turno para el grupo', grupo.Nombre, 'en el día', dia, ':', tipoTurno.Nombre);
    return tipoTurno.Nombre;
  }
  navigateToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
    this.navigateToPage(`/home-jefe-${this.selectedTab}`);
  }
}
