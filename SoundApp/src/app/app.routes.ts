import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';  // path to DashboardComponent
import { LoginComponent } from './login/login.component';  // path to LoginComponent
import { SignupComponent } from './signup/signup.component';
import { AccountComponent } from './account/account.component';  // path to AccountComponent
import { FriendsComponent } from './friends/friends.component';  // path to FriendComponent
import { LikedSongsComponent } from './liked-songs/liked-songs.component';  // path to LikedSongsComponent
import { HistoryComponent } from './history/history.component';  // path to History Component
import { SettingsComponent } from './settings/settings.component';  // path to SettingsComponent

export const routes: Routes = [
  { path: 'login', component: LoginComponent },  // Route for login
  {path: 'signup', component: SignupComponent},
  {path: 'account', component: AccountComponent},
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard
  { path: 'friend', component: FriendsComponent },  // Route for friends
  { path: 'liked', component: LikedSongsComponent },  // Route for liked  
  { path: 'history', component: HistoryComponent },  // Route for history
  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Default page
];

