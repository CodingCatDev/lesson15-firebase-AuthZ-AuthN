import { TestBed } from '@angular/core/testing';

import { AngularfirebaseService } from './angularfirebase.service';

describe('AngularfirebaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AngularfirebaseService = TestBed.get(AngularfirebaseService);
    expect(service).toBeTruthy();
  });
});
