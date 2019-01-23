import { Author } from './../../../core/models/author';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/core/models/book';
import { FirestoreService } from 'src/app/core/services/firestore.service';
import { Graphicnovel } from 'src/app/core/models/graphicnovel';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  bookList: Observable<Book[]>;
  graphicNovelList: Observable<Graphicnovel[]>;
  authorList: Observable<Author[]>;
  constructor(private fs: FirestoreService, private router: Router) {}

  ngOnInit() {
    this.bookList = this.fs.getBooks();
    this.graphicNovelList = this.fs.getGraphicNovels();
    this.authorList = this.fs.getAuthors();
  }
}
