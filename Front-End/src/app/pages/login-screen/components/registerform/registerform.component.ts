import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  warning:string = "Please verify your credentials"

}
