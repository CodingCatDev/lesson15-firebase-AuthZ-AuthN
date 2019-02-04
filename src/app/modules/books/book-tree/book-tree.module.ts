import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule, MatProgressBarModule, MatTreeModule } from '@angular/material';

import { BookTreeComponent } from './book-tree.component';

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
