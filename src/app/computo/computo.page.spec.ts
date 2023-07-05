import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComputoPage } from './computo.page';

describe('ComputoPage', () => {
  let component: ComputoPage;
  let fixture: ComponentFixture<ComputoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ComputoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
