import { MediaMatcher } from '@angular/cdk/layout';
import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FilterService } from './core/services/filter-service/filter.service';
import { PostsService } from './core/services/post-service/posts.service';
import { ThemeService } from './core/services/theme-service/theme.service';
import { CLOSE, OPEN, TOGGLE } from './core/store/sidenav.reducer';
import { trigger, state, style, transition, animate } from '@angular/animations';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('fade', [
      state('in', style({ opacity: 1 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600)
      ]),
      transition(':leave',
        animate(1200, style({ opacity: 0 })))
    ])
  ]
})
export class AppComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  private deferredPrompt: Event;
  private home: boolean;
  public next: string;
  public mobileQuery;
  public open: Observable<boolean>;
  public theme: boolean;
  public currentFilter: string;
  public toggleBind: () => void;

  constructor(
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private media: MediaMatcher,
    public router: Router,
    public postService: PostsService,
    public location: Location,
    public filterService: FilterService,
    public themeService: ThemeService,
    public store: Store<AppState>,
  ) {
    this.open = this.store.select('sideNav');
    this.mobileQuery = this.media.matchMedia('(max-width: 768px)');
    this.mobileQuery.addListener(this.onMobileDetection.bind(this));
    this.watchTheme();
    this.watchFilter();

    window.addEventListener('beforeinstallprompt', ($event) => {
      $event.preventDefault();
      this.showAddToHomeScreen($event);
    });
  }

  ngOnInit() {
    if (!this.mobileQuery.matches) {
      this.store.dispatch({ type: OPEN });
    }

    this.router.events.subscribe((_) => {
      try {

        if (!this.isHome()) {
          const { path } = this.postService.getNextPost();

          this.next = 'detail/' + path;
        }
      } catch (_) { }

    });

    this.newVersion();
  }

  private watchFilter() {
    this.filterService
      .get()
      .subscribe((filter: string) => {
        this.currentFilter = filter;
      });
  }

  private watchTheme() {
    this.themeService
      .isDarkTheme
      .subscribe((theme) => {
        this.theme = (
          this.themeService
            .isDarkThemeFromKey(theme)
        );
      });
  }

  public isHome() {
    return this.location.path() === '';
  }

  public toggle() {
    this.store.dispatch({ type: TOGGLE });
  }

  public closePanel() {
    this.store.dispatch({ type: CLOSE });
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
