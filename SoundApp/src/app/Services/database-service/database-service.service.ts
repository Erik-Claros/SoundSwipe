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
    GetAllUsers(): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.baseUrl}/users`);
    }

    GetUser(uid: string): Observable<Users> {
        return this.http.get<Users>(`${this.baseUrl}/users/${uid}`);
    }

    GetUserByEmail(email: string): Observable<Users[]> {
        return this.http.get<Users[]>(`${this.baseUrl}/users/email/${email}`);
    }

    // Songs
    GetSongs(): Observable<Songs[]> {
        return this.http.get<Songs[]>(`${this.baseUrl}/songs`);
    }

    // User Friends
    GetUserFriends(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/friends`);
    }

    // User History
    GetUserHistory(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/history`);
    }

    // User Liked Songs
    GetUserLikedSongs(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/users/${userId}/liked-songs`);
    }

    // User Saved Songs
    GetUserSavedSongs(userId: string): Observable<UserSavedSongs[]> {
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

    AddFriends(user: string, friend: string): Observable<string[]> {
        const friends: UserFriends = { userId: user, friendId: friend }; // Correctly define as an array of strings
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
        return this.http.post<string[]>(`${this.baseUrl}/users/addFriends`, JSON.stringify(friends), { headers });
    }
    

    // Method to create a new user
    listenedSong(newSong: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/songs`, newSong);
    }

}
