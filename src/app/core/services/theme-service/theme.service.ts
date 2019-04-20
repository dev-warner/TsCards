import { Injectable, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';

@Injectable()
export class ThemeService {
  @Output() DARK_THEME = new EventEmitter();

  private darkTheme: Subject<boolean> = new Subject<boolean>();
  isDarkTheme = this.darkTheme.asObservable();

  constructor() {
    const saved =  window.localStorage.getItem('dark');

    if (saved) {
      this.setDarkTheme(Boolean(saved));
    }
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.DARK_THEME.emit(`${isDarkTheme}`);
    this.darkTheme.next(isDarkTheme);
  }
}
