import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEnvelope, faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormsModule, ReactiveFormsModule , FormBuilder, Validators} from '@angular/forms';
import { UserService } from '../../services/userService.service';

@Component({
  selector: 'app-registerform',
  standalone: true,
  imports: [FontAwesomeModule , RouterLink, FormsModule, ReactiveFormsModule],
  templateUrl: './registerform.component.html',
  styleUrl: './registerform.component.css'
})
export class RegisterformComponent {
  faEnvelope = faEnvelope;
  faLock = faLock;
  faUser = faUser;
  warning: string = "";
  
  
  



  registerForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(2)]]
  });

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  onSubmit() {
    if (this.registerForm.valid) {
      const username = this.registerForm.value.username || '';
      const email = this.registerForm.value.email || '';
      const password = this.registerForm.value.password || '';

      this.userService.register(username, email, password)
        .subscribe({
          next: (response: any) => {
            this.warning = 'Account Created';
            this.registerForm.reset();
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