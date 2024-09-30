import { Component } from '@angular/core';
import { PlaylistButtonComponent } from "../playlist-button/playlist-button.component";
import { ShareButtonComponent } from "../share-button/share-button.component";

@Component({
  selector: 'app-dashboard',
  standalone: true,  // Ensure this is marked as standalone
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [PlaylistButtonComponent, ShareButtonComponent]
})
export class DashboardComponent {}
