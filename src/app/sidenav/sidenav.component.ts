import { Component, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

import { ThemeService } from '../core/services/theme-service/theme.service';
import { PostsService } from '../core/services/post-service/posts.service';

import { categorys, social } from '../../assets/meta.json';
import { StorageService } from '../core/storage-service/storage.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  @Input() toggle: () => void;
  @Input() isDarkTheme: Observable<boolean>;
  @Output() filterEmitter: EventEmitter = new EventEmitter();

  title = 'Algorithms & Data Structures in TypeScript.';
  socials = social;
  links = categorys;
  dark: boolean;

  constructor(
    public postService: PostsService,
    public themeSerivce: ThemeService,
    private storageService: StorageService
  ) {
    this.dark = this.themeSerivce.isDarkThemeFromKey(this.storageService.get('theme'));
  }

  ngOnInit() {
    this.isDarkTheme
      .subscribe((isDarkTheme) => {
        this.dark = isDarkTheme;
      });
  }

  toggleAndFilter({ label }) {
    this.toggle();
    this.postService.setCurrentFilter(label);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeSerivce.setDarkTheme(checked);
  }

  isResources(label: string): boolean {
    return label === 'Resources';
  }
}
