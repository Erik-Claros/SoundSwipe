import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../Services/track-service/track-service.service';
import { Track } from '../Models/track.model';
import { PreviewTrack } from '../Models/preview-track.model';
import { Songs } from '../Models/databaseModel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { DatabaseService } from '../Services/database-service/database-service.service';

@Component({
  selector: 'app-track',
  templateUrl: './track-component.component.html',
  styleUrls: ['./track-component.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule]
})
export class TrackComponent implements OnInit {
  track!: Track;
  previewTrack!: PreviewTrack;
  songIds: string[] = [];
  currentSong: string = "";
  isLoading: boolean = true;
  data: any;
  isPlaying: boolean = false;
  isFlipped: boolean = false;
  private audio: HTMLAudioElement | null = null;
  
  @Output() backgroundImageUrl = new EventEmitter<string>();
  
  constructor(private trackService: TrackService, private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.loadSongIds();
  }

  // Load song IDs from the backend
  loadSongIds(): void {
    this.trackService.getAllPreviewTracks().subscribe({
      next: (data: string[]) => {
        this.songIds = data;
        this.selectRandomSongId();
        this.isLoading = false;
      },
      error: (error) => console.error('Error loading song IDs:', error)
    });
  }

  // Select a random song ID from the array
  selectRandomSongId(): void {
    if (this.songIds.length > 0) {
      const randomIndex = Math.floor(Math.random() * this.songIds.length);
      const randomSongId = this.songIds[randomIndex];
      this.currentSong = this.songIds[randomIndex];
      this.getTrackDetails(randomSongId);
      this.getTrackPreview(randomSongId);
    }
  }

  getTrackDetails(id: string): void {
    this.trackService.getTrack(id).subscribe({
      next: (data: Track) => {
        this.track = data;

        // Emit the album image URL when the track is loaded
        if (data.album?.images.length > 0) {
          this.backgroundImageUrl.emit(data.album.images[0].url);
        }
      },
      error: (error) => console.error('Error fetching track details:', error)
    });
  }

  getTrackPreview(id: string): void {
    this.trackService.getPreviewTrack(id).subscribe({
      next: (data: string) => {
        this.previewTrack = { previewUrl: data };
        console.log('Preview URL:', data);
        this.playPreview();
      },
      error: (error) => console.error('Error fetching preview track:', error)
    });
  }

  playPreview(): void {
    if (this.previewTrack) {  
      if (this.audio) {
        this.audio.pause(); 
        this.audio.currentTime = 0;  
      }
  
      // Create a new audio instance and play it
      this.audio = new Audio(this.previewTrack.previewUrl);
      this.audio.play().then(() => {
        this.isPlaying = true;  
      }).catch((error) => {
        console.error('Error playing audio:', error);  
      });
  
      // Reset the flag when the audio ends
      this.audio.onended = () => {
        this.isPlaying = false;
      };
    }
  }

  goToNextTrack(): void {
    this.stopPreview();
    this.selectRandomSongId();
  }

  stopPreview(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.audio = null;
      this.isPlaying = false;
    }
  }

  flipCard(): void {
    this.isFlipped = !this.isFlipped; 
  }

  addSongToDB(): void {
    const songToAdd: Songs = {
      sId: this.currentSong
    }

    this.databaseService.AddSong(songToAdd).subscribe({
      error: (error) => console.error('Error adding song:', error)
    });
  }

}
