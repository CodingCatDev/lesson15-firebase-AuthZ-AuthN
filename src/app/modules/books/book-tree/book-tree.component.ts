import { FirestoreService } from './../../../core/services/firestore.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-tree',
  templateUrl: './book-tree.component.html',
  styleUrls: ['./book-tree.component.scss']
})
export class BookTreeComponent implements OnInit {
  constructor(private fs: FirestoreService) {}

  ngOnInit() {}
}
