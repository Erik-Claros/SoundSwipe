using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Database.Models;
using System.Collections.Generic;
using System.IO;

public class ApplicationDbContext : DbContext
{
    public DbSet<Users> User { get; set; }
    public DbSet<Users> User { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public List<Users> GetData()
    {
        return User.FromSqlRaw("SELECT * FROM Users").ToList(); 
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
