import { Component, Output } from '@angular/core';
import { Post } from '../post/post.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { EventEmitter } from 'events';
import { PostsService } from '../core/services/post-service/posts.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Output() filterLabel: EventEmitter = new EventEmitter();

  private isFlipped: boolean;

  public posts: Post[];
  public filtertedPosted: null | string;
  public postService: PostsService;

  constructor(postService: PostsService) {
    this.isFlipped = false;
    this.filtertedPosted = null;
    this.postService = postService;
  }

  get flip() {
    return this.isFlipped;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.postService.posts, event.previousIndex, event.currentIndex);
  }


  toggleFLip() {
    this.isFlipped = !this.isFlipped;
  }

}
