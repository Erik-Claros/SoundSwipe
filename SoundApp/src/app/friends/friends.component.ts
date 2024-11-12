import { Component, OnInit, ViewChild } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { TrackService } from '../Services/track-service/track-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Songs, UserMessages, Users } from '../Models/databaseModel';
import { Track, Artist } from '../Models/track.model';
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
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';


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
  input: string = "";
  tracks: Track[] = [];
  currentTrack?: Track;

    // To track the selected friend for chat
    selectedFriend?: Users;
  
    // Dummy chat logs for demonstration
    chatLog: any[] = [];

  @ViewChild('addFriendDialog') addFriendDialogTemplate: any;
  constructor(private databaseService: DatabaseService, private trackService: TrackService, private auth: Auth, private cdRef: ChangeDetectorRef, private dialog: MatDialog) {}

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
        this.chatLog.forEach(message => {
          this.loadTrackInfo(message.songId);
        })
        //console.log("log", this.chatLog);
      },
      error: (error) => {
        console.error("Error fetching user conversations", error)
      }
    })
  }

  loadTrackInfo(songId: string): void {
    this.trackService.getTrack(songId).subscribe({
      next: (song: Track) => {
        this.tracks.push(song);
        this.tracks = this.tracks.flat();
        this.cdRef.detectChanges();  // Trigger change detection manually
      },
      error: (error: any[]) => {
        console.error('Error loading liked songs:', error);
      }
    });
  }

  updateCurrentTrack(tId: string): void {
    this.currentTrack = this.tracks.find(track => track.id === tId);
  }

  getArtistNames(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  // Open the Add Friend dialog
  openAddFriendDialog(): void {
    const dialogRef = this.dialog.open(this.addFriendDialogTemplate);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Friend added with email: ', result);
        // Call a method to handle adding the friend based on the email
      }
    });
  }

  // Add Friend logic (This can be your existing add friend functionality)
  addFriend(dialogRef: MatDialogRef<any>): void {
    if (this.userEmail) {
      console.log('Email to add friend: ', this.userEmail);
      dialogRef.close(this.userEmail); // Close dialog and pass the email back
    }
  }
}
