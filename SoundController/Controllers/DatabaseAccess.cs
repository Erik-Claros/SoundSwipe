using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Database.Models;
using System.Collections.Generic;
using System.IO;
using System.ComponentModel.DataAnnotations;

public class ApplicationDbContext : DbContext
{
    public DbSet<Users> Users { get; set; }
    public DbSet<Songs> Songs { get; set; }
    public DbSet<PreviewTracks> PreviewTracks { get; set; }
    public DbSet<UserFriends> UserFriends { get; set; }
    public DbSet<FriendRequests> FriendRequests { get; set; }
    public DbSet<UserHistory> UserHistory { get; set; }
    public DbSet<UserLikedSongs> UserLikedSongs { get; set; }
    public DbSet<UserMessages> UserMessages { get; set; }
    public DbSet<Inbox> Inbox { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {

            modelBuilder.Entity<UserFriends>()
                .HasKey(uf => new { uf.userId, uf.friendId });

            modelBuilder.Entity<FriendRequests>()
                .HasKey(fr => new { fr.fromId, fr.toId });

            modelBuilder.Entity<UserHistory>()
                .HasKey(uh => new { uh.userId, uh.songId, uh.timestamp });

            modelBuilder.Entity<UserLikedSongs>()
                .HasKey(uls => new { uls.userId, uls.songId });

            modelBuilder.Entity<UserMessages>()
                .HasKey(um => new { um.senderId, um.receiverId, um.songId });
    }
}
