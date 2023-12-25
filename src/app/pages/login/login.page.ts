import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ionicForm: FormGroup;

  // email:any
  // password:any
  // contact:any

  constructor(private afs: AngularFirestore,private toastController: ToastController, private alertController: AlertController, private loadingController: LoadingController, private authService: AuthServiceService, private router: Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        // Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ]
      ],
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();
  
    if (this.ionicForm.valid) {
      try {
        const credential = await this.authService.loginUser(this.ionicForm.value.email, this.ionicForm.value.password);
        
        if (credential && credential.user) {
          const userDoc = await this.afs.collection('profesionales').doc(credential.user.uid).get().toPromise();

          if(userDoc && userDoc.data()){
          const user = userDoc.data() as {rol :string, activo: boolean};
          loading.dismiss();
          if (user && user.rol) {
            if (user.activo){
              switch (user.rol) {
                case 'Funcionario':
                case 'Reemplazo':
                  this.router.navigate(['/home-func']);
                  break;
                case 'Jefe de turno':
                  this.router.navigate(['/home-jefe']);
                  break;
                default:
                  this.router.navigate(['/home']);
                  break;
              }}
              else {
                  this.router.navigate(['/home']);
              }
          } else {
            console.log('No se pudo obtener el rol del usuario');
          }}
        }
      } catch (err) {
        const message = (err as Error).message || 'Email o contraseñas inválidos';
        this.presentToast(message);
        console.log(err);
        loading.dismiss();
      }
    } else {
      console.log('Por favor entregue todos los valores requeridos');
    }
  }
  
  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentToast(message: string) {
    console.log(message);

    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
