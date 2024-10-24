namespace Database.Models {
    public class Users
    {
        public int UID { get; set; } // Primary Key

        public string Phone { get; set; } // Phone number

        public string FirstName { get; set; } // First name
        public string LastName { get; set; } // Last name

        public string SpotifyLink { get; set; } // Spotify link (optional)

        public string Pfp { get; set; } // Profile picture (optional)
    }

    public class Song
    {
        public required int SID { get; set; }  // sID
        public required string SongName { get; set; }
        public required string AlbumName { get; set; }
        public required string AlbumCover { get; set; }
        public required string ArtistName { get; set; }
        public string? Genre { get; set; }
        public int? Length { get; set; }  // in seconds
    }

    public class UserFriend
    {
        public required int UserId { get; set; }      // user_id
        public required int FriendId { get; set; }     // friend_id
    }

    public class UserHistory
    {
        public required int UserId { get; set; }       // user_id
        public required int SongId { get; set; }        // song_id
    }

    public class UserLikedSong
    {
        public required int UserId { get; set; }       // user_id
        public required int SongId { get; set; }        // song_id
    }

    public class UserSavedSong
    {
        public required int UserId { get; set; }       // user_id
        public required int SongId { get; set; }        // song_id
    }

}