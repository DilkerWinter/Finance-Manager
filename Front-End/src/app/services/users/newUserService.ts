import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  
  constructor(private http: HttpClient) { }
  
  createUser(userData: any) {
  return this.http.post('http://localhost:3001/api/v1/User/newUser', userData);
  }


}