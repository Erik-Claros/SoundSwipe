// models.ts
export interface Users {
    uID: number;
    phone?: string;
    first_name: string;
    last_name: string;
    email: string;
    spotify_link?: string;
    pfp?: string;
}

export interface Songs {
    sID: number;
    song_name: string;
    album_name: string;
    album_cover: string;
    artist_name: string;
    genre?: string;
}

export interface UserFriends {
    user_id: number;
    friend_id: number;
    User?: Users; // Optional, for navigation property
    Friend?: Users; // Optional, for navigation property
}

export interface UserHistory {
    user_id: number;
    song_id: number;
    timestamp: string;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}

export interface UserLikedSongs {
    user_id: number;
    song_id: number;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}

export interface UserSavedSongs {
    user_id: number;
    song_id: number;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}
