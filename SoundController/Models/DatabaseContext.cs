namespace Database.model {
    public class User
    {
        public int UID { get; set; }  // uID
        public string Phone { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string SpotifyLink { get; set; }
    }

    public class Song
    {
        public int SID { get; set; }  // sID
        public string SongName { get; set; }
        public string AlbumName { get; set; }
        public string AlbumCover { get; set; }
        public string ArtistName { get; set; }
        public string Genre { get; set; }
        public int Length { get; set; }  // in seconds
    }

    public class UserFriend
    {
        public int UserId { get; set; }      // user_id
        public int FriendId { get; set; }     // friend_id
    }

    public class UserHistory
    {
        public int UserId { get; set; }       // user_id
        public int SongId { get; set; }        // song_id
    }

    public class UserLikedSong
    {
        public int UserId { get; set; }       // user_id
        public int SongId { get; set; }        // song_id
    }

    public class UserSavedSong
    {
        public int UserId { get; set; }       // user_id
        public int SongId { get; set; }        // song_id
    }

}
