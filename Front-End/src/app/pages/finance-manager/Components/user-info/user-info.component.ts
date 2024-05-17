import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {  faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../../../services/authService.service';
import { OnInit } from '@angular/core';
import { UserService } from '../../../../services/userService.service';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [FontAwesomeModule , NgClass],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit{
  faUserCicle = faCircleUser;
  userName: string = '';
  totalBalance: number = 0;
  totalEarned: number = 0;
  totalExpend: number = 0;
  financeData: any;

  constructor(private authService: AuthService, private userService: UserService, private financeService: FinanceServiceService){}

  userID: string | null = this.authService.getCurrentUserID();

  ngOnInit(): void {
    this.loadUserName();
    this.loadFinanceData();
  }

  loadUserName() {
    this.userService.getUserNameById(this.userID ?? '').subscribe(
      userName => {
        this.userName = userName;
      }
    );
  }

  loadFinanceData() {
    this.financeService.getFinancebyIdOrderbyDate(this.userID ?? '').subscribe(
      (data) => {
        this.financeData = data;
        this.calculateTotalValue();
        this.calculateTotalEarned();
        this.calculateTotalExpend();
      },
      (error) => {
        console.log('Error fetching finance data:', error);
      }
    );
  }


  calculateTotalValue(){
    this.totalBalance = 0;
    if (Array.isArray(this.financeData)) {
      for (const finance of this.financeData) {
        this.totalBalance += finance.value;
        
      }
    } 
  }
  
  getAbsoluteTotalBalance():number {
    return Math.abs(this.totalBalance);
  }

  calculateTotalEarned(){
    this.totalEarned = 0;
    if (Array.isArray(this.financeData)){
      for (const finance of this.financeData){
        if (finance.value > 0){
          this.totalEarned += finance.value;
        }
      }
    }
  }

  calculateTotalExpend(){
    this.totalExpend = 0;
    if (Array.isArray(this.financeData)){
      for (const finance of this.financeData){
        if (finance.value < 0){
          this.totalExpend += Math.abs(finance.value) ;
        }
      }
    }
  }

  reloadData() {
    this.loadFinanceData();
  }
}