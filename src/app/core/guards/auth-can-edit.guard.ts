import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCanEditGuard implements CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}
  canLoad(
    route: import('@angular/router').Route,
    segments: import('@angular/router').UrlSegment[]
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.auth.user$.pipe(
      take(1),
      tap(user => {
        this.auth.canEdit(user);
        if (!this.auth.canEdit(user)) {
          console.log('access denied');
          this.snackBar.open('You must have Edit role!', '', {
            panelClass: 'error'
          });
          this.router.navigate(['']);
        }
      }),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denied');
          this.snackBar.open('You must be logged in!', '', {
            panelClass: 'error'
          });
          this.router.navigate(['']);
        }
      })
    );
  }
}
