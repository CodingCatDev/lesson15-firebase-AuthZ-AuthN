import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { Chapter } from 'src/app/core/models/chapter';
import { Section } from 'src/app/core/models/section';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  constructor(
    private fs: FirestoreService,
    private route: ActivatedRoute,
    private auth: AuthService
  ) {}
  book$: Observable<Book>;
  bookId: string;
  chapter$: Observable<Chapter>;
  chapterId: string;
  section$: Observable<Section>;
  sectionId: string;
  showEdit$ = new BehaviorSubject(false);
  unsubscribe$ = new Subject();
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.route.paramMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(paramMap => {
        this.bookId = paramMap.get('bookId');
        this.book$ = this.fs.getBook(this.bookId);
      });
    this.route.queryParamMap
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(paramMap => {
        this.chapterId = paramMap.get('chapterId');
        this.sectionId = paramMap.get('sectionId');

        if (this.bookId && this.chapterId) {
          this.chapter$ = this.fs.getBookChapter(this.bookId, this.chapterId);
        }
        if (this.bookId && this.chapterId && this.sectionId) {
          this.section$ = this.fs.getBookSection(
            this.bookId,
            this.chapterId,
            this.sectionId
          );
        }
      });
    this.auth.user$.pipe(takeUntil(this.unsubscribe$)).subscribe(user => {
      /*  Allows us to check if user has rights to edit book
          Reminder this is only valid on front end, protect database */
      console.log(this.showEdit$.value);
      if (user && this.auth.canEdit(user)) {
        this.showEdit$.next(true);
      }
    });
  }
}
