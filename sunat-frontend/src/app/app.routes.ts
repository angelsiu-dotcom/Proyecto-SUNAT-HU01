import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RecursosComponent } from './pages/recursos/recursos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'recursos-impugnatorios', component: RecursosComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];