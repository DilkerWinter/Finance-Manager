import { Component , OnInit} from '@angular/core';
import { FinanceServiceService } from '../../../../services/financeService.service';
import { AuthService } from '../../../../services/authService.service';

@Component({
  selector: 'app-add-finance',
  templateUrl: './add-finance.component.html',
  styleUrls: ['./add-finance.component.css']
})
export class AddFinanceComponent implements OnInit{

  userID: string | null = this.authService.getCurrentUserID();
  title: string = 'Compra no mercadim 1';
  description: string | null = '';
  inputdate: Date = new Date('2024-07-24');
  value: number = 20;

  constructor(private financeService: FinanceServiceService, private authService: AuthService) { }

  ngOnInit(): void {
  }



  addFinance() {
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
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
