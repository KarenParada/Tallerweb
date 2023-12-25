import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJefeGestionpersonalPage } from './home-jefe-gestionpersonal.page';

describe('HomeJefeGestionpersonalPage', () => {
  let component: HomeJefeGestionpersonalPage;
  let fixture: ComponentFixture<HomeJefeGestionpersonalPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeJefeGestionpersonalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
