import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserSigninComponent } from './user-signin.component';

const routes: Routes = [
  {
    path: '',
    component: UserSigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserSigninRoutingModule {}
