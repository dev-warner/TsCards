import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { SwUpdate } from '@angular/service-worker';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Observable } from 'rxjs';

import { ThemeService } from './core/services/theme-service/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('sidenav') sidenav: MatSidenav;

  toggleBind: () => void;
  isDarkTheme: Observable<boolean>;
  mobileQuery: MediaQueryList;
  deferredPrompt: Event;
  open: boolean;

  private mobileQueryListener: () => void;

  constructor(
    private themeService: ThemeService,
    private swUpdate: SwUpdate,
    private snackBar: MatSnackBar,
    private media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.mobileQuery.addListener(this.closePanel.bind(this));
    this.toggleBind = this.toggle.bind(this);

    this.open = false;

    self.addEventListener('beforeinstallprompt', ($event) => {
      $event.preventDefault();

      this.deferredPrompt = $event;

      this.showAddToHomeScreen();

    });
  }

  showAddToHomeScreen() {
    this.snackBar.open(
      'Want to add these flash cards to your Home for Offline use & study 🤘',
      'Confirm',
      {
        duration: 4000
      }
    ).onAction()
      .subscribe(async () => {
        (this.deferredPrompt as any).prompt();

        const { outcome } = await (this.deferredPrompt as any).userChoice();

        outcome === 'accepted' ?
          this.snackBar.open('installing...', null, {
            duration: 300
          }) :
          this.snackBar.open('No Problem!', null, {
            duration: 300
          });

      });
  }

  toggle() {
    this.sidenav.toggle();
  }

  closePanel() {
    this.sidenav.close();
  }

  ngOnInit() {
    this.isDarkTheme = this.themeService.isDarkTheme;

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

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

}
