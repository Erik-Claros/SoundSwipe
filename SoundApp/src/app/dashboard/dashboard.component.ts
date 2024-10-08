import { Component } from '@angular/core';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { DislikeComponent } from '../dislike/dislike.component';
import { PlaylistButtonComponent } from '../playlist-button/playlist-button.component';
import { ShareButtonComponent } from '../share-button/share-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PlaylistButtonComponent, ShareButtonComponent, DislikeComponent, LikeButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent {

}
