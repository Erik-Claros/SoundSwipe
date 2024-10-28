import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // path to DashboardComponent
import { LoginComponent } from './login/login.component';  // path to LoginComponent
import { SettingsPageComponent } from './settings-page/settings-page.component';  // path to SettingsPageComponent
import { SignupComponent } from './signup/signup.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Route for login
  {path: 'signup', component: SignupComponent},
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard
  { path: 'settings', component: SettingsPageComponent},  // Route for settings
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default page
];

