import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCheckComponent } from './leave-check.component';

describe('LeaveCheckComponent', () => {
  let component: LeaveCheckComponent;
  let fixture: ComponentFixture<LeaveCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaveCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
