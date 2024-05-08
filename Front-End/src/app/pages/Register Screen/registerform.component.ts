import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FontAwesomeModule , RouterLink, FormsModule, HttpClientModule , ReactiveFormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  warning: string = "";
  username: string = "";
  email: string = "";
  password: string = "";

  registerForm = new FormBuilder().group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]], 
    password: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private http: HttpClient){ }

  onSubmit() {

    if (this.registerForm.valid) {
      const userData = {
        username: this.registerForm.value?.username?.toLowerCase(),
        email: this.registerForm.value?.email?.toLowerCase(),
        password: this.registerForm.value.password
      };

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
    } else {
      this.warning = 'Please fill out all fields correctly.';
    }
  }
}