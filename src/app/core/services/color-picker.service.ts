import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorPickerService {
  constructor(private overlayContainer: OverlayContainer) {
    this.colorClass$ = new BehaviorSubject(this.initialClass);
    const storageClass = localStorage.getItem('color-picker');
    console.log(storageClass);
    if (storageClass) {
      overlayContainer.getContainerElement().classList.add(storageClass);
      this.colorClass$.next(storageClass);
    } else {
      overlayContainer.getContainerElement().classList.add(this.initialClass);
    }
  }
  colorClass$: BehaviorSubject<string>;
  initialClass = 'angular-material-router-app-theme';
  getColorClass() {
    return this.colorClass$;
  }
  setColorClass(className: string) {
    this.overlayContainer.getContainerElement().classList.forEach(css => {
      this.overlayContainer.getContainerElement().classList.remove(css);
    });
    this.overlayContainer.getContainerElement().classList.add(className);
    this.colorClass$.next(className);
    localStorage.setItem('color-picker', className);
  }
}
