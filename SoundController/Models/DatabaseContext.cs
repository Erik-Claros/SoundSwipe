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
    }

    public class UserFriends
    {
        public string userId { get; set; }
        public string friendId { get; set; }
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

    public class UserSavedSongs
    {
        public string userId { get; set; }
        public string songId { get; set; }
    }
}
