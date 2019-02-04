import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from 'src/app/core/models/book';
import { Graphicnovel } from 'src/app/core/models/graphicnovel';
import { FirestoreService } from 'src/app/core/services/firestore.service';

import { Author } from './../../../core/models/author';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  constructor(private fs: FirestoreService, private router: Router) {}
  authorList: Observable<Author[]>;
  bookList: Observable<Book[]>;
  graphicNovelList: Observable<Graphicnovel[]>;

  ngOnInit() {
    this.bookList = this.fs.getBooks();
    this.graphicNovelList = this.fs.getGraphicNovels();
    this.authorList = this.fs.getAuthors();
  }
}
