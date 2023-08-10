import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: any;
  constructor() { }
  loadFromLocalStorage() {
    const storedContent = localStorage.getItem('User');
    if (storedContent) {
      return this.user = JSON.parse(storedContent);
    } else {
      this.user = [];
    }
  }
}
