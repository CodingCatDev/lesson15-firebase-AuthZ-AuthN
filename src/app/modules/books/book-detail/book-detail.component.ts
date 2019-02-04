import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { Chapter } from 'src/app/core/models/chapter';
import { Section } from 'src/app/core/models/section';
import { FirestoreService } from 'src/app/core/services/firestore.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  constructor(private fs: FirestoreService, private route: ActivatedRoute) {}
  book$: Observable<Book>;
  bookId: string;
  chapter$: Observable<Chapter>;
  chapterId: string;
  section$: Observable<Section>;
  sectionId: string;
  subscriptions: Subscription[] = [];
  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  ngOnInit() {
    this.subscriptions.push(
      this.route.paramMap.subscribe(paramMap => {
        this.bookId = paramMap.get('bookId');
        this.book$ = this.fs.getBook(this.bookId);
      })
    );
    this.subscriptions.push(
      this.route.queryParamMap.subscribe(paramMap => {
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
      })
    );
  }
}
