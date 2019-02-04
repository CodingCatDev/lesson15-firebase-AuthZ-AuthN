import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { startWith, take } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { ConfigBook } from 'src/app/core/models/config-book';

import { FirestoreService } from './../../../core/services/firestore.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  constructor(private router: ActivatedRoute, private fs: FirestoreService) {}
  book$: Observable<Book>;
  bookConfig$: Observable<ConfigBook>;
  bookRating = 3;
  bookStatus = 'Draft';
  fictionSelected = true;
  genreControl = new FormControl();
  genreList$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  subs: Subscription[] = [];

  fictionChange(e) {
    this.fictionSelected = e.checked;
    this.genreControl.reset();
  }
  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    // Get bookId for book document selection from Firestore
    this.subs.push(
      this.router.paramMap.subscribe(params => {
        const bookId = params.get('bookId');
        this.book$ = this.fs.getBook(bookId);
      })
    );
    // Set Book Config
    this.bookConfig$ = this.fs.getConfigBook();

    // Set default Genere
    this.bookConfig$.pipe(take(1)).subscribe(bookConfig => {
      this.subs.push(
        this.genreControl.valueChanges.pipe(startWith('')).subscribe(value => {
          const filterValue = value ? value.toLowerCase() : '';
          if (this.fictionSelected) {
            this.genreList$.next(
              bookConfig.fiction.filter(option =>
                option.toLowerCase().includes(filterValue)
              )
            );
          } else {
            this.genreList$.next(
              bookConfig.nonFiction.filter(option =>
                option.toLowerCase().includes(filterValue)
              )
            );
          }
        })
      );
    });
  }
}
