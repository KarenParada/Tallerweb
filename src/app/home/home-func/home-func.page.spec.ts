import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeFuncPage } from './home-func.page';

describe('HomeFuncPage', () => {
  let component: HomeFuncPage;
  let fixture: ComponentFixture<HomeFuncPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HomeFuncPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
