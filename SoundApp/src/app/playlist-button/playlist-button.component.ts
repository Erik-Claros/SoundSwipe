import { Component } from '@angular/core';

@Component({
  selector: 'app-playlist-button',
  standalone: true,
  imports: [],
  templateUrl: './playlist-button.component.html',
  styleUrl: './playlist-button.component.css'
})
export class PlaylistButtonComponent {
  openPlaylistMenu() {
    console.log('Opening playlist menu');
  }
}
