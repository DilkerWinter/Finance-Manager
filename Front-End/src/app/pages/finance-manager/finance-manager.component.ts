import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/authService.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './Components/header/header.component';
import { UserInfoComponent } from './Components/user-info/user-info.component';

@Component({
  selector: 'app-finance-manager',
  standalone: true,
  providers: [HttpClient],
  imports: [CommonModule , HeaderComponent , UserInfoComponent],
  templateUrl: './finance-manager.component.html',
  styleUrl: './finance-manager.component.css'
})

export class FinanceManagerComponent implements OnInit{

  constructor(private authService: AuthService){}
  
  finance:  any;
  totalValue: number = 0;

  ngOnInit(): void {
    
  }




}