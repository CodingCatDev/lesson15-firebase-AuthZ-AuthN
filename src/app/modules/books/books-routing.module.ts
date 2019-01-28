import { BooksComponent } from './books.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: BooksComponent,
    children: [
      {
        path: '',
        loadChildren: './book-list/book-list.module#BookListModule'
      },
      {
        path: ':bookId',
        loadChildren: './book-detail/book-detail.module#BookDetailModule'
      },
      {
        path: ':bookId/edit',
        loadChildren: './book-edit/book-edit.module#BookEditModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule {}
