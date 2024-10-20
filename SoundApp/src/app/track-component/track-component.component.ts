import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../Services/track-service/track-service.service';
import { Track } from '../Models/track.model';
import { PreviewTrack } from '../Models/preview-track.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-track',
  templateUrl: './track-component.component.html',
  styleUrls: ['./track-component.component.css'],
  standalone: true,  
  imports: [CommonModule, MatCardModule]  
})
export class TrackComponent implements OnInit {
  track!: Track;
  previewTrack!: PreviewTrack;
  songIds: string[] = [];
  @Output() backgroundImageUrl = new EventEmitter<string>();
  isLoading: boolean = true; 
  data: any; 
  private audio: HTMLAudioElement | null = null; 

  constructor(private trackService: TrackService) { }

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
      this.audio = new Audio(this.previewTrack.previewUrl); 
      this.audio.play();
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
    }
  }
}
