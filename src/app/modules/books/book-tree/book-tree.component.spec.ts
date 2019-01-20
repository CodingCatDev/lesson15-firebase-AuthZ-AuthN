import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookTreeComponent } from './book-tree.component';

describe('BookTreeComponent', () => {
  let component: BookTreeComponent;
  let fixture: ComponentFixture<BookTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
