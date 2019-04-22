import { Component, OnInit } from '@angular/core';
import { style, transition, animate, trigger, state } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-markdown-post',
  templateUrl: './markdown-post.component.html',
  styleUrls: ['./markdown-post.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),
      transition(':leave',
        animate(500, style({ opacity: 0 })))
    ])
  ]
})
export class MarkdownPostComponent implements OnInit {

  path: string;

  constructor(private route: ActivatedRoute, public location: Location) { }

  ngOnInit() { }

  createPath() {
    const name = this.getUriParam('name');
    const type = this.getUriParam('type');

    return type ? `/assets/posts/${type}/${name}.md` : '../../assets/README.md';
  }

  getUriParam(str: string) {
    return this.route.snapshot.paramMap.get(str);
  }

}
