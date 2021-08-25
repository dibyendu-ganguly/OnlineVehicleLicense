import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoOfficerDashboardNavbarComponent } from './rto-officer-dashboard-navbar.component';

describe('RtoOfficerDashboardNavbarComponent', () => {
  let component: RtoOfficerDashboardNavbarComponent;
  let fixture: ComponentFixture<RtoOfficerDashboardNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtoOfficerDashboardNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoOfficerDashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
