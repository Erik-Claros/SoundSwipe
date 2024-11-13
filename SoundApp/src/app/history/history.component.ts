import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { MatTableModule } from '@angular/material/table';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { MatTable } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { UserLikedSongs } from '../Models/databaseModel';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    BackButtonComponent,
    BackToTopComponent,
    MatTableModule,
    NavBarComponent,
    MatMenuModule
  ]
})

export class HistoryComponent implements OnInit, OnDestroy {
  viewedSongs: string[] = [];
  tracks: Track[] = [];
  userId: string = "";
  audio: HTMLAudioElement | null = null;
  previewTrack: Track | null = null;
  isPlaying: boolean = false;
  progress: number = 0;
  currentSong: string = "";
  selectedTrack: Track | null = null;

  constructor(private databaseService: DatabaseService, private trackService: TrackService, private auth: Auth) {}

  ngOnInit(): void {
    this.loadUserId();
    this.loadLikedSongs();
    //console.log(this.likedSongs);
    //console.log(this.likedSongs);
    //this.loadTrackInfo();
    //console.log(this.tracks);
  }

  ngOnDestroy(): void {
    // Check if there's any audio playing and stop it
    if (this.audio) {
      this.audio.pause();   // Pause the audio
      this.audio.currentTime = 0; // Reset the audio to the beginning
      this.audio = null;    // Remove the reference to the audio element
      this.isPlaying = false;  // Update the playing state
      this.progress = 0;     // Reset the progress
    }
  }

  loadUserId(): void {
    if (this.auth.currentUser) {
      this.userId = this.auth.currentUser.uid;
    }
  }

  @ViewChild(MatTable) table!: MatTable<any>;

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
          this.table.renderRows();
        },
        error: (error) => console.error('Error loading liked songs:', error)
      });
    }
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

  addToFavorite(track: Track): void {
    const favToAdd: UserLikedSongs = {
      userId: this.userId,
      songId: track.id
    }
    this.databaseService.AddFav(favToAdd).subscribe({
      next: () => {
        console.log('Favorite song added:');
      },
      error: (error) => console.error('Error adding favorite song:', error)
    });
  }

  // Update the method for setting the selected track when the "See Card" option is clicked
  showTrackCard(song: Track): void {
    this.selectedTrack = song;
  }
}
