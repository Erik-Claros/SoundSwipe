// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, Songs, UserFriends, UserHistory, UserLikedSongs, UserSavedSongs } from '../../Models/databaseModel';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private baseUrl = 'http://localhost:5062/api/Database'; // Replace with your actual API URL

    constructor(private http: HttpClient) {}

    // Users
    getUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.baseUrl}/users`);
    }

    // Songs
    getSongs(): Observable<Songs[]> {
        return this.http.get<Songs[]>(`${this.baseUrl}/songs`);
    }

    // User Friends
    getUserFriends(userId: string): Observable<UserFriends[]> {
        return this.http.get<UserFriends[]>(`${this.baseUrl}/users/${userId}/friends`);
    }

    // User History
    getUserHistory(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/history`);
    }

    // User Liked Songs
    getUserLikedSongs(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/liked-songs`);
    }

    // User Saved Songs
    getUserSavedSongs(userId: string): Observable<UserSavedSongs[]> {
        return this.http.get<UserSavedSongs[]>(`${this.baseUrl}/users/${userId}/saved-songs`);
    }

    AddSong(song: Songs): Observable<Songs> {
      const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<Songs>(`${this.baseUrl}/songs`, JSON.stringify(song), { headers });
    }

    AddUser(user: Users): Observable<Users> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Users>(`${this.baseUrl}/users`, JSON.stringify(user), { headers });
    }

    AddFav(userLikedSongs: UserLikedSongs): Observable<UserLikedSongs> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<UserLikedSongs>(`${this.baseUrl}/userLikedSongs`, JSON.stringify(userLikedSongs), { headers });
    }

    AddHistory(userHistory: UserHistory): Observable<UserHistory> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<UserHistory>(`${this.baseUrl}/userHistory`, JSON.stringify(userHistory), { headers });
    }

    // Method to create a new user
    listenedSong(newSong: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/songs`, newSong);
    }

}
