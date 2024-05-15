import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-finance',
  standalone: true,
  imports: [],
  templateUrl: './update-finance.component.html',
  styleUrl: './update-finance.component.css'
})
export class UpdateFinanceComponent {
  finance: any;
  id: any;
  title: any;
  description: any;
  value: any;
  date: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.finance = data.finance;
    this.title =  data.title;
    this.description = data.description;
    this.value = data.value;
    this.date = data.date;
    this.id = data.id;

    console.log('Id: ', this.id)
    console.log('Finance:', this.finance);
    console.log('Title:', this.title);
    console.log('Description:', this.description);
    console.log('Value:', this.value);
    console.log('Date:', this.date);
  }

}
