CREATE TABLE Users (
    uId TEXT PRIMARY KEY,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    pfp TEXT
);

CREATE TABLE Songs (
    sId TEXT PRIMARY KEY
);

CREATE TABLE UserFriends (
    userId TEXT NOT NULL,
    friendId TEXT NOT NULL,
    PRIMARY KEY (userId, friendId),
    FOREIGN KEY (userId) REFERENCES Users(uId),
    FOREIGN KEY (friendId) REFERENCES Users(uId)
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

CREATE TABLE UserSavedSongs (
    userId TEXT NOT NULL,
    songId TEXT NOT NULL,
    PRIMARY KEY (userId, songId),
    FOREIGN KEY (userId) REFERENCES Users(uId),
    FOREIGN KEY (songId) REFERENCES Songs(sId)
);
