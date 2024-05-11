import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {
  faUserCicle = faCircleUser;
  userName: string = 'Bruno Winter';
  totalBalance: number = 1000.00;
  totalEarned: number = 110.50;
  totalExpend: number = 10.00;
}
