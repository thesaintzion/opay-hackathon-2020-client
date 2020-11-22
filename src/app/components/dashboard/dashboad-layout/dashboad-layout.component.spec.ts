import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboadLayoutComponent } from './dashboad-layout.component';

describe('DashboadLayoutComponent', () => {
  let component: DashboadLayoutComponent;
  let fixture: ComponentFixture<DashboadLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboadLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboadLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
