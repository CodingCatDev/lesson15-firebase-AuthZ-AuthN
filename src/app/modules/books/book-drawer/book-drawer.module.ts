import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BookTreeModule } from './../book-tree/book-tree.module';
import { BookDrawerComponent } from './book-drawer.component';

@NgModule({
  declarations: [BookDrawerComponent],
  imports: [CommonModule, BookTreeModule],
  exports: [BookDrawerComponent]
})
export class BookDrawerModule {}
