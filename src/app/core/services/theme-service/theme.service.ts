import { Injectable, Output, RendererFactory2, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';
import { EventEmitter } from 'events';
import { Store } from '@ngrx/store';
import { TOGGLE } from '../../store/dark-theme.reducer';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  @Output() DARK_THEME = new EventEmitter();

  public body: Element;
  private previous: boolean;
  private renderer: Renderer2;

  public isDarkTheme: Observable<boolean> = new Observable<boolean>();

  constructor(
    private renderFactory2: RendererFactory2,
    private store: Store<AppState>
  ) {
    this.body = document.querySelector('body');
    this.renderer = renderFactory2.createRenderer(null, null);
    this.isDarkTheme = store.select('darkTheme');

    this.isDarkTheme.subscribe((key) => {
      if (key === this.previous) {
        return;
      }

      this.previous = key;

      this.isDarkThemeFromKey(key) ?
        this.renderer.addClass(this.body, 'dark-theme') :
        this.renderer.removeClass(this.body, 'dark-theme');
    });
  }

  isDarkThemeFromKey(key) {
    return key === 'dark';
  }

  toggle() {
    this.store.dispatch({ type: TOGGLE, state: this.previous });
  }
}
