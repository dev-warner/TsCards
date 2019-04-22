import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsStringService {

  constructor() { }

  isString(value) {
    return typeof value === 'string' || value instanceof String;
  }
}
