import { Routes } from '@angular/router';
import {} from './pages/Login Screen/loginform.component'
import { RegisterformComponent } from './pages/Register Screen/registerform.component';
import { FinanceManagerComponent } from './pages/finance-manager/finance-manager.component';
import { LoginformComponent } from './pages/Login Screen/loginform.component';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    { path: 'login', component: LoginformComponent},
    { path: 'register', component: RegisterformComponent},
    { path: 'app', component: FinanceManagerComponent, canActivate: [AuthGuard] }, 
    { path: '**', redirectTo: '/login' } 
];
