
import { Injectable, InjectionToken } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { StorageService } from '../services/storage-service/storage.service';

export const TOGGLE = 'TOGGLE_THEME';

@Injectable({ providedIn: 'root' })
export class DarkThemeReducer {

    constructor(private storage: StorageService) { }

    createReducer() {
        return (
            state: string = (this.storage.get(PERSIST) || 'light'),
            action: Action & { state: string }) => {
            switch (action.type) {
                case TOGGLE:
                    const theme: string = action.state === 'dark' ?
                        'light' :
                        'dark';
                    this.storage.set(PERSIST, theme);
                    return theme;

                default:
                    return state;
            }
        };
    }
}
const PERSIST: 'dark_theme' = 'dark_theme';


export const DARK_THEME = new InjectionToken<ActionReducer<string>>('darkTheme');

export function darkThemeReducerFactory(reducer: DarkThemeReducer) {
    return reducer.createReducer();
}
export const darkTheme = {
    provide: DARK_THEME,
    deps: [DarkThemeReducer],
    useFactory: darkThemeReducerFactory
};
