using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models {
    public class Users
    {
        [Key] // This attribute specifies that uID is the primary key
        public string uId { get; set; }
        
        public string? phone { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string email { get; set; }
        public string? spotify_link { get; set; }
        public string? pfp { get; set; }
    }

    public class Songs
    {
        [Key]
        public string sId { get; set; }  // sID
    }

    public class UserFriends
    {
        [Key]
        public string Id { get; set; } // Primary key for the UserFriend table

        [ForeignKey("User")] // This specifies the relationship with Users
        public string UserId { get; set; }      // user_id
        public Users User { get; set; }       // Navigation property

        [ForeignKey("Friend")] // This specifies the relationship with Users
        public string FriendId { get; set; }     // friend_id
        public Users Friend { get; set; }      // Navigation property
    }

    public class UserHistory
    {
        [Key]
        public string Id { get; set; } // Primary key for UserHistory table
        public string timestamp { get; set; }

        [ForeignKey("User")] // This specifies the relationship with Users
        public string UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public string SongId { get; set; }        // song_id
        public Songs Song { get; set; }          // Navigation property
    }

    public class UserLikedSongs
    {
        [Key]
        public string Id { get; set; } // Primary key for UserLikedSong table

        [ForeignKey("User")] // This specifies the relationship with Users
        public string UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public string SongId { get; set; }        // song_id
        public Songs Song { get; set; }          // Navigation property
    }

    public class UserSavedSongs
    {
        [Key]
        public string Id { get; set; } // Primary key for UserSavedSong table

        [ForeignKey("User")] // This specifies the relationship with Users
        public string UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public string SongId { get; set; }        // song_id
        public Songs Song { get; set; }          // Navigation property
    }
}
