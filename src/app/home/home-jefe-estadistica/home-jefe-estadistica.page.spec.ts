import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJefeEstadisticaPage } from './home-jefe-estadistica.page';

describe('HomeJefeEstadisticaPage', () => {
  let component: HomeJefeEstadisticaPage;
  let fixture: ComponentFixture<HomeJefeEstadisticaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeJefeEstadisticaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
