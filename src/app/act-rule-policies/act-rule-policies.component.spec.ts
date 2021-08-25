import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActRulePoliciesComponent } from './act-rule-policies.component';

describe('ActRulePoliciesComponent', () => {
  let component: ActRulePoliciesComponent;
  let fixture: ComponentFixture<ActRulePoliciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActRulePoliciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActRulePoliciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
