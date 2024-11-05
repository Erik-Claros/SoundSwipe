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

CREATE TABLE FriendRequests (
    fromId TEXT NOT NULL,
    toId TEXT NOT NULL,
    PRIMARY KEY (fromId),
    FOREIGN KEY (fromId) REFERENCES Users(uId),
    FOREIGN KEY (toId) REFERENCES Users(uId)
)

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

CREATE TABLE PreviewTracks (
    songId TEXT NOT NULL,
    genre TEXT
    PRIMARY KEY (songId),
    FOREIGN KEY (songId) REFERENCES Songs(sId)
)

-- Table to store songs being sent as messages between users
CREATE TABLE SongMessages (
    senderId TEXT NOT NULL,             -- User who sent the song
    receiverId TEXT NOT NULL,           -- User who receives the song
    songId TEXT NOT NULL,               -- The song being sent
    timestamp TEXT NOT NULL,            -- Timestamp when the song was sent
    FOREIGN KEY (senderId) REFERENCES Users(uId), -- Sender of the song
    FOREIGN KEY (receiverId) REFERENCES Users(uId), -- Receiver of the song
    FOREIGN KEY (songId) REFERENCES Songs(sId)     -- The song being sent
);
-- Select where senderId = x and receiverId = y and union it with 
-- senderId = y and receiverId = x to grab whole conversation then
-- sort by timestamp
