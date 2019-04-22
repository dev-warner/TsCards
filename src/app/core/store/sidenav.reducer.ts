import { Injectable, InjectionToken } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';
import { MediaMatcher } from '@angular/cdk/layout';

export const TOGGLE = 'TOGGLE';
export const CLOSE = 'CLOSE';
export const OPEN = 'OPEN';

export const SIDE_NAV = new InjectionToken<ActionReducer<boolean>>('sideNav');
export function sidenavReducerFactory(reducer: SideNavReducer) {
    return reducer.createReducer();
}

interface State {
    state: boolean;
}

@Injectable({ providedIn: 'root' })
export class SideNavReducer {

    private isMobile;
    private initalState: boolean;

    constructor(private media: MediaMatcher) {

        this.isMobile = this.media.matchMedia('(max-width: 768px)');

        this.initalState =
            this.isMobile.matches ?
                false :
                true;
    }

    createReducer() {
        return (state = this.initalState, action: Action) => {
            switch (action.type) {
                case TOGGLE:
                    return !state;

                case CLOSE:
                    return false;

                case OPEN:
                    return true;

                default:
                    return state;
            }
        };
    }
}

export const sideNav = {
    provide: SIDE_NAV,
    deps: [SideNavReducer],
    useFactory: sidenavReducerFactory
};
