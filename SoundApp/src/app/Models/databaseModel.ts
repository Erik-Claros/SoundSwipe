// models.ts
export interface Users {
    uId: string;
    phone?: string;
    first_name: string;
    last_name: string;
    email: string;
    spotify_link?: string;
    pfp?: string;
}

export interface Songs {
    sId: string;
}

export interface UserFriends {
    UserId: string;
    FriendId: string;
    User?: Users; // Optional, for navigation property
    Friend?: Users; // Optional, for navigation property
}

export interface UserHistory {
    UserId: string;
    SongId: string;
    timestamp: string;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}

export interface UserLikedSongs {
    UserId: string;
    SongId: string;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}

export interface UserSavedSongs {
    UserId: string;
    SongId: string;
    User?: Users; // Optional, for navigation property
    Song?: Songs; // Optional, for navigation property
}
