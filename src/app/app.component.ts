import { Component, OnDestroy, OnInit, ViewChild, Input } from '@angular/core';
import { Location } from '@angular/common';

import { SwUpdate } from '@angular/service-worker';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Observable, Subject } from 'rxjs';

import { ThemeService } from './core/services/theme-service/theme.service';
import { PostsService } from './core/services/post-service/posts.service';
import { Router } from '@angular/router';
import { FilterService } from './core/services/filter-service/filter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() openedSubject: Subject<boolean> = new Subject<boolean>();

  private deferredPrompt: Event;
  private mobileQueryListener: () => void;
  private home: boolean;
  public toggleBind: () => void;
  public mobileQuery: MediaQueryList;
  public isDarkTheme: Observable<boolean>;
  public filter: string;
  public open: boolean;
  public next: string;

  constructor(
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private media: MediaMatcher,
    public router: Router,
    public postService: PostsService,
    public location: Location,
    public filterService: FilterService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.mobileQuery.addListener(this.onMobileDetection.bind(this));
    this.open = !this.mobileQuery.matches;
    this.toggleBind = this.toggle.bind(this);

    window.addEventListener('beforeinstallprompt', ($event) => {
      $event.preventDefault();
      this.showAddToHomeScreen($event);
    });
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

    if (this.open) {
      this.sidenav.open();
    }

    this.openedSubject
      .subscribe(this.sidenav.toggle.bind(this.sidenav));

    this.router.events.subscribe((_) => {
      try {

        this.home = this.location.path() === '';

        if (!this.isHome()) {
          const { path } = this.postService.getNextPost();

          this.next = 'detail/' + path;
        }
      } catch (_) { }

    });

    this.newVersion();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  public isHome() {
    return this.home;
  }

  public toggle() {
    this.openedSubject.next(!this.open);
  }

  public closePanel() {
    if (this.mobileQuery.matches) {
      this.sidenav.close();
    }
  }

  public currentPath() {
    const { path } = this.postService.getNextPost();

    return 'detail' + path.toLowerCase();
  }

  private onMobileDetection() {
    this.closePanel();
  }

  private newVersion() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.snackBar
          .open('New version available. Load New Version?', 'Confirm')
          .onAction()
          .subscribe(() => {
            window.location.reload();
          });
      });
    }
  }

  private showAddToHomeScreen(deferredPrompt) {
    this.snackBar.open(
      'Want to add these flash cards to your Home for Offline use & study 🤘',
      'Confirm',
      {
        duration: 4000
      }
    ).onAction()
      .subscribe(async () => {
        (this.deferredPrompt as any).prompt();

        const { outcome } = await (deferredPrompt as any).userChoice();

        outcome === 'accepted' ?
          this.snackBar.open('installing...', null, {
            duration: 300
          }) :
          this.snackBar.open('No Problem!', null, {
            duration: 300
          });

      });
  }


}
