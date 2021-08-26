import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoChangeResultComponent } from './rto-change-result.component';

describe('RtoChangeResultComponent', () => {
  let component: RtoChangeResultComponent;
  let fixture: ComponentFixture<RtoChangeResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RtoChangeResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RtoChangeResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
