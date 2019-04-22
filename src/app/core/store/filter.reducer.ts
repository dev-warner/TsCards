import { Injectable, InjectionToken } from '@angular/core';
import { Action, ActionReducer } from '@ngrx/store';

export const SET = 'SET';
export const RESET = 'RESET';

type FilterAction = Action & { current: string };

export const FILTER_POSTS = new InjectionToken<ActionReducer<string, FilterAction>>('filter_posts');

export function filterPostsReducerFactory(reducer: FilterPostsReducer) {
    return reducer.createReducer();
}

@Injectable({ providedIn: 'root' })
export class FilterPostsReducer {

    private key = 'filter_posts';

    constructor() { }


    createReducer() {
        return (state: string = '', action: FilterAction) => {
            switch (action.type) {
                case SET:
                    return action.current;

                case RESET:
                    return '';

                default:
                    return state;
            }
        };
    }
}

export const filterPosts = {
    provide: FILTER_POSTS,
    deps: [FilterPostsReducer],
    useFactory: filterPostsReducerFactory
};
