// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    getUserFriends(userId: number): Observable<UserFriends[]> {
        return this.http.get<UserFriends[]>(`${this.baseUrl}/users/${userId}/friends`);
    }

    // User History
    getUserHistory(userId: number): Observable<UserHistory[]> {
        return this.http.get<UserHistory[]>(`${this.baseUrl}/users/${userId}/history`);
    }

    // User Liked Songs
    getUserLikedSongs(userId: number): Observable<UserLikedSongs[]> {
        return this.http.get<UserLikedSongs[]>(`${this.baseUrl}/users/${userId}/liked-songs`);
    }

    // User Saved Songs
    getUserSavedSongs(userId: number): Observable<UserSavedSongs[]> {
        return this.http.get<UserSavedSongs[]>(`${this.baseUrl}/users/${userId}/saved-songs`);
    }

    // Method to create a new user
    createUser(newUser: Users): Observable<Users> {
        return this.http.post<Users>(`${this.baseUrl}/users`, newUser);
    }

}
