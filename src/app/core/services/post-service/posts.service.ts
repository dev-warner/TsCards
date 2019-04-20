import { Injectable, Output } from '@angular/core';

import { Post } from 'src/app/post/post.model';

import { posts } from '../../../../assets/meta.json';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  @Output() filterLabel: EventEmitter = new EventEmitter();

  posts: Post[];
  currentFilter: null | string;

  constructor() {
    this.posts = posts;

    this.filterLabel.on('filter', (_, data) => {
      this.currentFilter = !data ? null : data;
    });
   }


  getPosts() {
    if (this.currentFilter) {
      return this.posts.filter(post => (
        post.type.toLowerCase().match(this.currentFilter.toLowerCase()) ||
        this.currentFilter.toLowerCase().match(post.category.toLowerCase())
      ));
    }

    return this.posts;
  }

  isCurrent(filter: string) {
    if (!this.currentFilter) {
      return false;
    }

    return (
      filter.toLowerCase() === this.currentFilter.toLowerCase()
    );
  }

  setCurrentFilter(filter: string) {
    this.currentFilter = filter;
  }

  clear() {
    this.currentFilter = null;
  }


}
