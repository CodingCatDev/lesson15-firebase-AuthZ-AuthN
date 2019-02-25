import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from './../../core/services/auth.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  showBooksAdd$ = new BehaviorSubject(false);
  showBooksDrawer$ = new BehaviorSubject(false);
  unsubscribe$ = new Subject();

  constructor(private router: Router, private auth: AuthService) {
    /* Only add Book Add Fab on /books */
    this.router.events.pipe(takeUntil(this.unsubscribe$)).subscribe(e => {
      if (e instanceof NavigationEnd && e.urlAfterRedirects === '/books') {
        this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
          /*  Allows us to check if user has rights to add book
              Reminder this is only valid on front end, protect database */
          if (user && this.auth.canCreate(user)) {
            this.showBooksAdd$.next(true);
          }
        });
      } else {
        this.showBooksAdd$.next(false);
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {}

  onBooksDrawerActivate(e) {
    this.showBooksDrawer$.next(true);
  }
  onBooksDrawerDeactivate(e) {
    this.showBooksDrawer$.next(false);
  }
}
