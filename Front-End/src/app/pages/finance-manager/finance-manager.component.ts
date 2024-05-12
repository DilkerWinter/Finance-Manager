import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { FinancecardsComponent } from './Components/financecards/financecards.component';
import { FinanceServiceService } from '../../services/financeService.service';

@Component({
  selector: 'app-finance-manager',
  standalone: true,
  providers: [HttpClient],
  imports: [CommonModule , HeaderComponent , UserInfoComponent ,FinancecardsComponent ],
  templateUrl: './finance-manager.component.html',
  styleUrl: './finance-manager.component.css'
})

export class FinanceManagerComponent implements OnInit{

  userID: string | null = this.authService.getCurrentUserID();

  constructor(private authService: AuthService, private financeService: FinanceServiceService){}
  
  finance:  any;
  currentIndex: number = 0;


  ngOnInit(): void {
    this.loadFinanceData();

  }

  loadFinanceData() {
    this.financeService.getFinancebyIdOrderbyDate(this.userID ?? '').subscribe(
      (data) => {
        this.finance = data;
        console.log(this.finance[0]);
        console.log(this.finance[1]);
        console.log(this.finance[2]);
      },
      (error) => {
        console.log('Error fetching finance data:', error);
      }
    );
  }


}