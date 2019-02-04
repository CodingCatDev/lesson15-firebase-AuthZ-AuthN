import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, WelcomeRoutingModule]
})
export class WelcomeModule {}
