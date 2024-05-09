  import { Component, OnInit } from '@angular/core';
  import { AuthService } from '../../../services/authService';
  import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

  @Component({
    selector: 'app-finance-manager',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './finance-manager.component.html',
    styleUrl: './finance-manager.component.css'
  })
  export class FinanceManagerComponent implements OnInit{


    constructor(private authService: AuthService, private http: HttpClient){}
    
    finance:  any;
    userID: string | null = this.authService.getCurrentUserID();
    totalValue: number = 0;
    
    ngOnInit(): void {
      this.getFinancebyID();
    }

    getFinancebyID(){
      this.http.get<any>(`http://localhost:3001/api/v1/Finance/getFinancebyUserId/${this.userID}`).subscribe(
        (data) => {
          this.finance = data;
          this.calculateTotalValue();
        },
        (error) => {
          console.log('Error fetching finance data:', error);
        }
      );
    }

    calculateTotalValue(){
      this.totalValue = 0;
      if (Array.isArray(this.finance)) {
        for (const finance of this.finance) {
          this.totalValue += finance.value;
        }
      }
    }
  }
