import { TestBed, async, inject } from '@angular/core/testing';

import { AuthCanEditGuard } from './auth-can-edit.guard';

describe('AuthCanEditGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthCanEditGuard]
    });
  });

  it('should ...', inject([AuthCanEditGuard], (guard: AuthCanEditGuard) => {
    expect(guard).toBeTruthy();
  }));
});
