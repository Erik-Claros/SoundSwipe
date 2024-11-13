CREATE TABLE Users (
    uId TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pfp TEXT
);

CREATE TABLE Songs (
    sId TEXT NOT NULL PRIMARY KEY,
    genre TEXT
);

CREATE TABLE PreviewTracks (
    spotifyId TEXT NOT NULL PRIMARY KEY,
    genre TEXT
);

CREATE TABLE UserFriends (
    userId TEXT NOT NULL,
    friendId TEXT NOT NULL,
    PRIMARY KEY (userId, friendId),
    FOREIGN KEY (userId) REFERENCES Users(uId),
    FOREIGN KEY (friendId) REFERENCES Users(uId)
);

CREATE TABLE FriendRequests (
    fromId TEXT NOT NULL,
    toId TEXT NOT NULL,
    PRIMARY KEY (fromId, toId),
    FOREIGN KEY (fromId) REFERENCES Users(uId),
    FOREIGN KEY (toId) REFERENCES Users(uId)
);

CREATE TABLE UserHistory (
    userId TEXT NOT NULL,
    songId TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    PRIMARY KEY (userId, songId, timestamp),
    FOREIGN KEY (userId) REFERENCES Users(uId),
    FOREIGN KEY (songId) REFERENCES Songs(sId)
);

CREATE TABLE UserLikedSongs (
    userId TEXT NOT NULL,
    songId TEXT NOT NULL,
    PRIMARY KEY (userId, songId),
    FOREIGN KEY (userId) REFERENCES Users(uId),
    FOREIGN KEY (songId) REFERENCES Songs(sId)
);

CREATE TABLE UserMessages (
    senderId TEXT NOT NULL,
    receiverId TEXT NOT NULL,
    songId TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    isRead BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (senderId) REFERENCES Users(uId),
    FOREIGN KEY (receiverId) REFERENCES Users(uId),
    FOREIGN KEY (songId) REFERENCES Songs(sId)
);

CREATE TABLE Inbox (
    userId TEXT NOT NULL,
    mail TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES User(uId)
)