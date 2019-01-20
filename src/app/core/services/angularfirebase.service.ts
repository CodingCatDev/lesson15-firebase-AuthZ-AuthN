import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentChangeAction,
  Action,
  DocumentSnapshotDoesNotExist,
  DocumentSnapshotExists
} from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import {
  map,
  tap,
  take,
  mergeMap,
  expand,
  takeWhile,
  finalize
} from 'rxjs/operators';

import * as firebase from 'firebase/app';
import { AngularFireStorage } from '@angular/fire/storage';

type CollectionPredicate<T> = string | AngularFirestoreCollection<T>;
type DocPredicate<T> = string | AngularFirestoreDocument<T>;

@Injectable({
  providedIn: 'root'
})
export class AngularfirebaseService {
  constructor(
    public aFirestore: AngularFirestore,
    public aFireStorage: AngularFireStorage
  ) {}

  /// **************
  /// Get a Reference
  /// **************

  col<T>(ref: CollectionPredicate<T>, queryFn?): AngularFirestoreCollection<T> {
    return typeof ref === 'string'
      ? this.aFirestore.collection<T>(ref, queryFn)
      : ref;
  }

  doc<T>(ref: DocPredicate<T>): AngularFirestoreDocument<T> {
    return typeof ref === 'string' ? this.aFirestore.doc<T>(ref) : ref;
  }

  /// **************
  /// Get Data
  /// **************

  doc$<T>(ref: DocPredicate<T>): Observable<T> {
    return this.doc(ref)
      .snapshotChanges()
      .pipe(
        map(
          (
            doc: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>
            >
          ) => {
            return doc.payload.data() as T;
          }
        )
      );
  }

