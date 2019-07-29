import { TestBed } from '@angular/core/testing';

import { CurrentviewService } from './currentview.service';

describe('CurrentviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentviewService = TestBed.get(CurrentviewService);
    expect(service).toBeTruthy();
  });
});
