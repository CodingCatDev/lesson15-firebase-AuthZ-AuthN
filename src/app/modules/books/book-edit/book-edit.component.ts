import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Timestamp } from '@firebase/firestore-types';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { ConfigBook } from 'src/app/core/models/config-book';

import { FirestoreService } from './../../../core/services/firestore.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private fs: FirestoreService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  book$: Observable<Book>;
  bookConfig$: Observable<ConfigBook>;
  bookForm: FormGroup;
  bookId: string;
  genreList$: BehaviorSubject<string[]> = new BehaviorSubject([]);
  subs: Subscription[] = [];

  fictionChange(e) {
    this.bookForm.patchValue({ genre: '' }, { onlySelf: true });
  }
  ngOnDestroy() {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngOnInit() {
    // Get bookId for book document selection from Firestore
    this.subs.push(
      this.route.paramMap.subscribe(params => {
        this.bookId = params.get('bookId');
        this.rebuildForm();
      })
    );
    // Set Book Config
    this.bookConfig$ = this.fs.getConfigBook();

    // Set default Genere
    this.bookConfig$.pipe(take(1)).subscribe(bookConfig => {
      this.subs.push(
        this.bookForm
          .get('genre')
          .valueChanges.pipe(startWith(''))
          .subscribe(value => {
            const filterValue = value ? value.toLowerCase() : '';
            if (this.bookForm.get('fiction').value) {
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
  rebuildForm() {
    if (this.bookForm) {
      this.bookForm.reset();
    }
    this.book$ = this.fs.getBook(this.bookId);
    this.subs.push(
      this.book$
        .pipe(
          map(book => {
            console.log(book.publishDate);
            if (book.publishDate) {
              const timestamp = book.publishDate as Timestamp;
              book.publishDate = timestamp.toDate();
            }
            return book;
          })
        )
        .subscribe(book => {
          this.bookForm = this.fb.group({
            ageCategory: [book.ageCategory, Validators.required],
            description: [
              book.description,
              [Validators.required, Validators.maxLength(500)]
            ],
            fiction: [book.fiction || false, Validators.required],
            genre: [book.genre, Validators.required],
            hasAudio: [book.hasAudio],
            hasPhotos: [book.hasPhotos],
            hasVideos: [book.hasVideos],
            id: [book.id],
            publishDate: [book.publishDate],
            rating: [book.rating, Validators.required],
            status: [book.status, Validators.required],
            title: [book.title, [Validators.required, Validators.maxLength(50)]]
          });
        })
    );
  }

  revert() {
    this.rebuildForm();
  }
  async saveBookChanges() {
    const book = new Book(this.bookForm.value);
    await this.fs.updateBook(book);
    this.router.navigate(['/books', this.bookId]);
  }
}
