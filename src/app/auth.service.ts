import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string = 'https://localhost:44336/auth/'

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(this.baseUrl+'register', user);
  }

  login(user: any) {
    return this.http.post(this.baseUrl+'login', user);
  }

  logout() {
    localStorage.removeItem('username');
    localStorage.removeItem('token_value');
  }

  get userName() {
    return localStorage.getItem('username');
  }

  get isAuthenticated() {
    return !!localStorage.getItem('token_value');
  }

}
