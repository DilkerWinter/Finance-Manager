import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope , faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { HttpClient ,HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/authService'; 

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [FontAwesomeModule , RouterLink, FormsModule],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  warning:string = "";

  constructor(private http: HttpClient , private router: Router, private authService: AuthService){ }

  email: string = '';
  password: string = '';

  onSubmit(){
    const userData = {
      userEmail: this.email.toLowerCase(),
      userPassword: this.password
    }

    const loginAPI = 'http://localhost:3001/api/v1/User/userLogin';

    this.http.post(loginAPI, userData)
    .subscribe({
      next: (response: any) => {    
        console.log(response);  
        this.warning = 'Logged';
        this.authService.login();
        this.router.navigate(['/app'])
         
      },
      error: (error: any) => {
        console.log(error);
        this.warning = 'Invalid credentials';
      }
    });
  }
}
