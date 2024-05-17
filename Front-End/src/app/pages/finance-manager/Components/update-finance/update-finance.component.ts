import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { AuthService } from '../../../../services/authService.service';


@Component({
  selector: 'app-update-finance',
  standalone: true,
  imports: [FormsModule , FontAwesomeModule , CommonModule],
  templateUrl: './update-finance.component.html',
  styleUrl: './update-finance.component.css'
})
export class UpdateFinanceComponent {
  faXmark = faXmark;

  warning: string = ''

  userID: string | null = this.authService.getCurrentUserID();
  finance: any;
  id: any;
  title: any;
  description: any;
  value: any;
  inputdate: any;
  date:any ;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<UpdateFinanceComponent>, private financeService: FinanceServiceService, private authService: AuthService) {
      this.finance = data.finance;
      this.title = data.title;
      this.description = data.description;
      this.value = data.value;
      this.id = data.id;

    }



  updateFinance(): void{

    this.date = new Date(this.inputdate);
    this.date.setDate(this.date.getDate() + 1);  
    console.log(this.date)
    console.log(this.inputdate)
    console.log(this.data);
    const updatedFinance = {
      "id": this.id,
      "user": {"id": this.userID},
      "title": this.title,
      "description": this.description,
      "date": this.date,
      "value": this.value
    };  
    
    this.financeService.patchFinance(this.id, updatedFinance).subscribe(
      (response: any) => {
        this.dialogRef.close();
      },
      (error: any) => {
        this.warning = "Please fill all the fields correctly"
      }
    );
  
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  deleteFinance(): void {
    this.financeService.deleteFinance(this.id).subscribe(
      (response: any) => {
        this.dialogRef.close();
      },
      (error: any) => {
        this.dialogRef.close();
      }
    );
  }
}
