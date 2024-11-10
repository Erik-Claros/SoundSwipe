import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { Auth } from '@angular/fire/auth';
import { Users } from '../Models/databaseModel';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    CommonModule
  ]
})
export class NavBarComponent implements OnInit {
  userId: string = '';
  fromIds: string[] = [];  // Incoming requests (from users)
  fromUsers: Users[] = []
  //toIds: string[] = [];    // Sent requests (to users)

  constructor(private router: Router, private databaseService: DatabaseService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.checkIncomingRequests();
    //console.log("UserIds: ", this.fromIds)
  }

  loadUserInfo(): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
    }
  }

  accountClicked() {
    this.router.navigate(['/account']);
  }

  friendClicked() {
    this.router.navigate(['/friend']);
  }

  likedSongClicked() {
    this.router.navigate(['/liked']);
  }

  historyClicked() {
    this.router.navigate(['/history']);
  }

  settingClicked() {
    this.router.navigate(['/settings']);
  }

  // These methods handle the specific submenu clicks for Friend Requests
  receivedRequestsClicked() {
    console.log('Received Friend Requests clicked');
    // Handle received requests action
  }

  sentRequestsClicked() {
    console.log('Sent Friend Requests clicked');
    // Handle sent requests action
  }

  checkIncomingRequests() {
    // Service call to check incoming requests (from users)
    this.databaseService.checkFromFriendRequests(this.userId).subscribe({
      next: (ids: string[]) => {
        this.fromIds.concat(ids);
      },
      error: (error) => {
        console.error('Error checking incoming requests:', error);
      }
    });

    this.fromIds.forEach(id => {
      this.databaseService.GetUser(id).subscribe({
        next: (user: Users) => {  // Expecting a single 'user' here
          this.fromUsers.push(user);  // Push each individual user to the array
        },
        error: (error) => {
          console.error('Error fetching user:', error);
        }
      });
    });

    }

  // Methods for handling actions on Friend Requests
  acceptRequest(userId: string): void {
    console.log('Accepted request from', userId);
    // Call service to accept the request (you would need to implement this in your service)
  }

  declineRequest(userId: string): void {
    console.log('Declined request from', userId);
    // Call service to decline the request (you would need to implement this in your service)
  }

  // This is for if we want to cancel friend request in the future
  // checkPendingRequests() {
  //   // Service call to check pending requests (to users)
  //   this.databaseService.checkToFriendRequests(this.userId).subscribe({
  //     next: (ids: string[]) => {
  //       this.toIds = ids;
  //       console.log(this.toIds);  // Log pending requests for debugging
  //     },
  //     error: (error) => {
  //       console.error('Error checking pending requests:', error);
  //     }
  //   });
  // }
  // cancelSentRequest(userId: string): void {
  //   console.log('Cancelled sent request to', userId);
  //   // Call service to cancel the sent request (you would need to implement this in your service)
  // }
}
