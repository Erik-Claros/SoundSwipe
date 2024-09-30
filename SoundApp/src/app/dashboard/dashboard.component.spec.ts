import { Component } from '@angular/core';
import { PlaylistButtonComponent } from "../playlist-button/playlist-button.component";
import { ShareButtonComponent } from "../share-button/share-button.component";
import { DislikeComponent } from "../dislike/dislike.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [PlaylistButtonComponent, ShareButtonComponent, DislikeComponent]
})
export class DashboardComponent {}
