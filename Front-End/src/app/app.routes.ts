import { Routes } from '@angular/router';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';
import { FinanceManagerComponent } from './pages/finance-manager/finance-manager.component';

export const routes: Routes = [
    { path: '', component: LoginScreenComponent},
    { path: 'app', component: FinanceManagerComponent }, 
    { path: '**', redirectTo: '/' } 
];
