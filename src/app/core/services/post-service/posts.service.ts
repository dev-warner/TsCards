import { Injectable, Output } from '@angular/core';
import { Location } from '@angular/common';

import { Post } from 'src/app/post/post.model';

import { EventEmitter } from 'events';
import { FilterService } from '../filter-service/filter.service';
import { posts } from '../../../../assets/meta.json';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  @Output() filterLabel: EventEmitter = new EventEmitter();

  posts: Post[];
  currentFilter: null | string;

  constructor(
    private location: Location,
    public filterService: FilterService
  ) {
    this.posts = posts;

    this.filterService
        .get()
        .subscribe((data) => {
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

  getCurrentPost() {
    const pathLocation = this.location.path();
    const current = pathLocation.substring(7, pathLocation.length);

    const matchedPath = (target) => {
      return target.path === current;
    };

    const path = this.posts.find(matchedPath);

    if (path) {
      return path;
    }
  }

  getNextPost(post = this.getCurrentPost()) {
    const index = this.posts.indexOf(post) + 1;

    if (!post) {
      return;
    }

    return index > this.posts.length ?
      this.posts[0] :
      this.posts[index];
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
    this.filterService.set(filter);
  }

  clear() {
    this.currentFilter = null;
  }


}
