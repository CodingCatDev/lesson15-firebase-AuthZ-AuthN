import { Author } from './../models/author';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { switchMap } from 'rxjs/operators';
import { AngularfirebaseService } from './angularfirebase.service';
import { Chapter } from '../models/chapter';
import { Section } from '../models/section';
import { Graphicnovel } from '../models/graphicnovel';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afb: AngularfirebaseService) {}
  // Books
  getBooks(): Observable<Book[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Book[]>('books');
  }
  getBook(bookId: string): Observable<Book> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<Book>(`books/${bookId}`);
  }

  // Chapters
  getBookChapters(bookId: string): Observable<Chapter[]> {
    return this.afb.colWithIds$<Chapter[]>(`books/${bookId}/chapters`);
  }
  getBookChapter(bookId: string, chapterId: string): Observable<Chapter> {
    // Start Using AngularFirebase Service!!
    return this.afb.doc$<Chapter>(`books/${bookId}/chapters/${chapterId}`);
  }

  // Sections
  getBookSections(bookId: string, chapterId: string): Observable<Section[]> {
    // return this.fs.collection('books').doc(bookId).collection('chapters').doc(chapterId).collection('sections').valueChanges();
    // or you can use string template
    return this.afb.colWithIds$<Section[]>(
      `books/${bookId}/chapters/${chapterId}/sections`
    );
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

  // Get Authors
  getAuthors(): Observable<Author[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Author[]>('authors');
  }

  // Graphic Novels
  getGraphicNovels(): Observable<Graphicnovel[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Graphicnovel[]>('graphicnovels');
  }
}
