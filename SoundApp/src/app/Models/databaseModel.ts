// model.ts

export interface User {
    uID: number;                // Primary key
    phone: string;              // User's phone number
    firstName: string;          // User's first name
    lastName: string;           // User's last name
    spotifyLink?: string;       // Optional Spotify link
}

export interface Song {
    sID: number;                // Primary key
    songName: string;           // Name of the song
    albumName: string;          // Name of the album
    albumCover?: string;        // Optional URL to album cover
    artistName: string;         // Name of the artist
    genre?: string;             // Optional genre
    length?: number;            // Optional length of the song in seconds
}

export interface UserFriend {
    userId: number;             // User ID (foreign key)
    friendId: number;           // Friend ID (foreign key)
}

export interface UserHistory {
    userId: number;             // User ID (foreign key)
    songId: number;             // Song ID (foreign key)
}

export interface UserLikedSong {
    userId: number;             // User ID (foreign key)
    songId: number;             // Song ID (foreign key)
}

export interface UserSavedSong {
    userId: number;             // User ID (foreign key)
    songId: number;             // Song ID (foreign key)
}
