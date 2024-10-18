import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist } from '../../Models/artistModel';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private apiUrl = 'https://api.spotify.com/v1/search';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to get artist by name
  getArtistByName(artistName: string): Observable<Artist[]> {
    const url = `${this.apiUrl}?query=${artistName}&type=artist&offset=0&limit=20`;
    return this.http.get<Artist[]>(url);
  }
}
