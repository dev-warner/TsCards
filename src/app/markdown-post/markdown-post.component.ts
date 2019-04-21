import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-markdown-post',
  templateUrl: './markdown-post.component.html',
  styleUrls: ['./markdown-post.component.scss']
})
export class MarkdownPostComponent {

  path: string;

  constructor(private route: ActivatedRoute) {
  }

  createPath() {
    const name = this.getUriParam('name');
    const type = this.getUriParam('type');

    return `/assets/posts/${type}/${name}.md`;
  }

  getUriParam(str: string) {
    return this.route.snapshot.paramMap.get(str);
  }

}