  col$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<T[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((docs: DocumentChangeAction<T>[]) => {
          return docs.map((a: DocumentChangeAction<T>) =>
            a.payload.doc.data()
          ) as T[];
        })
      );
  }

  /// with Ids
  colWithIds$<T>(ref: CollectionPredicate<T>, queryFn?): Observable<any[]> {
    return this.col(ref, queryFn)
      .snapshotChanges()
      .pipe(
        map((actions: DocumentChangeAction<T>[]) => {
          return actions.map((a: DocumentChangeAction<T>) => {
            const data: Object = a.payload.doc.data() as T;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  /// **************
  /// Write Data
  /// **************

  /// Firebase Server Timestamp
  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  set<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const timestamp = this.timestamp;
    return this.doc(ref).set({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

  update<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    return this.doc(ref).update({
      ...data,
      updatedAt: this.timestamp
    });
  }

  delete<T>(ref: DocPredicate<T>): Promise<void> {
    return this.doc(ref).delete();
  }

  add<T>(
    ref: CollectionPredicate<T>,
    data
  ): Promise<firebase.firestore.DocumentReference> {
    const timestamp = this.timestamp;
    return this.col(ref).add({
      ...data,
      updatedAt: timestamp,
      createdAt: timestamp
    });
  }

  geopoint(lat: number, lng: number): firebase.firestore.GeoPoint {
    return new firebase.firestore.GeoPoint(lat, lng);
  }

  /// If doc exists update, otherwise set
  upsert<T>(ref: DocPredicate<T>, data: any): Promise<void> {
    const doc = this.doc(ref)
      .snapshotChanges()
      .pipe(take(1))
      .toPromise();

    return doc.then(
      (
        snap: Action<DocumentSnapshotDoesNotExist | DocumentSnapshotExists<T>>
      ) => {
        return snap.payload.exists
          ? this.update(ref, data)
          : this.set(ref, data);
      }
    );
  }

  /// **************
  /// Inspect Data
  /// **************

  inspectDoc(ref: DocPredicate<any>): void {
    const tick = new Date().getTime();
    this.doc(ref)
      .snapshotChanges()
      .pipe(
        take(1),
        tap(
          (
            d: Action<
              DocumentSnapshotDoesNotExist | DocumentSnapshotExists<any>
            >
          ) => {
            const tock = new Date().getTime() - tick;
            console.log(`Loaded Document in ${tock}ms`, d);
          }
        )
      )
      .subscribe();
  }

  inspectCol(ref: CollectionPredicate<any>): void {
    const tick = new Date().getTime();
    this.col(ref)
      .snapshotChanges()
      .pipe(
        take(1),
        tap((c: DocumentChangeAction<any>[]) => {
          const tock = new Date().getTime() - tick;
          console.log(`Loaded Collection in ${tock}ms`, c);
        })
      )
      .subscribe();
  }

  /// **************
  /// Create and read doc references
  /// **************

  /// create a reference between two documents
  connect(host: DocPredicate<any>, key: string, doc: DocPredicate<any>) {
    return this.doc(host).update({ [key]: this.doc(doc).ref });
  }

  /// returns a documents references mapped to AngularFirestoreDocument
  docWithRefs$<T>(ref: DocPredicate<T>) {
    return this.doc$(ref).pipe(
      map((doc: T) => {
        for (const k of Object.keys(doc)) {
          if (doc[k] instanceof firebase.firestore.DocumentReference) {
            doc[k] = this.doc(doc[k].path);
          }
        }
        return doc;
      })
    );
  }

  /// **************
  /// Atomic batch example
  /// **************

  /// Just an example, you will need to customize this method.
  atomic() {
    const batch = firebase.firestore().batch();
    /// add your operations here

    const itemDoc = firebase.firestore().doc('items/myCoolItem');
    const userDoc = firebase.firestore().doc('users/userId');

    const currentTime = this.timestamp;

    batch.update(itemDoc, { timestamp: currentTime });
    batch.update(userDoc, { timestamp: currentTime });

    /// commit operations
    return batch.commit();
  }

  /**
   * Delete a collection, in batches of batchSize. Note that this does
   * not recursively delete subcollections of documents in the collection
   * from: https://github.com/AngularFirebase/80-delete-firestore-collections/blob/master/src/app/firestore.service.ts
   */
  deleteCollection(path: string, batchSize: number): Observable<any> {
    const source = this.deleteBatch(path, batchSize);

    // expand will call deleteBatch recursively until the collection is deleted
    return source.pipe(
      expand(val => this.deleteBatch(path, batchSize)),
      takeWhile(val => val > 0)
    );
  }

  // Detetes documents as batched transaction
  private deleteBatch(path: string, batchSize: number): Observable<any> {
    const colRef = this.aFirestore.collection(path, ref =>
      ref.orderBy('__name__').limit(batchSize)
    );

    return colRef.snapshotChanges().pipe(
      take(1),
      mergeMap((snapshot: DocumentChangeAction<{}>[]) => {
        // Delete documents in a batch
        const batch = this.aFirestore.firestore.batch();
        snapshot.forEach(doc => {
          batch.delete(doc.payload.doc.ref);
        });

        return from(batch.commit()).pipe(map(() => snapshot.length));
      })
    );
  }

  // createAndUploadPic(
  //   path: string,
  //   data: any,
  //   blob: Blob
  // ): Observable<AjonpUpload> {
  //   return new Observable<AjonpUpload>(observer => {
  //     const addRef = this.add(path, data);
  //     observer.next(new AjonpUpload(addRef, null, null));
  //     addRef.then(ref => {
  //       if (blob) {
  //         const metadata: firebase.storage.UploadMetadata = {};
  //         metadata.customMetadata = { app: `Oliver's Books` };

  //         const task = this.aFireStorage.upload(ref.path, blob, metadata);
  //         observer.next(new AjonpUpload(addRef, task, null));
  //         task
  //           .snapshotChanges()
  //           .pipe(
  //             finalize(() => {
  //               return this.aFireStorage
  //                 .ref(ref.path)
  //                 .getDownloadURL()
  //                 .subscribe(imageURL => {
  //                   const updateRef = this.update(ref.path, {
  //                     imageURL: imageURL
  //                   });
  //                   observer.next(new AjonpUpload(addRef, task, updateRef));
  //                 });
  //             })
  //           )
  //           .subscribe();
  //       } else {
  //         // This is probably bad to update twice, but provides a nice promise.
  //         observer.next(
  //           new AjonpUpload(addRef, null, this.update(ref.path, data))
  //         );
  //       }
  //     });
  //   });
  // }
  // updateAndUploadPic(
  //   path: string,
  //   data: any,
  //   blob: Blob
  // ): Observable<AjonpUpload> {
  //   return new Observable<AjonpUpload>(observer => {
  //     if (blob) {
  //       const metadata: firebase.storage.UploadMetadata = {};
  //       metadata.customMetadata = { app: `Oliver's Books` };
  //       const task = this.aFireStorage.upload(path, blob, metadata);
  //       observer.next(new AjonpUpload(null, task, null));
  //       task
  //         .snapshotChanges()
  //         .pipe(
  //           finalize(() => {
  //             return this.aFireStorage
  //               .ref(path)
  //               .getDownloadURL()
  //               .subscribe(imageURL => {
  //                 const updateRef = this.update(path, {
  //                   imageURL: imageURL,
  //                   ...data
  //                 });
  //                 observer.next(new AjonpUpload(null, task, updateRef));
  //               });
  //           })
  //         )
  //         .subscribe();
  //     } else {
  //       observer.next(new AjonpUpload(null, null, this.update(path, data)));
  //     }
  //   });
  // }
}
