import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/authService.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const userID = this.authService.getCurrentUserID();


    if (userID && this.authService.isAuthenticated()) {
      return true;
    } else {
        console.log(userID);
      this.router.navigate(['/login']);
      return false;
    }
  }
}
