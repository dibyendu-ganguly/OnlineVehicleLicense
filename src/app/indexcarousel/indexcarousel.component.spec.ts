import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexcarouselComponent } from './indexcarousel.component';

describe('IndexcarouselComponent', () => {
  let component: IndexcarouselComponent;
  let fixture: ComponentFixture<IndexcarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexcarouselComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexcarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
