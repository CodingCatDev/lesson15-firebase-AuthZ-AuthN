import { FocusMonitor } from '@angular/cdk/a11y';
import { ViewportRuler } from '@angular/cdk/overlay';
import { DataSource } from '@angular/cdk/table';
import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet, MatDialog, MatSnackBar } from '@angular/material';
import { Observable, of } from 'rxjs';

@Component({
  template: `
    <button mat-raised-button color="primary">Do the thing</button>
  `
})
export class TestEntryComponent {}

@Component({
  selector: 'app-kitchensink',
  templateUrl: './kitchensink.component.html',
  styleUrls: ['./kitchensink.component.scss']
})
export class KitchensinkComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private viewportRuler: ViewportRuler,
    private focusMonitor: FocusMonitor,
    private elementRef: ElementRef<HTMLElement>,
    private bottomSheet: MatBottomSheet
  ) {
    focusMonitor.focusVia(elementRef, 'program');
    snackBar.open('Hello there', '', { duration: 3000 });

    // Do a sanity check on the viewport ruler.
    viewportRuler.getViewportRect();
    viewportRuler.getViewportSize();
    viewportRuler.getViewportScrollPosition();
  }

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  /** List of columns for the CDK and Material table. */
  tableColumns = ['userId'];

  /** Data source for the CDK and Material table. */
  tableDataSource = new TableDataSource();

  ngOnInit() {}
  openBottomSheet() {
    this.bottomSheet.open(TestEntryComponent);
  }
  openDialog() {
    this.dialog.open(TestEntryComponent);
  }
}

export class TableDataSource extends DataSource<any> {
  connect(): Observable<any> {
    return of([{ userId: 1 }, { userId: 2 }]);
  }

  disconnect() {}
}
