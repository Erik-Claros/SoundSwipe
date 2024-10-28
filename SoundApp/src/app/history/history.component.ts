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
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, BackButtonComponent, BackToTopComponent ]
})

export class HistoryComponent implements OnInit {
  viewedSongs: string[] = [];
  tracks: Track[] = [];
  userId: string = "";

  constructor(private databaseService: DatabaseService, private trackService: TrackService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadLikedSongs();
    //console.log(this.likedSongs);
    //console.log(this.likedSongs);
    //this.loadTrackInfo();
    //console.log(this.tracks);
  }

  loadUserId(): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
    }
  }

  loadLikedSongs(): void {
    this.databaseService.GetUserHistory(this.userId).subscribe({
      next: (ids) => {
        console.log(ids);
        this.viewedSongs = ids;
        this.loadTrackInfo();
      },
      error: (error) => console.error('Error loading liked songs:', error)
    });
  }

  loadTrackInfo(): void {
    for(let index = 0; index < this.viewedSongs.length; index++) {
      this.trackService.getTrack(this.viewedSongs[index]).subscribe({
        next: (track) => {
          this.tracks.push(track);
        },
        error: (error) => console.error('Error loading liked songs:', error)
      });
    }
  }

  getArtistNames(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }
}
