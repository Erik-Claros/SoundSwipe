import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackService } from '../Services/track-service/track-service.service';
import { Track } from '../Models/track.model';
import { PreviewTrack } from '../Models/preview-track.model';
import { Songs, UserLikedSongs, UserHistory } from '../Models/databaseModel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HammerGestureConfig } from '@angular/platform-browser';
import { DatabaseService } from '../Services/database-service/database-service.service';
import { Auth } from '@angular/fire/auth';


@Component({
  selector: 'app-track',
  templateUrl: './track-component.component.html',
  styleUrls: ['./track-component.component.css'],
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule, HammerModule]
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
  isDragging = false;
  startX: number | null = null;
  currentX = 0;
  swipeThreshold = 100; // Minimum distance for a swipe to be considered valid
  progress = 0; //holds % of the song
  userId: string = "";
  
  @Output() backgroundImageUrl = new EventEmitter<string>();
  
  constructor(private trackService: TrackService, private databaseService: DatabaseService, private auth: Auth) { }

  ngOnInit(): void {
    this.loadUserId();
    this.loadSongIds();
  }

  loadUserId(): void {
    if(this.auth.currentUser != null){
      this.userId = this.auth.currentUser.uid;
    }
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
      this.currentSong = randomSongId;
      this.addSongToDB();
      this.addSongToHistory();
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

      this.audio.ontimeupdate = () => {
        if (this.audio) {
          this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      
        }
      };
  
      // Reset the flag when the audio ends
      this.audio.onended = () => {
        this.isPlaying = false;
        this.progress = 0; //reset the progress
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
      this.progress = 0;
    }
  }

  handleSwipe(direction: 'left' | 'right'): void {
    if (direction === 'right') {
      this.currentX = window.innerWidth; // Move the card to the right
      setTimeout(() => {
        this.addSongToFavorite();
        this.resetCardPosition();
        this.goToNextTrack();
      }, 300); // Duration of animation
    } else if (direction === 'left') {
      this.currentX = -window.innerWidth; // Move the card to the left
      setTimeout(() => {
        this.resetCardPosition();
        this.goToNextTrack();
      }, 300); // Duration of animation
    }
  }
  
  // Reset card position to center
  resetCardPosition(): void {
    this.currentX = 0;
  }
  addSongToFavorite(): void {
    console.log('Song added to favorites:', this.track.name);
    // call a method to add the track to favorites
  }

  swipeDirection: 'left' | 'right' | null=null;

  flipCard(): void {
    this.isFlipped = !this.isFlipped; 
  }
  onDragStart(event: MouseEvent | TouchEvent): void {
    this.isDragging = true;
    this.startX = this.getEventX(event);
  }
  
  onDragMove(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging || this.startX === null) return;
  
    const currentX = this.getEventX(event);
    this.currentX = currentX - this.startX;
  }
  
  onDragEnd(event: MouseEvent | TouchEvent): void {
    if (!this.isDragging) return;
  
    this.isDragging = false;
    
    // Check if the swipe distance exceeds the threshold
    if (this.currentX > this.swipeThreshold) {
      // Swipe right (like)
      this.handleSwipe('right');
    } else if (this.currentX < -this.swipeThreshold) {
      // Swipe left (dislike)
      this.handleSwipe('left');
    } else {
      // Reset position if swipe wasn't strong enough
      this.currentX = 0;
    }
  
    this.startX = null;
  }
  
  // Utility function to get the X position from MouseEvent or TouchEvent
  getEventX(event: MouseEvent | TouchEvent): number {
    if (event instanceof MouseEvent) {
      return event.clientX;
    } else {
      return event.touches[0].clientX;
    }
  }
  
}



  addSongToDB(): void {
    const songToAdd: Songs = {
      sId: this.currentSong,
      genre: ""
    }

    this.databaseService.AddSong(songToAdd).subscribe({
      error: (error) => console.error('Error adding song:', error)
    });
  }

  addSongToFavorite(): void {
    //console.log(this.userId);
    //console.log(this.currentSong);
    const favToAdd: UserLikedSongs = {
      userId: this.userId,
      songId: this.currentSong
    }
    this.databaseService.AddFav(favToAdd).subscribe({
      error: (error) => console.error('Error adding favorite song:', error)
    });
  }

  addSongToHistory(): void {
    console.log(this.userId);
    console.log(this.currentSong);
    const currentDate: Date = new Date();
    const formattedDate: string = `${currentDate.getFullYear()}${(currentDate.getMonth() + 1).toString().padStart(2, '0')}${currentDate.getDate().toString().padStart(2, '0')}${currentDate.getHours().toString().padStart(2, '0')}${currentDate.getMinutes().toString().padStart(2, '0')}${currentDate.getSeconds().toString().padStart(2, '0')}`;
    console.log(formattedDate);
    const historyToAdd: UserHistory = {
      userId: this.userId,
      songId: this.currentSong,
      timestamp: formattedDate
    }

    this.databaseService.AddHistory(historyToAdd).subscribe({
      error: (error) => console.error('Error adding to history:', error)
    });
  }

}
