import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs, 'es');

@Component({
  selector: 'app-home-jefe',
  templateUrl: './home-jefe.page.html',
  styleUrls: ['./home-jefe.page.scss']
})
export class HomeJefePage {
  today = new Date();
  isDayTime = this.today.getHours() > 8 && this.today.getHours() < 20;
  unreadNotifications = 0; 
  selectedTab = '';

  constructor(private router: Router) { }

  navigateToPage(pageName: string) {
    this.router.navigate([`/${pageName}`]);
  }

  segmentChanged(ev: any) {
    this.selectedTab = ev.detail.value;
    this.navigateToPage(`/home-jefe-${this.selectedTab}`);
  }
  
  
}
