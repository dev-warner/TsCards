import { TestBed } from '@angular/core/testing';

import { IsStringService } from './is-string.service';

describe('IsStringService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IsStringService = TestBed.get(IsStringService);
    expect(service).toBeTruthy();
  });
});
