import { Component, OnInit, ViewChild, ChangeDetectorRef, Renderer2 } from '@angular/core';
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

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
    MatTableModule,
    NavBarComponent
  ],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  
  displayedColumns: string[] = ['name', 'email', 'chat'];
  isInputVisible: boolean = false;
  userFriends: Users[] = [];
  userSearchFriend?: Users;
  userId: string = "";
  userEmail?: string | null;
  userInput: string = "";
  input: string = "";
  tracks: Track[] = [];
  currentTrack?: Track;
  selectedFriend?: Users;
  chatLog: any[] = [];
  backgroundImageUrl: string = "";

  @ViewChild('addFriendDialog') addFriendDialogTemplate: any;

  constructor(
    private databaseService: DatabaseService, 
    private trackService: TrackService, 
    private auth: Auth, 
    private cdRef: ChangeDetectorRef, 
    private dialog: MatDialog,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadUserFriendsIds();
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
    friends.forEach(friendId => {
      this.databaseService.GetUser(friendId).subscribe({
        next: (user: Users) => {
          this.userFriends.push(user);
          this.userFriends = this.userFriends.flat();
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
      this.isInputVisible = false; 
      if (this.userEmail !== this.userInput) {
        this.databaseService.GetUserByEmail(this.userInput).subscribe({
          next: (friendEmail: Users[]) => {
            this.userSearchFriend = friendEmail[0]; 
          },
          error: (error: any[]) => {
            console.error('Error fetching data', error);
          }
        });
      }
    }
  }

  addFriendRequest(friend: Users): void {
    this.databaseService.AddFriendRequest(this.userId, friend.uId).subscribe({
      next: () => {
        console.log('Friend added successfully!');
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

  loadChatLog(friend: Users) {
    this.selectedFriend = friend;
    this.databaseService.getConversation(this.userId, friend.uId).subscribe({
      next: (conversation: UserMessages[]) => {
        this.chatLog = conversation;
        this.chatLog = this.chatLog.flat();
        this.chatLog.forEach(message => {
          this.loadTrackInfo(message.songId);
        });
      },
      error: (error) => {
        console.error("Error fetching user conversations", error)
      }
    });
  }

  loadTrackInfo(songId: string): void {
    this.trackService.getTrack(songId).subscribe({
      next: (song: Track) => {
        this.tracks.push(song);
        this.tracks = this.tracks.flat();
        this.cdRef.detectChanges();  // Trigger change detection manually
        
        // Emit the album image URL when the track is loaded
        if (song.album?.images.length > 0) {
          //this.backgroundImageUrl = song.album.images[0].url;
          this.setBackgroundImage(song.album?.images[0].url);
        }
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

  openAddFriendDialog(): void {
    const dialogRef = this.dialog.open(this.addFriendDialogTemplate);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Friend added with email: ', result);
      }
    });
  }

  addFriend(dialogRef: MatDialogRef<any>): void {
    if (this.userEmail) {
      dialogRef.close(this.userEmail); // Close dialog and pass the email back
    }
  }

  // Example function to change background when a track is selected
  selectTrack(track: any): void {
    this.currentTrack = track;
    this.setBackgroundImage(track.album.images[0].url);
  }

  getBackgroundImage() {
    // Check if currentTrack, currentTrack.album, or currentTrack.album.images[0] is null or undefined
    if (this.currentTrack && this.currentTrack.album && this.currentTrack.album.images && this.currentTrack.album.images[0]) {
      return this.currentTrack.album.images[0].url;
    }
    return null; // Return null if the background image URL is not available
  }

  setBackgroundImage(imageUrl: string): void {
    // Apply the background image to the body dynamically
    this.renderer.setStyle(document.body, 'background-image', `url(${imageUrl})`);
    this.renderer.setStyle(document.body, 'background-size', 'cover');
    this.renderer.setStyle(document.body, 'background-position', 'center');
    this.renderer.setStyle(document.body, 'background-attachment', 'fixed'); // Optional: Keeps the background fixed while scrolling
    this.renderer.setStyle(document.body, 'background-repeat', 'no-repeat');
    this.renderer.setStyle(document.body, 'filter', 'none'); // Optional: If you want to blur the background
  }
}
