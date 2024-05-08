import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FontAwesomeModule , RouterLink, FormsModule, HttpClientModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  warning:string = "";

  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient){ }

  onSubmit(){
    const userData = {
      username: this.username.toLowerCase(),
      email: this.email.toLowerCase(),
      password: this.password
    }
 
    const newUserAPI = 'http://localhost:3001/api/v1/User/newUser';

    this.http.post(newUserAPI, userData)
      .subscribe({
        next: (response: any) => {          
          this.warning = 'Accont Created'; 
        },
        error: (error: any) => {
          this.warning = 'Invalid or already existing account';
        }
      });
  }
}
