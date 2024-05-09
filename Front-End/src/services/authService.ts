import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private Authenticated: boolean = false;

  constructor() { }

  login() {
    this.Authenticated = true;
  }

  logout() {
    this.Authenticated = false;
  }

  public isAuthenticated(): boolean {
    return this.Authenticated;
  }
}
