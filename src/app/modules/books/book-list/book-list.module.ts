import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListComponent } from './book-list.component';
import { BookListRoutingModule } from './book-list-routing.module';
import { MatListModule, MatExpansionModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookListComponent],
  imports: [CommonModule, BookListRoutingModule, MatListModule, RouterModule, MatExpansionModule, MatToolbarModule]
})
export class BookListModule {}
