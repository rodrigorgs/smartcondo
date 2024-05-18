import { TestBed } from '@angular/core/testing';

import { CondoService } from './condo.service';

describe('CondoService', () => {
  let service: CondoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CondoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
