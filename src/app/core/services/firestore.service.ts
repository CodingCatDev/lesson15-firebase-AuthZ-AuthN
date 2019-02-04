import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Book } from '../models/book';
import { Chapter } from '../models/chapter';
import { ConfigBook } from '../models/config-book';
import { Graphicnovel } from '../models/graphicnovel';
import { Section } from '../models/section';
import { Author } from './../models/author';
import { AngularfirebaseService } from './angularfirebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afb: AngularfirebaseService) {}

  // Get Authors
  getAuthors(): Observable<Author[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Author[]>('authors');
  }
  getBook(bookId: string): Observable<Book> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<Book>(`books/${bookId}`);
  }
  getBookChapter(bookId: string, chapterId: string): Observable<Chapter> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<Chapter>(`books/${bookId}/chapters/${chapterId}`);
  }

  // Chapters
  getBookChapters(bookId: string): Observable<Chapter[]> {
    return this.afb.colWithIds$<Chapter[]>(`books/${bookId}/chapters`);
  }

  // Books
  getBooks(): Observable<Book[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Book[]>('books');
  }
  getBookSection(
    bookId: string,
    chapterId: string,
    sectionId: string
  ): Observable<Section> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<Section>(
      `books/${bookId}/chapters/${chapterId}/sections/${sectionId}`
    );
  }

  // Sections
  getBookSections(bookId: string, chapterId: string): Observable<Section[]> {
    // return this.fs.collection('books').doc(bookId).collection('chapters').doc(chapterId).collection('sections').valueChanges();
    // or you can use string template
    return this.afb.colWithIds$<Section[]>(
      `books/${bookId}/chapters/${chapterId}/sections`
    );
  }
  // Configs
  getConfigBook(): Observable<ConfigBook> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<ConfigBook>(`config/book`);
  }

  // Graphic Novels
  getGraphicNovels(): Observable<Graphicnovel[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Graphicnovel[]>('graphicnovels');
  }
}
