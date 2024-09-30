import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // path to DashboardComponent

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }  // Default page
];

