import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputEditComponent } from './input-edit.component';

describe('InputEditComponent', () => {
  let component: InputEditComponent;
  let fixture: ComponentFixture<InputEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
