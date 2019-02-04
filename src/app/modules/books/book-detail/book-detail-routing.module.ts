import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BookDrawerComponent } from './../book-drawer/book-drawer.component';
import { BookDetailComponent } from './book-detail.component';

const routes: Routes = [
  {
    path: '',
    component: BookDetailComponent
  },
  {
    path: '',
    component: BookDrawerComponent,
    outlet: 'book-drawer'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookDetailRoutingModule {}
