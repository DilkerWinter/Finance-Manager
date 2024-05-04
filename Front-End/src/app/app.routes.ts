import { Routes } from '@angular/router';
import { LoginScreenComponent } from './pages/login-screen/login-screen.component';

export const routes: Routes = [
    {path: '', component:LoginScreenComponent},
    {path: '*', redirectTo: '/'}
];
