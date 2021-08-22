import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardNavbarComponent } from './user-dashboard-navbar.component';

describe('UserDashboardNavbarComponent', () => {
  let component: UserDashboardNavbarComponent;
  let fixture: ComponentFixture<UserDashboardNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDashboardNavbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
