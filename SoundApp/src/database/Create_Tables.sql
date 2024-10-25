CREATE TABLE Users (
    uId TEXT PRIMARY KEY,
    phone TEXT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    spotify_link TEXT,
    pfp TEXT
);
CREATE TABLE Songs (
    sId TEXT PRIMARY KEY
);
CREATE TABLE UserFriends (
    Id TEXT PRIMARY KEY,
    UserId TEXT NOT NULL,
    FriendId TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(uId),
    FOREIGN KEY (FriendId) REFERENCES Users(uId)
);
CREATE TABLE UserHistory (
    Id TEXT PRIMARY KEY,
    timestamp TEXT NOT NULL,
    UserId TEXT NOT NULL,
    SongId TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(uId),
    FOREIGN KEY (SongId) REFERENCES Songs(sId)
);
CREATE TABLE UserLikedSongs (
    Id TEXT PRIMARY KEY,
    UserId TEXT NOT NULL,
    SongId TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(uId),
    FOREIGN KEY (SongId) REFERENCES Songs(sId)
);
CREATE TABLE UserSavedSongs (
    Id TEXT PRIMARY KEY,
    UserId TEXT NOT NULL,
    SongId TEXT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(uId),
    FOREIGN KEY (SongId) REFERENCES Songs(sId)
);
