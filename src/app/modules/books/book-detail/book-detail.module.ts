import { FlexModule } from '@angular/flex-layout';
import { BookDrawerModule } from './../book-drawer/book-drawer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookDetailRoutingModule } from './book-detail-routing.module';
import { BookDetailComponent } from './book-detail.component';
import { MatCardModule } from '@angular/material';

@NgModule({
  declarations: [BookDetailComponent],
  imports: [
    CommonModule,
    FlexModule,
    BookDetailRoutingModule,
    BookDrawerModule,
    MatCardModule
  ]
})
export class BookDetailModule {}
