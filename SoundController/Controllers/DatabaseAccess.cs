using Microsoft.Data.Sqlite;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;

public class DatabaseAccess
{
    private readonly string _connectionString;


    public DatabaseAccess()
    {
        string dbPath = "SoundController/InfoDatabase.db";
        _connectionString = dbPath;
    }

    public List<string> GetData()
    {
        var data = new List<string>();

        using (var connection = new SqliteConnection(_connectionString))
        {
            connection.Open();
            var command = connection.CreateCommand();
            command.CommandText = "SELECT Fname FROM Users"; // Replace with your actual query

            using (var reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    data.Add(reader.GetString(0)); // Adjust based on your data
                }
            }
        }

        return data;
    }

}
