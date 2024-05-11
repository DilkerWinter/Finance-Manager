import { Component } from '@angular/core';

@Component({
  selector: 'app-financecards',
  standalone: true,
  imports: [],
  templateUrl: './financecards.component.html',
  styleUrl: './financecards.component.css'
})
export class FinancecardsComponent {
  financeTitle: string = "Teste de titulo";
  financeDescription: string = "Teste de Descricao"
  financeDate: Date = new Date(2010, 9, 10);
  financeValue: number = 100.00;

}
