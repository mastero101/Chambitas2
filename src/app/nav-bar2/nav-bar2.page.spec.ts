import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBar2Page } from './nav-bar2.page';

describe('NavBar2Page', () => {
  let component: NavBar2Page;
  let fixture: ComponentFixture<NavBar2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NavBar2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
