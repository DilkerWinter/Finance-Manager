import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { capitalizeString } from './captalizeString';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3001/api/v1/User/'; 

  constructor(private http: HttpClient) { }


  register(username: string, email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}newUser`;
    const userData = { username: username.toLowerCase(), email: email.toLowerCase(), password };
    return this.http.post(url, userData);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.baseUrl}userLogin`;
    const userData = {
      userEmail: email.toLowerCase(),
      userPassword: password
    };

    return this.http.post(url, userData)
      .pipe(
        map(response => {
          return response;
        })
      );
  }




  getUserNameById(userId: string): Observable<string> {
    if (userId) {
      const url = `${this.baseUrl}getUser/${userId}`;
      return this.http.get<any>(url) 
        .pipe(
          map(data => capitalizeString ? capitalizeString(data.username) : data.username)
        );
    } else {
      return of('User ID not available.');
    }
  }





}
