import { Component, OnInit, Input } from '@angular/core';
import { formatDate } from '../../../../services/formatDate';

@Component({
  selector: 'app-financecards',
  standalone: true,
  imports: [],
  templateUrl: './financecards.component.html',
  styleUrls: ['./financecards.component.css']
})
export class FinancecardsComponent implements OnInit {
  @Input() finance: any;
  
  financeDateFormated: string = '';


  ngOnInit(): void {
    this.formatDate();
  }

  formatDate() {
    this.financeDateFormated = formatDate(this.finance.date);
  }

}
