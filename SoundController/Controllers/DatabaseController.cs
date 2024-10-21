// using Microsoft.AspNetCore.Mvc;
// using System.Collections.Generic;


// using Microsoft.Data.Sqlite;
// using System;

// namespace Database.Controller {
    
//     [ApiController]
//     [Route("api/[controller]")]
//     public class UsersController : ControllerBase
//     {
//         private readonly DatabaseContext _dbContext;

//         public UsersController()
//         {
//             _dbContext = new DatabaseContext("Data Source=InfoDatabase.db");
//             _dbContext.DatabaseInitializer;
//         }

//         [HttpGet("{userId}/friends")]
//         public ActionResult<List<User>> GetFriends(int userId)
//         {
//             var friends = _dbContext.GetFriends(userId);
//             if (friends == null || friends.Count == 0)
//             {
//                 return NotFound("No friends found.");
//             }
//             return Ok(friends);
//         }
//     }


//     public class DatabaseInitializer
//     {
//         private readonly string _connectionString;

//         public DatabaseInitializer(string connectionString)
//         {
//             _connectionString = connectionString;
//         }

//         public void InitializeDatabase()
//         {
//             using (var connection = new SqliteConnection(_connectionString))
//             {
//                 connection.Open();

//                 // Create Users table
//                 var createUsersTable = @"
//                     CREATE TABLE IF NOT EXISTS Users (
//                         uID INTEGER PRIMARY KEY,
//                         phone TEXT NOT NULL,
//                         first_name TEXT NOT NULL,
//                         last_name TEXT NOT NULL,
//                         spotify_link TEXT
//                     );";

//                 // Create Songs table
//                 var createSongsTable = @"
//                     CREATE TABLE IF NOT EXISTS Songs (
//                         sID INTEGER PRIMARY KEY,
//                         song_name TEXT NOT NULL,
//                         album_name TEXT NOT NULL,
//                         album_cover TEXT,
//                         artist_name TEXT NOT NULL,
//                         genre TEXT,
//                         length INTEGER
//                     );";

//                 // Create UserFriends table
//                 var createUserFriendsTable = @"
//                     CREATE TABLE IF NOT EXISTS UserFriends (
//                         user_id INTEGER,
//                         friend_id INTEGER,
//                         FOREIGN KEY (user_id) REFERENCES Users(uID),
//                         FOREIGN KEY (friend_id) REFERENCES Users(uID),
//                         PRIMARY KEY (user_id, friend_id)
//                     );";

//                 // Create UserHistory table
//                 var createUserHistoryTable = @"
//                     CREATE TABLE IF NOT EXISTS UserHistory (
//                         user_id INTEGER,
//                         song_id INTEGER,
//                         FOREIGN KEY (user_id) REFERENCES Users(uID),
//                         FOREIGN KEY (song_id) REFERENCES Songs(sID),
//                         PRIMARY KEY (user_id, song_id)
//                     );";

//                 // Create UserLikedSongs table
//                 var createUserLikedSongsTable = @"
//                     CREATE TABLE IF NOT EXISTS UserLikedSongs (
//                         user_id INTEGER,
//                         song_id INTEGER,
//                         FOREIGN KEY (user_id) REFERENCES Users(uID),
//                         FOREIGN KEY (song_id) REFERENCES Songs(sID),
//                         PRIMARY KEY (user_id, song_id)
//                     );";

//                 // Create UserSavedSongs table
//                 var createUserSavedSongsTable = @"
//                     CREATE TABLE IF NOT EXISTS UserSavedSongs (
//                         user_id INTEGER,
//                         song_id INTEGER,
//                         FOREIGN KEY (user_id) REFERENCES Users(uID),
//                         FOREIGN KEY (song_id) REFERENCES Songs(sID),
//                         PRIMARY KEY (user_id, song_id)
//                     );";

//                 // Execute each create table command
//                 using (var command = connection.CreateCommand())
//                 {
//                     command.CommandText = createUsersTable;
//                     command.ExecuteNonQuery();

//                     command.CommandText = createSongsTable;
//                     command.ExecuteNonQuery();

//                     command.CommandText = createUserFriendsTable;
//                     command.ExecuteNonQuery();

//                     command.CommandText = createUserHistoryTable;
//                     command.ExecuteNonQuery();

//                     command.CommandText = createUserLikedSongsTable;
//                     command.ExecuteNonQuery();

//                     command.CommandText = createUserSavedSongsTable;
//                     command.ExecuteNonQuery();
//                 }
//             }
//         }
//     }

//     public class DatabaseContext
//     {
//         private readonly string _connectionString;

//         public DatabaseContext(string connectionString)
//         {
//             _connectionString = connectionString;
//         }

//         public List<User> GetFriends(int userId)
//         {
//             var friendsList = new List<User>();

//             using (var connection = new SqliteConnection(_connectionString))
//             {
//                 connection.Open();
//                 var command = connection.CreateCommand();
//                 command.CommandText = @"
//                     SELECT u.uID, u.phone, u.first_name, u.last_name, u.spotify_link 
//                     FROM UserFriends uf
//                     JOIN Users u ON uf.friend_id = u.uID
//                     WHERE uf.user_id = @userId";

//                 command.Parameters.AddWithValue("@userId", userId);

//                 using (var reader = command.ExecuteReader())
//                 {
//                     while (reader.Read())
//                     {
//                         var friend = new User
//                         {
//                             UID = reader.GetInt32(0),
//                             Phone = reader.GetString(1),
//                             FirstName = reader.GetString(2),
//                             LastName = reader.GetString(3),
//                             SpotifyLink = reader.IsDBNull(4) ? null : reader.GetString(4)
//                         };
//                         friendsList.Add(friend);
//                     }
//                 }
//             }

//             return friendsList;
//         }
//     }
// }
