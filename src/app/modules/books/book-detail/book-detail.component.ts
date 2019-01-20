import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from 'src/app/core/models/book';
import { Chapter } from 'src/app/core/models/chapter';
import { Section } from 'src/app/core/models/section';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit, OnDestroy {
  book$: Observable<Book>;
  chapter$: Observable<Chapter>;
  section$: Observable<Section>;
  bookId: string;
  chapterId: string;
  sectionId: string;
  subscriptions: Subscription[] = [];
  constructor(private fs: FirestoreService, private route: ActivatedRoute) {}

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
  ngOnDestroy() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }
}
