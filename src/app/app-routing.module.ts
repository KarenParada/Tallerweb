import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'home-jefe',
    loadChildren: () => import('./home/home-jefe/home-jefe.module').then( m => m.HomeJefePageModule)
  },
  {
    path: 'home-jefe-gestionpersonal',
    loadChildren: () => import('./home/home-jefe-gestionpersonal/home-jefe-gestionpersonal.module').then( m => m.HomeJefeGestionpersonalPageModule)
  },
  {
    path: 'home-jefe-gestionturnos',
    loadChildren: () => import('./home/home-jefe-gestionturnos/home-jefe-gestionturnos.module').then( m => m.HomeJefeGestionTurnosPageModule)
  },
  {
    path: 'home-jefe-calendario',
    loadChildren: () => import('./home/home-jefe-calendario/home-jefe-calendario.module').then( m => m.HomeJefeCalendarioPageModule)
  },
  {
    path: 'home-jefe-estadistica',
    loadChildren: () => import('./home/home-jefe-estadistica/home-jefe-estadistica.module').then( m => m.HomeJefeEstadisticaPageModule)
  },
  {
    path: '',
    redirectTo: 'landing',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./pages/forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'verify',
    loadChildren: () => import('./pages/verify/verify.module').then( m => m.VerifyPageModule)
  },
  {
    path: 'landing',
    loadChildren: () => import('./pages/landing/landing.module').then( m => m.LandingPageModule)
  },
  {
    path: 'confirmation',
    loadChildren: () => import('./pages/confirmation/confirmation.module').then( m => m.ConfirmationPageModule)
  },

];






@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
