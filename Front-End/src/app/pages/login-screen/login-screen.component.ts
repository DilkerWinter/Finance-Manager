import { Component } from '@angular/core';
import { LoginformComponent } from './components/loginform/loginform.component';
import { RegisterformComponent } from './components/registerform/registerform.component';

@Component({
  selector: 'app-login-screen',
  standalone: true,
  imports: [LoginformComponent , RegisterformComponent],
  templateUrl: './login-screen.component.html',
  styleUrl: './login-screen.component.css'
})
export class LoginScreenComponent {

}
