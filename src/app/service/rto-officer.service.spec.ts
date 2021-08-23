import { TestBed } from '@angular/core/testing';

import { RtoOfficerService } from './rto-officer.service';

describe('RtoOfficerService', () => {
  let service: RtoOfficerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtoOfficerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
