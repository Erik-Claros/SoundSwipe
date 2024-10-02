import { Component } from '@angular/core';
import { LikeButtonComponent } from "../like-button/like-button.component";
import { PlaylistButtonComponent } from "../playlist-button/playlist-button.component";
import { ShareButtonComponent } from "../share-button/share-button.component";
import { DislikeComponent } from "../dislike/dislike.component";
import { FriendButtonComponent } from "../friend-button/friend-button.component";


@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [PlaylistButtonComponent, ShareButtonComponent, DislikeComponent, LikeButtonComponent, FriendButtonComponent]
})
export class DashboardComponent {}
