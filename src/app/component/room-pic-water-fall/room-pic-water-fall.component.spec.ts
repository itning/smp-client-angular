import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomPicWaterFallComponent } from './room-pic-water-fall.component';

describe('RoomPicWaterFallComponent', () => {
  let component: RoomPicWaterFallComponent;
  let fixture: ComponentFixture<RoomPicWaterFallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomPicWaterFallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomPicWaterFallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
