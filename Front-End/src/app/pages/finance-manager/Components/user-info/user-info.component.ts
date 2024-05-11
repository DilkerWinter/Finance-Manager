import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../../services/authService';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { capitalizeString } from '../../../../../services/captalizeString'; 

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FontAwesomeModule , ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  faUserCicle = faCircleUser;
  userName: string = '';
  totalBalance: number = 0;
  totalEarned: number = 0;
  totalExpend: number = 0;


  constructor(private authService: AuthService, private http: HttpClient){}

  userID: string | null = this.authService.getCurrentUserID();

  ngOnInit(): void {
    
    this.getUserById();

  }

  getUserById() {
    if (this.userID) {
      this.http.get<any>(`http://localhost:3001/api/v1/User/getUser/${this.userID}`)
        .subscribe(
          (data) => {
            this.userName = capitalizeString(data.username);
            console.log(this.userName);
          },
          (error) => {
            console.log('Error fetching user data:', error);
          }
        );
    } else {
      console.log('User ID not available. Cannot fetch user information.');
    }
  }



}