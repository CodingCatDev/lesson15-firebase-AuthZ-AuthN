import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookTreeComponent } from './book-tree.component';
import {
  MatTreeModule,
  MatIconModule,
  MatProgressBarModule,
  MatButtonModule
} from '@angular/material';

@NgModule({
  declarations: [BookTreeComponent],
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  exports: [BookTreeComponent]
})
export class BookTreeModule {}
