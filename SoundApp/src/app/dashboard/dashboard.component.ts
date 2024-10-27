import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { TrackComponent } from '../track-component/track-component.component';
import { Auth } from '@angular/fire/auth';
import { Users } from '../Models/databaseModel';
import { DatabaseService } from '../Services/database-service/database-service.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    NavBarComponent,
    MatButtonModule, 
    TrackComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements AfterViewInit {
  backgroundImageUrl: string = '';
  userName: string | null = '';  
  userEmail: string | null = '';  
  userUID: string | null = '';
  constructor(private auth: Auth, private databaseService: DatabaseService) {}

  // Method to retrieve user info
  getUserInfo() {
    const user = this.auth.currentUser;

    if (user) {
      this.userName = user.displayName;
      this.userEmail = user.email;
      this.userUID = user.uid;
      this.addUserToDB();
      console.log('User UID:', this.userUID);
      console.log('User Name:', this.userName);
      console.log('User Email:', this.userEmail);
    } else {
      console.log('No user is logged in.');
    }
  }

  ngOnInit(): void {
    // Retrieve user info when the dashboard is initialized
    this.getUserInfo();
  }
  onBackgroundImageUrlReceived(url: string) {
    this.backgroundImageUrl = url;
  }

  ngAfterViewInit(): void {
  }

  addUserToDB(): void {
    if(this.userUID != null && this.userEmail != null && this.userName != null) {
      const userToAdd: Users = {
      uId: this.userUID,
      email: this.userEmail,
      firstName: this.userName.split(" ")[0],
      lastName: this.userName.split(" ")[1],
      pfp: ''
    }

    this.databaseService.AddUser(userToAdd).subscribe({
      error: (error) => console.error('Error adding user:', error)
    });
    }
    



  }
}


