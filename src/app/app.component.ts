import { Component, OnInit } from '@angular/core';

import { ColorPickerService } from './core/services/color-picker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private colorPicker: ColorPickerService) {
    this.themeClass = this.colorPicker.getColorClass();
  }
  themeClass;
  title = 'angular-material-router-outlet';
  ngOnInit(): void {}
}
