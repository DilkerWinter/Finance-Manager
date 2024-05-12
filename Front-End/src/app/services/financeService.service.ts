import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceServiceService {
  private baseUrl = 'http://localhost:3001/api/v1/Finance/';
  private userID: string = ''; 

  constructor(private http: HttpClient) { }

  getFinancebyIdOrderbyDate(userID: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}getFinancebyUserIdOrderbyDate/${userID}`);
  }

  
}
