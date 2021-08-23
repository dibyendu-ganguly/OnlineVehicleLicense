import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoOfficerComponent } from './rto-officer.component';

describe('RtoOfficerComponent', () => {
  let component: RtoOfficerComponent;
  let fixture: ComponentFixture<RtoOfficerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtoOfficerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoOfficerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
