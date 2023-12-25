import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJefeCalendarioPage } from './home-jefe-calendario.page';

describe('HomeJefeCalendarioPage', () => {
  let component: HomeJefeCalendarioPage;
  let fixture: ComponentFixture<HomeJefeCalendarioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeJefeCalendarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});

