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

  @Output() filterEmitter: EventEmitter = new EventEmitter();

  title = 'Algorithms & Data Structures in TypeScript.';
  socials = social;
  links = categorys;
  dark: boolean;

  constructor(
    public postService: PostsService,
    public themeSerivce: ThemeService
  ) {}

  ngOnInit() {
    this.themeSerivce
        .isDarkTheme
        .subscribe((theme) => {
          this.dark = this.themeSerivce
                          .isDarkThemeFromKey(theme);
        });
  }

  toggleAndFilter({ label }) {
    this.postService.setCurrentFilter(label);
  }

  isResources(label: string): boolean {
    return label === 'Resources';
  }
}
