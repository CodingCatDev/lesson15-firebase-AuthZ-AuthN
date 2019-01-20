import { BookTreeModule } from './../book-tree/book-tree.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDrawerComponent } from './book-drawer.component';

@NgModule({
  declarations: [BookDrawerComponent],
  imports: [CommonModule, BookTreeModule],
  exports: [BookDrawerComponent]
})
export class BookDrawerModule {}
