import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  ionicForm: FormGroup;


  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore,private toastController: ToastController,private loadingController: LoadingController,private authService:AuthServiceService,private router: Router, public formBuilder: FormBuilder) { 

  }

  ngOnInit() {
    // this.signUP()
    this.ionicForm = this.formBuilder.group({
      fullname:['',
        [Validators.required]
      ],
      contact:['',
      [
        Validators.required,
        Validators.pattern("^[0-9]*$"),
        Validators.minLength(9),
        // Validators.min(10)
      ]
    ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ],
      ],
      password: ['', [
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        Validators.required,
      ],
    ],
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  async signUpWithGoogle(){
    const user = await this.authService.GoogleAuth().then(()=>{
      this.router.navigate(['/home'])
    })
  }
 
  async signUP(){
    const loading = await this.loadingController.create();
    await loading.present();
    if (this.ionicForm.valid) {
    try{  
      const userCredential = await this.authService.registerUser(this.ionicForm.value.email, this.ionicForm.value.password,this.ionicForm.value.fullname)
      if (userCredential) {
        if (userCredential.additionalUserInfo && userCredential.user) {
          const isNewUser = userCredential.additionalUserInfo.isNewUser;
          const uid = userCredential.user.uid;
          const fullname= this.ionicForm.value.fullname;
          const correo = this.ionicForm.value.email;
          if (isNewUser) {
            await this.afs.collection('profesionales').doc(uid).set({
              id: uid,
              rol: 'sin definir',
              grupoturno: 'sin definir',
              activo: 0,
              foto:'gs://gestionturnos-a9073.appspot.com/sinimagen.jpg',
              nombre:fullname,
              email:correo
            });
          }
        }
        loading.dismiss();
        this.router.navigate(['/home'])
      }
    } catch (err){
      this.presentToast((err as Error).message);

    }
    } else {
      return console.log('Please provide all the required values!');
    }
  }
  signUpUsingPhonenumber(contact:string){
    
    this.authService.signInWithPhoneNumber(contact)
  }
  async presentToast(message:string) {
    console.log(message);
    
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });

    await toast.present();
  }
}
