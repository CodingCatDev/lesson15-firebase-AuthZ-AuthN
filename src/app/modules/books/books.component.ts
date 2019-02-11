import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {
  showBooksAdd$ = new BehaviorSubject(false);
  showBooksDrawer$ = new BehaviorSubject(false);
  subs: Array<Subscription> = [];

  constructor(private router: Router) {
    /* Only add Book Add Fab on /books */
    this.subs.push(
      this.router.events.subscribe(e => {
        if (e instanceof NavigationEnd && e.urlAfterRedirects === '/books') {
          this.showBooksAdd$.next(true);
        } else {
          this.showBooksAdd$.next(false);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit() {}

  onBooksDrawerActivate(e) {
    this.showBooksDrawer$.next(true);
  }
  onBooksDrawerDeactivate(e) {
    this.showBooksDrawer$.next(false);
  }
}
