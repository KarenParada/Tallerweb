import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeJefePage } from './home-jefe.page';

describe('HomeJefePage', () => {
  let component: HomeJefePage;
  let fixture: ComponentFixture<HomeJefePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeJefePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
