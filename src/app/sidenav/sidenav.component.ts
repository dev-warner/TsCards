import { Component, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

import { ThemeService } from '../core/services/theme-service/theme.service';
import { PostsService } from '../core/services/post-service/posts.service';

import { categorys, social } from '../../assets/meta.json';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  @Input() toggle: () => void;
  @Output() filterEmitter: EventEmitter = new EventEmitter();

  title = 'Algorithms & Data Structures in TypeScript.';
  socials = social;
  links = categorys;
  isDarkTheme: Observable<boolean>;

  constructor(public postService: PostsService, private themeService: ThemeService) {}

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;
  }

  toggleAndFilter({ label }) {
    this.toggle();
    this.postService.setCurrentFilter(label);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);

    try {
      window.localStorage.setItem('dark', `${checked}`);
    } catch (e) {
      console.error('Not available');
    }
  }

  isResources(label: string): boolean {
    return label === 'Resources';
  }
}
