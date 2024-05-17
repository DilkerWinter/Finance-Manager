import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope , faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/authService.service';
import { UserService } from '../../services/userService.service';

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

  constructor(private router: Router, private authService: AuthService,private userService: UserService){ }

  email: string = '';
  password: string = '';


  onSubmit(){
    this.userService.login(this.email, this.password)
      .subscribe({
        next: (response: any) => {
          this.warning = 'Logged';
          this.authService.login(response);
          this.router.navigate(['/app']);
        },
        error: (error: any) => {
          this.warning = 'Invalid credentials';
        }
      });
  }
}
