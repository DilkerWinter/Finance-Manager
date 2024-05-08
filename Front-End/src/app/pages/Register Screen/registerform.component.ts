import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FontAwesomeModule , RouterLink, FormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  warning:string = "Please verify your credentials"


  username: string = '';
  email: string = '';
  password: string = '';


  onSubmit(){
    console.log('Username:', this.username);
    console.log('Email: ', this.email);
    console.log('Password: ', this.password);
  }
}
