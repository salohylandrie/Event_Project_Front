import { Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { authGuard } from './auth/auth.guard';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';
import { EvenementFormComponent } from './pages/evenement-form/evenement-form.component';
 
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'add', component: EvenementFormComponent },
  { path: 'edit/:id', component: EvenementFormComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin', component: AdminComponent, canActivate: [authGuard],data: { role: 'ROLE_ADMIN' } },
  { path: 'user', component: UserComponent, canActivate: [authGuard] , data: { role: 'ROLE_USER' }},
  
];
