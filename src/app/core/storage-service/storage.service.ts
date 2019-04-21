import { Injectable } from '@angular/core';

export interface StorageOject {
  theme?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private store: Storage;

  constructor() {
    this.store = localStorage;
  }

  set(key: keyof StorageOject, value) {
    this.store.setItem(key, value);
  }

  get(key: keyof StorageOject) {
    if (!this.store.hasOwnProperty(key)) {
      return;
    }

    return this.store.getItem(key);
  }

  clear() {
    this.store.clear();
  }


  remove(key) {
    this.store.removeItem(key);
  }
}
