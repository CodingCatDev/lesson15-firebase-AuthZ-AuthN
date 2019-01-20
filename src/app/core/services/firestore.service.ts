import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private fs: AngularFirestore) {}
  getBooks(): Observable<any> {
    return this.fs.collection('books').valueChanges();
  }
  getBookChapters(bookId: string): Observable<any> {
    return this.fs
      .collection('books')
      .doc(bookId)
      .collection('chapters')
      .valueChanges();
  }
  getBookSections(bookId: string, chapterId: string): Observable<any> {
    // return this.fs.collection('books').doc(bookId).collection('chapters').doc(chapterId).collection('sections').valueChanges();
    // or you can use string template
    return this.fs
      .collection(`books/${bookId}/chapters/${chapterId}/sections`)
      .valueChanges();
  }
}
