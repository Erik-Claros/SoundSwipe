export interface Users {
    uId: string;
    firstName: string;
    lastName: string;
    email: string;
    pfp?: string;
}

export interface Songs {
    sId: string;
    genre?: string;
}

export interface PreviewTracks {
    spotifyId: string;
    genre?: string;
}

export interface UserFriends {
    userId: string;
    friendId: string;
}

export interface FriendRequests {
    fromId: string;
    toId: string;
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

export interface UserMessages {
    senderId: string;
    receiverId: string;
    songId: string;
    timestamp: string;
    isRead: boolean;
}

export interface Inbox {
    userId: string;
    mail: string;
}