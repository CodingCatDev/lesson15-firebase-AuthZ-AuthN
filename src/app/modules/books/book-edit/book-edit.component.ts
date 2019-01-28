import { Observable, Subscription, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from './../../../core/services/firestore.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/core/models/book';
import { take, startWith } from 'rxjs/operators';
import { ConfigBook } from 'src/app/core/models/config-book';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  subs: Subscription[] = [];
  book$: Observable<Book>;
  bookConfig$: Observable<ConfigBook>;
  fictionSelected = true;
  genreList$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  genreControl = new FormControl();
  bookRating = 3;
  bookStatus = 'Draft';

  constructor(private router: ActivatedRoute, private fs: FirestoreService) {}

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

    // Set default Book Type from Config
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
  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  fictionChange(e) {
    this.fictionSelected = e.checked;
    this.genreControl.reset();
  }
}
