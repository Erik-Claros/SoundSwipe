import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { Auth } from '@angular/fire/auth';
import { Users, FriendRequests } from '../Models/databaseModel';

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
    MatListModule,
    CommonModule
  ]
})
export class NavBarComponent implements OnInit {
  userId: string = '';
  //test: Users = { firstName: "test", lastName: "test", email: "test@", pfp: "", uId: "test" }
  fromUsers: Users[] = []//this.test]

  constructor(private router: Router, private databaseService: DatabaseService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.checkIncomingRequests();
  }

  loadUserInfo(): void {
    // if (this.auth.currentUser) {
    //   this.userId = this.auth.currentUser.uid;
    // }
    this.userId = "lJvLmgfcHXZoOYUF7odNBAZ41Af1"
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
        this.loadUsers(ids);
        //console.log("ids: ", ids);
        //console.log("fromIds: ", this.fromIds.concat(ids));
      },
      error: (error) => {
        console.error('Error checking incoming requests:', error);
      }
    });
    }

  loadUsers(ids: string[]) {
    ids.forEach(id => {
      console.log("id", id);
      this.databaseService.GetUser(id).subscribe({
        next: (user: Users) => {  // Expecting a single 'user' here
          this.fromUsers.push(user);  // Push each individual user to the array
          
        // Flatten the array to avoid nested structures
        this.fromUsers = this.fromUsers.flat();

        // Now, log the flattened structure
        //console.log("Users", this.fromUsers);
        //console.log("Users[0]", this.fromUsers[0]);
        //console.log("firstName", this.fromUsers[0].firstName);  // Access the first name correctly
        },
        error: (error) => {
          console.error('Error fetching user:', error);
        }
      });
    });
  }

  // Methods for handling actions on Friend Requests
  acceptRequest(senderId: string): void {
    console.log('Accepted request from', senderId);
    // Example service call to add the friend
    this.databaseService.AddFriends(this.userId, senderId).subscribe({
      next: () => {
        console.log('Friend added successfully!');
        // Optionally, show a success message or update the UI
        this.removeRequest(senderId);
      },
      error: (error) => {
        console.error('Error adding friend request:', error);
      }
    });
  }

  removeRequest(senderId: string): void {
    //console.log('Declined request from', userId);
    var request: FriendRequests = { fromId: senderId, toId: this.userId }

    this.databaseService.removeFriendRequest(request).subscribe({
      next: (response) => {
        console.log('Friend request removed successfully', response);
      },
      error: (error) => {
        console.error('Error removing friend request', error);
      }
    });
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
