import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPostComponent } from './markdown-post.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('MarkdownPostComponent', () => {
  let component: MarkdownPostComponent;
  let fixture: ComponentFixture<MarkdownPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkdownPostComponent ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
