import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJefeGestionturnosPage } from './home-jefe-gestionturnos.page';

describe('HomeJefeGestionturnosPage', () => {
  let component: HomeJefeGestionturnosPage;
  let fixture: ComponentFixture<HomeJefeGestionturnosPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeJefeGestionturnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
