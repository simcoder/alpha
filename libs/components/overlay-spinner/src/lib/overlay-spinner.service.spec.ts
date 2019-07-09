import { TestBed } from '@angular/core/testing';

import { OverlaySpinnerService } from './overlay-spinner.service';

describe('OverlaySpinnerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OverlaySpinnerService = TestBed.get(OverlaySpinnerService);
    expect(service).toBeTruthy();
  });
});
