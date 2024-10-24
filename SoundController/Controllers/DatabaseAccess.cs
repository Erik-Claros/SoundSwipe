using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Database.Models;
using System.Linq; // Ensure this is present
using System.IO;

public class ApplicationDbContext : DbContext
{
    private DbContextOptions<ApplicationDbContext> _connectionString;
    public DbSet<Users> User { get; set; }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
        this._connectionString = options.toString();
    }

    public List<Users> GetData()
    {
        // Ensure ToList() is correctly capitalized
        return User.FromSqlRaw("SELECT * FROM Users").ToList(); 
    }

    public List<string> GetAllTables()
    {
        var tables = new List<string>();

        using (var connection = new SqliteConnection(_connectionString))
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

           if (!File.Exists(_connectionString))
        {
            Console.WriteLine("Database file does not exist.");
            return null; // File does not exist
        }
    using (var connection = new SqliteConnection(_connectionString))
    {
        connection.Open();
        
        // The database name is typically the last part of the database path
        var databaseFilePath = connection.DataSource; // Gets the file path
        return System.IO.Path.GetFileName(databaseFilePath); // Extracts the file name
    }
}

}
