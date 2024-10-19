import { Component } from '@angular/core';
import { DislikeComponent } from "../dislike/dislike.component";
import { LikeButtonComponent } from '../like-button/like-button.component';
import { PlaylistButtonComponent } from '../playlist-button/playlist-button.component';
import { ShareButtonComponent } from '../share-button/share-button.component';
import { FriendButtonComponent } from "../friend-button/friend-button.component";
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    PlaylistButtonComponent, 
    ShareButtonComponent, 
    DislikeComponent, 
    LikeButtonComponent, 
    FriendButtonComponent, 
    NavBarComponent,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {
  dislikeClicked() {
    console.log('Dislike button clicked!!');
  }

}
