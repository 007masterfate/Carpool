import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
  constructor() {}

  setUser(name: string) {
    localStorage.setItem('user', name);
  }

  getUser() {
    return localStorage.getItem('user');
  }

  setUserId(id:string){
    localStorage.setItem('Id',id);
  }

  getUserId(){
    return Number(localStorage.getItem('Id'));
  }
}
