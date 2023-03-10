import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SaveTokenService {
  constructor() {}

  setToken(token: string) {
    localStorage.setItem('TokenDataBase', token);
  }

  getToken() {
    return localStorage.getItem('TokenDataBase');
  }

  clearToken() {
    localStorage.clear();
  }
}
