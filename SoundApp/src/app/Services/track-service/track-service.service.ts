import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Import catchError
import { Track } from '../../Models/track.model';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  private baseUrl = 'http://localhost:5062/api/Spotify';
  private cachedTrackIds: string[] | null = null;

  constructor(private http: HttpClient) { }

  // Get track details by ID
  getTrack(id: string): Observable<Track> {
    const url = `${this.baseUrl}/track/${id}`;
    return this.http.get<Track>(url);
  }

  // Get track preview by ID
  getPreviewTrack(id: string): Observable<string> {
    const url = `${this.baseUrl}/previewTrack/${id}`;
    return this.http.get(url, { responseType: 'text' });
  }

  getAllPreviewTracks(): Observable<string[]> {
    // Return cached track IDs if available
    if (this.cachedTrackIds) {
      return of(this.cachedTrackIds); 
    }

    const url = `${this.baseUrl}/GetAllPreviewTracks`;
    return this.http.get<string[]>(url).pipe(
      catchError((error) => {
        console.error('Error fetching track IDs:', error);
        return of([]); 
      })
    );
  }

  // Call this method to update the cached track IDs after fetching
  setCachedTrackIds(trackIds: string[]): void {
    this.cachedTrackIds = trackIds;
  }
}
