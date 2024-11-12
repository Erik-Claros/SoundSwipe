import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { UserMessages, Users } from '../Models/databaseModel';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [ 
    CommonModule, 
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    BackToTopComponent,
    BackButtonComponent,
    MatDialogModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatTableModule
  ],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'email', 'chat'];
  isInputVisible: boolean = false;
  //test: Users = { firstName: "test", lastName: "test", email: "test@", pfp: "", uId: "test" }
  userFriends: Users[] = [];
  userSearchFriend?: Users; // Change this to hold the user object
  userId: string = "";
  userEmail?: string | null;
  userInput: string = "";
  input: string = ""

    // To track the selected friend for chat
    selectedFriend?: Users;
  
    // Dummy chat logs for demonstration
    chatLog: any[] = [];

  constructor(private databaseService: DatabaseService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadUserFriendsIds();
    //console.log(this.userSearchFriend);
    //this.userSearchFriend = {firstName: "test", lastName: "test", uId: "test", email: "ete005@latech.edu", pfp: "test"};

  }

  loadUserInfo(): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
      this.userEmail = this.auth.currentUser.email;
    }
  }

  loadUserFriendsIds(): void {
    this.databaseService.GetUserFriends(this.userId).subscribe({
      next: (ids: string[]) => {
        this.loadUserFriends(ids);
      },
      error: (error: any) => {
        console.error('Error fetching friend ids', error);
      }
    });
  }

  loadUserFriends(friends: string[]): void {
    //console.log("friends", friends);
    friends.forEach(friendId => {
      this.databaseService.GetUser(friendId).subscribe({
        next: (user: Users) => {
          this.userFriends.push(user);
          this.userFriends = this.userFriends.flat();
          console.log(this.userFriends);
        },
        error: (error: any[]) => {
          console.error('Error loading friends', error);
        }
      });
    });
  }

  showInputBox(): void {
    this.isInputVisible = true;
  }

  handleInput(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.userInput.trim() !== '') {
      this.isInputVisible = false; // Hide input box
      if (this.userEmail !== this.userInput) {
        this.databaseService.GetUserByEmail(this.userInput).subscribe({
          next: (friendEmail: Users[]) => {
            this.userSearchFriend = friendEmail[0]; // Store the entire user object
            console.log(friendEmail[0]);
          },
          error: (error: any[]) => {
            console.error('Error fetching data', error);
          }
        });
      }
      
    }
  }

  addFriendRequest(friend: Users): void {
    // Logic to add the friend, e.g., updating the database
    console.log(`Adding friend: ${friend.firstName} ${friend.lastName}`);
    
    // Example service call to add the friend
    this.databaseService.AddFriendRequest(this.userId, friend.uId).subscribe({
      next: () => {
        console.log('Friend added successfully!');
        // Optionally, show a success message or update the UI
      },
      error: (error) => {
        console.error('Error adding friend request:', error);
      }
    });
  }

  isAlreadyFriends(email: string): boolean {
    return this.userFriends.some(friend => friend.email === email);
  }

  sendMessage() {
    console.log("Sending message");
  }

  // Dummy chat log loading (Replace with actual API call later)
  loadChatLog(friend: Users) {
    this.selectedFriend = friend;
    this.databaseService.getConversation(this.userId, friend.uId).subscribe({
      next: (conversation: UserMessages[]) => {
        this.chatLog = conversation;
        this.chatLog = this.chatLog.flat();
        console.log("log", this.chatLog);
      },
      error: (error) => {
        console.error("Error fetching user conversations", error)
      }
    })
  }

}
