import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule, MatListModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { BookListRoutingModule } from './book-list-routing.module';
import { BookListComponent } from './book-list.component';

@NgModule({
  declarations: [BookListComponent],
  imports: [
    CommonModule,
    BookListRoutingModule,
    MatListModule,
    RouterModule,
    MatExpansionModule,
    MatToolbarModule
  ]
})
export class BookListModule {}
