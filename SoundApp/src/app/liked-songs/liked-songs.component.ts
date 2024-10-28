import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';  // Adjust the path as needed
import { TrackService } from '../Services/track-service/track-service.service';
import { Track, Artist } from '../Models/track.model';
import { Auth } from '@angular/fire/auth';  // Ensure the Auth service is imported
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.css'],
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, BackButtonComponent, BackToTopComponent ]
})

export class LikedSongsComponent implements OnInit {
  likedSongs: string[] = [];
  tracks: Track[] = [];
  userId: string = "";

  constructor(private databaseService: DatabaseService, private trackService: TrackService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadLikedSongs();
  }

  loadUserId(): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
    }
  }

  loadLikedSongs(): void {
    this.databaseService.GetUserLikedSongs(this.userId).subscribe({
      next: (ids: string[]) => {
        this.likedSongs = ids;
        this.loadTrackInfo();
      },
      error: (error: any[]) => console.error('Error loading liked songs:', error)
    });
  }

  loadTrackInfo(): void {
    for(let index = 0; index < this.likedSongs.length; index++) {
      this.trackService.getTrack(this.likedSongs[index]).subscribe({
        next: (track: Track) => {
          this.tracks.push(track);
        },
        error: (error: any[]) => console.error('Error loading liked songs:', error)
      });
    }
  }

  getArtistNames(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
}
