export interface Users {
    uId: string;
    firstName: string;
    lastName: string;
    email: string;
    pfp?: string;
}

export interface Songs {
    sId: string;
}

export interface UserFriends {
    userId: string;
    friendId: string;
}

export interface UserHistory {
    userId: string;
    songId: string;
    timestamp: string;
}

export interface UserLikedSongs {
    userId: string;
    songId: string;
}

export interface UserSavedSongs {
    userId: string;
    songId: string;
}
