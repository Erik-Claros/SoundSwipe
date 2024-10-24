using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Database.Models {
    public class Users
    {
        [Key] // This attribute specifies that uID is the primary key
        public int uID { get; set; }
        
        public string? phone { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public string? spotify_link { get; set; }
        public string? pfp { get; set; }
    }

    public class Song
    {
        [Key]
        public int sID { get; set; }  // sID
        public string song_name { get; set; }
        public string album_name { get; set; }
        public string album_cover { get; set; }
        public string artist_name { get; set; }
        public string? genre { get; set; }
        public int? length { get; set; }  // in seconds
    }

    public class UserFriend
    {
        [Key]
        public int Id { get; set; } // Primary key for the UserFriend table

        [ForeignKey("User")] // This specifies the relationship with Users
        public int UserId { get; set; }      // user_id
        public Users User { get; set; }       // Navigation property

        [ForeignKey("Friend")] // This specifies the relationship with Users
        public int FriendId { get; set; }     // friend_id
        public Users Friend { get; set; }      // Navigation property
    }

    public class UserHistory
    {
        [Key]
        public int Id { get; set; } // Primary key for UserHistory table

        [ForeignKey("User")] // This specifies the relationship with Users
        public int UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public int SongId { get; set; }        // song_id
        public Song Song { get; set; }          // Navigation property
    }

    public class UserLikedSong
    {
        [Key]
        public int Id { get; set; } // Primary key for UserLikedSong table

        [ForeignKey("User")] // This specifies the relationship with Users
        public int UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public int SongId { get; set; }        // song_id
        public Song Song { get; set; }          // Navigation property
    }

    public class UserSavedSong
    {
        [Key]
        public int Id { get; set; } // Primary key for UserSavedSong table

        [ForeignKey("User")] // This specifies the relationship with Users
        public int UserId { get; set; }       // user_id
        public Users User { get; set; }        // Navigation property

        [ForeignKey("Song")] // This specifies the relationship with Song
        public int SongId { get; set; }        // song_id
        public Song Song { get; set; }          // Navigation property
    }
}
