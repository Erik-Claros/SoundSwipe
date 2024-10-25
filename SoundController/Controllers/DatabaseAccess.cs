using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Database.Models;
using System.Collections.Generic;
using System.IO;

public class ApplicationDbContext : DbContext
{
    public DbSet<Users> Users { get; set; }
    public DbSet<Songs> Songs { get; set; }
    public DbSet<UserFriends> UserFriends { get; set; }
    public DbSet<UserHistory> UserHistory { get; set; }
    public DbSet<UserLikedSongs> UserLikedSongs { get; set; }
    public DbSet<UserSavedSongs> UserSavedSongs { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public List<Users> GetUser()
    {
        return Users.FromSqlRaw("SELECT * FROM Users").ToList(); 
    }

    public List<Songs> GetSongs()
    {
        return Songs.FromSqlRaw("SELECT * FROM Songs").ToList(); 
    }

    public List<UserFriends> GetFriend()
    {
        return UserFriends.FromSqlRaw("SELECT * FROM UserFriends").ToList(); 
    }

    public List<UserHistory> GetHistory()
    {
        return UserHistory.FromSqlRaw("SELECT * FROM UserHistory").ToList(); 
    }

    public List<UserLikedSongs> GetLikedSongs()
    {
        return UserLikedSongs.FromSqlRaw("SELECT * FROM UserLikedSongs").ToList(); 
    }

    public List<UserSavedSongs> GetSavedSongs()
    {
        return UserSavedSongs.FromSqlRaw("SELECT * FROM UserSavedSongs").ToList(); 
    }

    // Method to add a song
    public async Task AddSongAsync(Songs newSong)
    {
        await Songs.AddAsync(newSong); // Adds the new song entity to the context
        await SaveChangesAsync();       // Saves the changes to the database
    }

    public List<string> GetAllTables()
    {
        var tables = new List<string>();
        var connection = this.Database.GetDbConnection();

        using (connection)
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = "SELECT name FROM sqlite_master WHERE type='table'";

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    tables.Add(reader.GetString(0)); // Get the table name
                }
            }
        }

        return tables;
    }

    public string GetDatabaseName()
    {
        var connection = this.Database.GetDbConnection();
        var databaseFilePath = connection.DataSource; // Gets the file path
        return Path.GetFileName(databaseFilePath); // Extracts the file name
    }
}
