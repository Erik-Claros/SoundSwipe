namespace Database.model {
    public class User
    {
        public int UID { get; set; }  // uID
        public string? Phone { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? SpotifyLink { get; set; }
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