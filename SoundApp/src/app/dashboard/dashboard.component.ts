import { Component } from '@angular/core';
import { PlaylistButtonComponent } from '../playlist-button/playlist-button.component';
import { ShareButtonComponent } from '../share-button/share-button.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [PlaylistButtonComponent, ShareButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']  // Correct the typo here
})
export class DashboardComponent {

}
