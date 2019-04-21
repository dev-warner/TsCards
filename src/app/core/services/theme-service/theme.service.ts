import { Injectable, Output, RendererFactory2, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
import { StorageService } from '../../storage-service/storage.service';

@Injectable({
  providedIn: 'root'
})

export class ThemeService {

  @Output() DARK_THEME = new EventEmitter();

  public body: Element;
  private persistKey: 'theme' = 'theme';
  private darkTheme: Subject<boolean> = new Subject<boolean>();
  private renderer: Renderer2;

  public isDarkTheme = this.darkTheme.asObservable();

  constructor(private renderFactory2: RendererFactory2, private storageService: StorageService) {
    this.body = document.querySelector('body');
    this.renderer = renderFactory2.createRenderer(null, null);

    this.setDarkTheme(this.isDarkThemeFromKey(this.storageService.get(this.persistKey)));
  }

  isDarkThemeFromKey(key) {
    return key === 'dark';
  }

  setDarkTheme(isDarkTheme: boolean) {
    this.darkTheme.next(isDarkTheme);

    isDarkTheme ?
      this.renderer.addClass(this.body, 'dark-theme') :
      this.renderer.removeClass(this.body, 'dark-theme');

    try {
      this.storageService.set(this.persistKey, isDarkTheme ? 'dark' : 'light');
    } catch (e) {
      console.error('Not available');
    }
  }
}
