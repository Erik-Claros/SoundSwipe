using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Database.Models
{
    public class Users
    {
        [Key]
        public string uId { get; set; }

        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string email { get; set; }

        public string pfp { get; set; }
    }

    public class Songs
    {
        [Key]
        public string sId { get; set; }
        public string genre { get; set; }
    }

    public class PreviewTracks
    {
        [Key]
        public string spotifyId { get; set; }
        public string genre { get; set; }
    }

    public class UserFriends
    {
        public string userId { get; set; }
        public string friendId { get; set; }
    }

    public class FriendRequests
    {
        public string fromId { get; set; }
        public string toId { get; set; }
    }

    public class UserHistory
    {
        public string userId { get; set; }
        public string songId { get; set; }
        public string timestamp { get; set; }
    }

    public class UserLikedSongs
    {
        public string userId { get; set; }
        public string songId { get; set; }
    }

    public class UserMessages
    {
        public string senderId { get; set; }
        public string receiverId { get; set; }
        public string songId { get; set; }

        [Required]
        public string timestamp { get; set; }
        public bool isRead { get; set; } = false;
    }

    public class Inbox
    {
        [Key]
        public string userId { get; set; }

        [Required]
        public string mail { get; set; }
    }
}
