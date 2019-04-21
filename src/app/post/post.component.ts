import { Component, Input } from '@angular/core';
import { Post } from './post.model';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  @Input() post: Post;

  constructor() { }

  craftTweet() {
    return `
Want to learn more about Algorithms and Data Structures in TypeScript?

Heres some flash cards and all the information and resources to get the better of them.

I've just been looking at the ${this.post.category} ${this.post.type} ${this.post.label} 🚀🚀🚀

#javascript #Algorithms&DataStructures

https://tscards.sh

Thanks @dev_warner
    `;
  }



}
