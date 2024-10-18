-- Create Users table
CREATE TABLE Users (
    uID INTEGER PRIMARY KEY,
    phone TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    spotify_link TEXT
);

-- Create Songs table
CREATE TABLE Songs (
    sID INTEGER PRIMARY KEY,
    song_name TEXT NOT NULL,
    album_name TEXT NOT NULL,
    album_cover TEXT,
    artist_name TEXT NOT NULL,
    genre TEXT,
    length INTEGER
);

-- Create Friends table (multivalue attribute for User)
CREATE TABLE UserFriends (
    user_id INTEGER,
    friend_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(uID),
    FOREIGN KEY (friend_id) REFERENCES Users(uID),
    PRIMARY KEY (user_id, friend_id)
);

-- Create UserHistory table (multivalue attribute for User)
CREATE TABLE UserHistory (
    user_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(uID),
    FOREIGN KEY (song_id) REFERENCES Songs(sID),
    PRIMARY KEY (user_id, song_id)
);

-- Create LikedSongs table (multivalue attribute for User)
CREATE TABLE UserLikedSongs (
    user_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(uID),
    FOREIGN KEY (song_id) REFERENCES Songs(sID),
    PRIMARY KEY (user_id, song_id)
);

-- Create SavedSongs table (multivalue attribute for User)
CREATE TABLE UserSavedSongs (
    user_id INTEGER,
    song_id INTEGER,
    FOREIGN KEY (user_id) REFERENCES Users(uID),
    FOREIGN KEY (song_id) REFERENCES Songs(sID),
    PRIMARY KEY (user_id, song_id)
);
