import { TestBed } from '@angular/core/testing';

import { InjectJwtService } from './inject-jwt.service';

describe('InjectJwtService', () => {
  let service: InjectJwtService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InjectJwtService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
