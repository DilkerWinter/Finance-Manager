import { Component , EventEmitter, Output } from '@angular/core';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { AuthService } from '../../../../services/authService.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-finance',
  standalone: true,
  imports: [FormsModule , FontAwesomeModule , CommonModule],
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})

export class AddFinanceComponent {
  @Output() dialogClosed: EventEmitter<void> = new EventEmitter<void>();


  faXmark = faXmark;

  userID: string | null = this.authService.getCurrentUserID();
  warning: string = '';
  title: string = '';
  description: string | null = '';
  inputdate: Date = new Date('');
  value: number = 0;

  constructor(private financeService: FinanceServiceService, private authService: AuthService, public dialogRef: MatDialogRef<AddFinanceComponent>) { }



  addFinance() {

    if (!this.title || !this.inputdate || this.value == 0) {
      this.warning = "Please fill all the fields correctly";
      return;
    }

    const date = new Date(this.inputdate);
    date.setDate(date.getDate() + 1);

    const finance = {
      "user": {"id": this.userID},
      "title": this.title,
      "description": this.description,
      "date": date,
      "value": this.value
    };

    this.postNewFinance(finance);
  }


  postNewFinance(finance: any) {
    this.financeService.postNewFinance(finance).subscribe(response => {
      this.warning = "New Finance Created"
      this.dialogRef.close();
    }, error => {
      this.warning = "Please fill all the fields correctly"
    });
  }


  closeDialog(): void {
    this.dialogRef.close();
  }

}
