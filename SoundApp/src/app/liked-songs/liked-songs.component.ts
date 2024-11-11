import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { TrackService } from '../Services/track-service/track-service.service';
import { Track, Artist } from '../Models/track.model';
import { Auth } from '@angular/fire/auth';  
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BackButtonComponent } from '../back-button/back-button.component';
import { BackToTopComponent } from '../back-to-top/back-to-top.component';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-liked-songs',
  templateUrl: './liked-songs.component.html',
  styleUrls: ['./liked-songs.component.css'],
  standalone: true,
  imports: [ CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, BackButtonComponent, BackToTopComponent, NavBarComponent]
})
export class LikedSongsComponent implements OnInit {
  trackImgUrls: string[] = [];
  trackImgUrl: string = "";
  likedSongs: string[] = [];
  tracks: Track[] = [];
  userId: string = "";
  currentImageIndex = 0;
  audio: HTMLAudioElement | null = null;
  previewTrack: Track | null = null;
  isPlaying: boolean = false;
  progress: number = 0;
  backgroundImageLoaded: boolean = false;  // Flag to track background image load

  constructor(private databaseService: DatabaseService, private trackService: TrackService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadLikedSongs();
  }

  ngOnDestroy(): void {
    this.stopPreview(); 
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
    const trackObservables = this.likedSongs.map(id => 
      this.trackService.getTrack(id)
    );
  
    forkJoin(trackObservables).subscribe({
      next: (tracks: Track[]) => {
        this.tracks = tracks;
        this.trackImgUrls = tracks
          .filter(track => track.album?.images && track.album.images.length > 0)
          .map(track => track.album.images[0].url);
        
        if (this.trackImgUrls.length > 0) {
          this.cycleBackgroundImages();
        }
      },
      error: (error) => console.error('Error loading liked songs:', error)
    });
  }

  cycleBackgroundImages(): void {
    if (this.trackImgUrls.length === 0) return;
  
    const image = new Image();
    image.src = this.trackImgUrls[this.currentImageIndex];
  
    image.onload = () => {
      this.backgroundImageLoaded = true;  
      this.trackImgUrl = this.trackImgUrls[this.currentImageIndex]; 
    };
  
    setInterval(() => {
      if (this.trackImgUrls.length > 0) {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.trackImgUrls.length;
        this.trackImgUrl = this.trackImgUrls[this.currentImageIndex];
      }
    }, 5000); 
  }

  getArtistNames(artists: Artist[]): string {
    return artists.map(artist => artist.name).join(', ');
  }

  playPreview(track: Track): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    if (track.preview_url) {
      this.previewTrack = track;
      this.audio = new Audio(track.preview_url);
      this.audio.play().then(() => {
        this.isPlaying = true;
      }).catch((error) => {
        console.error('Error playing audio:', error);
      });

      this.audio.ontimeupdate = () => {
        if (this.audio) {
          this.progress = (this.audio.currentTime / this.audio.duration) * 100;
        }
      };

      this.audio.onended = () => {
        this.isPlaying = false;
        this.progress = 0;
      };
    }
  }

  stopPreview(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.isPlaying = false;
      this.progress = 0;
    }
  }
}
