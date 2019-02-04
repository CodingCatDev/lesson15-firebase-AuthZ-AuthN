import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexModule } from '@angular/flex-layout';
import { MatButtonModule, MatCardModule } from '@angular/material';

import { BookDrawerModule } from './../book-drawer/book-drawer.module';
import { BookDetailRoutingModule } from './book-detail-routing.module';
import { BookDetailComponent } from './book-detail.component';

@NgModule({
  declarations: [BookDetailComponent],
  imports: [
    CommonModule,
    FlexModule,
    BookDetailRoutingModule,
    BookDrawerModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class BookDetailModule {}
