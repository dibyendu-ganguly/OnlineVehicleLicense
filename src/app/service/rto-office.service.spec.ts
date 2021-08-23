import { TestBed } from '@angular/core/testing';

import { RtoOfficeService } from './rto-office.service';

describe('RtoOfficeService', () => {
  let service: RtoOfficeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtoOfficeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
