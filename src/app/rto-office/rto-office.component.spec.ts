import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoOfficeComponent } from './rto-office.component';

describe('RtoOfficeComponent', () => {
  let component: RtoOfficeComponent;
  let fixture: ComponentFixture<RtoOfficeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtoOfficeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoOfficeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
