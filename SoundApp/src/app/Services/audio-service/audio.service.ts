import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audio: HTMLAudioElement | null = null;
  private isPlayingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  // Expose playback state and progress as observables
  isPlaying$ = this.isPlayingSubject.asObservable();
  progress$ = this.progressSubject.asObservable();

  // Observable to notify components on logout
  private logoutSubject = new Subject<void>();
  logout$ = this.logoutSubject.asObservable();

  playMusic(url: string): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.audio = new Audio(url);
    this.audio.play().then(() => {
      this.isPlayingSubject.next(true);
      this.trackProgress();
    }).catch(error => {
      console.error('Error playing audio:', error);
    });

    this.audio.onended = () => {
      this.isPlayingSubject.next(false);
      this.progressSubject.next(0);
    };
  }

  stopMusic(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlayingSubject.next(false);
      this.progressSubject.next(0);
      this.audio = null;
    }
  }

  private trackProgress(): void {
    if (this.audio) {
      this.audio.ontimeupdate = () => {
        const progress = this.audio ? (this.audio.currentTime / this.audio.duration) * 100 : 0;
        this.progressSubject.next(progress);
      };
    }
  }

  triggerLogout(): void {
    this.stopMusic(); // Stop music on logout
    this.logoutSubject.next(); // Notify all subscribers about logout
  }
}
