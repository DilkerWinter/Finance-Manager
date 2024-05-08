import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope , faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';



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
  warning:string = "Please verify your credentials"


  email: string = '';
  password: string = '';

  onSubmit(){
    console.log("Email: ", this.email);
    console.log("Password",  this.password);
  }




}
