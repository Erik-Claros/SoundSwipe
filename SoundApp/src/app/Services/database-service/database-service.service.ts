import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users, Songs, UserFriends, UserHistory, UserLikedSongs, FriendRequests, UserMessages } from '../../Models/databaseModel';
import { TrackService } from '../track-service/track-service.service';
import { AllPreviewTracks } from '../../Models/preview-track.model';

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    private baseUrl = 'http://localhost:5062/api/Database';

    constructor(private http: HttpClient, private trackService: TrackService) { }

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

    AddFriendRequest(user: string, friend: string): Observable<string[]> {
        const friendRequest: FriendRequests = { fromId: user, toId: friend };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.http.post<string[]>(`${this.baseUrl}/users/addFriendRequests`, JSON.stringify(friendRequest), { headers });
    }

    listenedSong(newSong: string): Observable<string> {
        return this.http.post<string>(`${this.baseUrl}/songs`, newSong);
    }

    // Add this method in your TrackService to fetch all preview tracks
    getAllPreviewTracks(): Observable<AllPreviewTracks> {
        return this.http.get<AllPreviewTracks>(`${this.baseUrl}/getPreviewTracks`);
      }
      

    checkFromFriendRequests(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/checkFromFriendRequests/${userId}`)
    }

    checkToFriendRequests(userId: string): Observable<string[]> {
        return this.http.get<string[]>(`${this.baseUrl}/checkToFriendRequests/${userId}`)
    }

    removeFriendRequest(request: FriendRequests): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/deleteFriendRequest`, {
            body: request
        });
    }

    createMessage(message: UserMessages): Observable<UserMessages> {
        return this.http.post<UserMessages>(`${this.baseUrl}/users/messages`, message)
    }

    getConversation(sender: string, receiver: string): Observable<UserMessages[]> {
        return this.http.get<UserMessages[]>(`${this.baseUrl}/conversation/${receiver}/${sender}`)
    }
}
