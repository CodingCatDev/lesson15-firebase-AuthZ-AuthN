import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';

@NgModule({
  declarations: [BooksComponent],
  imports: [
    CommonModule,
    RouterModule,
    BooksRoutingModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class BooksModule {}
