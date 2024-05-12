import { Component, OnInit , OnChanges , SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/authService.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';
import { FinancecardsComponent } from './Components/financecards/financecards.component';
import { FinanceServiceService } from '../../services/financeService.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCaretRight , faCaretLeft , faAngleRight , faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { GraphComponent } from './Components/graph/graph.component';

@Component({
  selector: 'app-finance-manager',
  standalone: true,
  providers: [HttpClient , FontAwesomeModule],
  imports: [CommonModule , HeaderComponent , UserInfoComponent ,FinancecardsComponent, FontAwesomeModule, GraphComponent ],
  templateUrl: './finance-manager.component.html',
  styleUrl: './finance-manager.component.css'
})

export class FinanceManagerComponent implements OnInit , OnChanges{
  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;

  fadeOut: boolean = false;

  userID: string | null = this.authService.getCurrentUserID();

  constructor(private authService: AuthService, private financeService: FinanceServiceService , private cd: ChangeDetectorRef){}
  
  finance:  any;
  financeIndex: number = 0;

  ngOnInit(): void {
    this.loadFinanceData();

  }

  loadFinanceData() {
    this.financeService.getFinancebyIdOrderbyDate(this.userID ?? '').subscribe(
      (data) => {
        this.finance = data;
      },
      (error) => {
        console.log('Error fetching finance data:', error);
      }
    );
  }


  onNext() {
    if (this.financeIndex + 3 < this.finance.length) {
      this.financeIndex += 3;
      this.cd.detectChanges();
    }
  }
  
  onPrevious() {
    if (this.financeIndex - 3 >= 0) {
      this.financeIndex -= 3;
      
      this.cd.detectChanges();
    }
  }
  
  isPreviousDisabled() {
    return this.financeIndex - 3 < 0;
  }
  
  isNextDisabled() {
    return this.financeIndex + 3 >= this.finance.length;
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['financeIndex']) {
      this.cd.detectChanges();
    }
  }


}