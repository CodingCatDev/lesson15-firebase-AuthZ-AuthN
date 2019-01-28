import {
  MatCardModule,
  MatButtonModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSliderModule,
  MatRadioModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookEditRoutingModule } from './book-edit-routing.module';
import { BookEditComponent } from './book-edit.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [BookEditComponent],
  imports: [
    CommonModule,
    BookEditRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule
  ]
})
export class BookEditModule {}
