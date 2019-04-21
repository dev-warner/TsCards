import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private filter: string;

  constructor() {}

  get() {
    return this.filter;
  }
  set(filter) {
    this.filter = filter;
  }
  clear() {
    this.filter = null;
  }
}
