import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY_PREFIX = 'auth_token_';
  private readonly CURRENT_USER_KEY = 'current_user_id';

  constructor() { }

  login(userID: string) {
    sessionStorage.setItem(this.getAuthKey(userID), 'true');
    sessionStorage.setItem(this.CURRENT_USER_KEY, userID);
  }

  logout() {
    const userID = this.getCurrentUserID();
    if (userID) {
      sessionStorage.removeItem(this.getAuthKey(userID));
    }
    sessionStorage.removeItem(this.CURRENT_USER_KEY);
  }

  isAuthenticated(): boolean {
    const userID = this.getCurrentUserID();
    return !!userID && this.getAuthKey(userID) in sessionStorage;
  }

  getCurrentUserID(): string | null {
    return sessionStorage.getItem(this.CURRENT_USER_KEY);
  }

  private getAuthKey(userID: string): string {
    return `${this.AUTH_KEY_PREFIX}${userID}`;
  }
}
