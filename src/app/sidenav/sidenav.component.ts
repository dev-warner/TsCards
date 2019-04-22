import { Component, OnInit, Output, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';

import { ThemeService } from '../core/services/theme-service/theme.service';
import { PostsService } from '../core/services/post-service/posts.service';

import { categorys, social } from '../../assets/meta.json';
import { Store } from '@ngrx/store';
import { TOGGLE } from '../core/store/dark-theme.reducer';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})

export class SidenavComponent implements OnInit {

  @Input() isMobile;
  @Output() filterEmitter: EventEmitter = new EventEmitter();

  title = 'Algorithms & Data Structures in TypeScript.';
  socials = social;
  links = categorys;
  sidenav: Observable<boolean>;
  dark: boolean;

  constructor(
    public postService: PostsService,
    public themeSerivce: ThemeService,
    private store: Store<AppState>
  ) {
    this.sidenav = this.store.select('sidenavOpen');
  }

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
    this.store.dispatch({ type: TOGGLE });
  }

  filter({ label }) {
    this.postService.setCurrentFilter(label);
  }

  isResources(label: string): boolean {
    return label === 'Resources';
  }
}
