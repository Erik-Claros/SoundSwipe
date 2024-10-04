import { Component } from '@angular/core';
import { DislikeComponent } from "../dislike/dislike.component";
import { LikeButtonComponent } from "../like-button/like-button.component";
import { PlaylistButtonComponent } from '../playlist-button/playlist-button.component';
import { ShareButtonComponent } from '../share-button/share-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DislikeComponent, LikeButtonComponent, PlaylistButtonComponent, ShareButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Correct the typo here
})
export class DashboardComponent {

}
