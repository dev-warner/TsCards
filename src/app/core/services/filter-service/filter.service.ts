import { Injectable} from '@angular/core';
import { Store } from '@ngrx/store';
import { SET, RESET } from '../../store/filter.reducer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  readonly filter: Observable<string>;

  constructor(private store: Store<AppState>) {
    this.filter = store.select('filterPosts');
  }

  get() {
    return this.filter;
  }

  set(current: string) {
    this.store.dispatch({ type: SET, current });
  }

  clear() {
    this.store.dispatch({ type: RESET, current: '' });
  }
}
