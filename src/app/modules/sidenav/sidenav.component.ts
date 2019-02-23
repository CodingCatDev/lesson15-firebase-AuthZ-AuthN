import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ColorPickerService } from 'src/app/core/services/color-picker.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit, OnDestroy {
  constructor(
    public auth: AuthService,
    private router: Router,
    private colorPicker: ColorPickerService
  ) {}
  routerSub: Subscription;
  @ViewChild('snav') public sidenav: MatSidenav;
  title = `AJ's Books`;
  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }
  // This will be used for closing the sidenav drawer and scrolling to the top of screen
  ngOnInit() {
    this.routerSub = this.router.events.subscribe(event => {
      if (this.sidenav && event instanceof NavigationEnd) {
        this.sidenav.close();
      }
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
  openThemeMenu() {}
  pickColor(color: string) {
    let colorTheme = '';
    if (color !== '') {
      colorTheme = `-${color}`;
    }
    this.colorPicker.setColorClass(
      `angular-material-router-app-theme${colorTheme}`
    );
  }
  signOut() {
    this.auth.signOut();
  }
  snavToggle(snav) {
    snav.toggle();
  }
}
