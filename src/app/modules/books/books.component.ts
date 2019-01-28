import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  showBooksDrawer$ = new BehaviorSubject(false);
  constructor() {}

  ngOnInit() {}

  onBooksDrawerActivate(e) {
    this.showBooksDrawer$.next(true);
  }
  onBooksDrawerDeactivate(e) {
    this.showBooksDrawer$.next(false);
  }
}
