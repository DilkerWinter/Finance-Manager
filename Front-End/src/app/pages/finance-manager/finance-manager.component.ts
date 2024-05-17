import { Component, OnInit , OnChanges , SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { AddFinanceComponent } from './Components/add-finance/add-finance.component';
import { UpdateFinanceComponent } from './Components/update-finance/update-finance.component';

@Component({
  selector: 'app-finance-manager',
  standalone: true,
  providers: [HttpClient , FontAwesomeModule],
  imports: [CommonModule , HeaderComponent , UserInfoComponent ,FinancecardsComponent, FontAwesomeModule, GraphComponent ],
  templateUrl: './finance-manager.component.html',
  styleUrl: './finance-manager.component.css'
})

export class FinanceManagerComponent implements OnInit , OnChanges{
  @ViewChild(UserInfoComponent) userInfoComponent!: UserInfoComponent;
  @ViewChild(GraphComponent) GraphComponent!: GraphComponent;

  faCaretRight = faCaretRight;
  faCaretLeft = faCaretLeft;
  faAngleRight = faAngleRight;
  faAngleLeft = faAngleLeft;


  fadeOut: boolean = false;

  userID: string | null = this.authService.getCurrentUserID();

  constructor(private authService: AuthService, private financeService: FinanceServiceService , private cd: ChangeDetectorRef , public dialog: MatDialog){}
  
  finance:  any;
  financeIndex: number = 0;

  financeDialogData: any | null = null;


  ngOnInit(): void {
    this.loadFinanceData();
    this.userInfoComponent.reloadData();
    this.GraphComponent.reloadGraph();
  }

  loadFinanceData() {
    this.financeService.getFinancebyIdOrderbyDate(this.userID ?? '').subscribe(
      (data) => {
        this.finance = data;
      },
      (error) => {
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

  openAddFinanceDialog(): void {
    let dialogRef = this.dialog.open(AddFinanceComponent);
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  

  openUpdateFinanceDialog(finance: any) {
    this.financeDialogData = finance;
    let dialogRef = this.dialog.open(UpdateFinanceComponent, {
      data: finance,
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
}