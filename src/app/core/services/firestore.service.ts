import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { switchMap } from 'rxjs/operators';
import { AngularfirebaseService } from './angularfirebase.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afb: AngularfirebaseService) {}
  getBooks(): Observable<Book[]> {
    // Start Using AngularFirebase Service!!
    return this.afb.colWithIds$<Book[]>('books');
  }
  getBookChapters(bookId: string): Observable<any> {
    return this.afb
      .col('books')
      .doc(bookId)
      .collection('chapters')
      .valueChanges();
  }
  getBookSections(bookId: string, chapterId: string): Observable<any> {
    // return this.fs.collection('books').doc(bookId).collection('chapters').doc(chapterId).collection('sections').valueChanges();
    // or you can use string template
    return this.afb
      .col(`books/${bookId}/chapters/${chapterId}/sections`)
      .valueChanges();
  }
}
