using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Database.Models;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly ApplicationDbContext _applicationDbContext;

    // Constructor injection for ApplicationDbContext
    public DatabaseController(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    // GET api/users
    [HttpGet("users")]
    public async Task<ActionResult<IEnumerable<Users>>> GetAllUsers()
    {
        var users = await _applicationDbContext.Users.ToListAsync();
        return Ok(users);
    }

        // GET api/users/userId
    [HttpGet("users/{userId}")]
    public async Task<ActionResult<IEnumerable<Users>>> GetUser(string userId)
    {
        var user = await _applicationDbContext.Users
            .Where(ui => ui.uId == userId)
            .ToListAsync();

        if (!user.Any())
        {
            return NotFound("No user found with this id.");
        }

        return Ok(user);
    }

    [HttpGet("users/email/{email}")]
    public async Task<ActionResult<IEnumerable<Users>>> GetUserByEmail(string email)
    {
        var user = await _applicationDbContext.Users
            .Where(ui => ui.email == email)
            .ToListAsync();

        if (!user.Any())
        {
            return NotFound("No user found with this id.");
        }

        return Ok(user);
    }

    // GET api/songs
    [HttpGet("songs")]
    public async Task<ActionResult<IEnumerable<Songs>>> GetSongs()
    {
        var songs = await _applicationDbContext.Songs.ToListAsync();
        return Ok(songs);
    }

    // GET api/users/{userId}/friends
    [HttpGet("users/{userId}/friends")]
    public async Task<ActionResult<IEnumerable<string>>> GetUserFriends(string userId)
    {
        // Get all friends where the userId is the given user
        var friends = await _applicationDbContext.UserFriends
            .Where(uf => uf.userId == userId)  // Get friends where userId = user
            .Select(uf => uf.friendId)         // Select the friendId
            .Union(                            // Combine with the friends where friendId = userId
                _applicationDbContext.UserFriends
                    .Where(uf => uf.friendId == userId)  // Get friends where friendId = user
                    .Select(uf => uf.userId)             // Select the userId as friend
            )
            .ToListAsync();  // Execute the query asynchronously

        // If no friends found, return a NotFound response
        if (!friends.Any())
        {
            return NotFound("No friends found for this user.");
        }

        // Return the list of friends
        return Ok(friends);
    }

    // GET api/users/{userId}/history
    [HttpGet("users/{userId}/history")]
    public async Task<ActionResult<IEnumerable<string>>> GetUserHistory(string userId)
    {
        var history = await _applicationDbContext.UserHistory
            .Where(uh => uh.userId == userId)
            .OrderBy(uh => uh.timestamp)
            .Select(uh => uh.songId)
            .ToListAsync();

        if (!history.Any())
        {
            return NotFound("No history found for this user.");
        }

        return Ok(history);
    }

    // public async Task<ActionResult<IEnumerable<string>>> GetUserHistoryTimestamps(string userId)
    // {
    //     var history = await _applicationDbContext.UserHistory
    //         .Where(uh => uh.userId == userId)
    //         .OrderBy(uh => uh.timestamp)
    //         .Select(uh => uh.timestamp)
    //         .ToListAsync();

    //     if (!history.Any())
    //     {
    //         return NotFound("No history found for this user.");
    //     }

    //     return Ok(history);
    // }

    // GET api/users/{userId}/liked-songs
    [HttpGet("users/{userId}/liked-songs")]
    public async Task<ActionResult<IEnumerable<string>>> GetUserLikedSongs(string userId)
    {
        var likedSongs = await _applicationDbContext.UserLikedSongs
            .Where(uls => uls.userId == userId)
            .Select(uls => uls.songId)
            .ToListAsync();

        if (!likedSongs.Any())
        {
            return NotFound("No liked songs found for this user.");
        }
        return Ok(likedSongs);
    }

    // GET api/song/{id}
    [HttpGet("songs/{id}")]
    public async Task<ActionResult<Songs>> GetSongById(string id)
    {
        var song = await _applicationDbContext.Songs.FindAsync(id);
        if (song == null)
        {
            return NotFound();
        }
        return Ok(song);
    }

    // GET api/user/{id}
    [HttpGet("user/{id}")]
    public async Task<ActionResult<Users>> GetUserById(string id)
    {
        var user = await _applicationDbContext.Users.FindAsync(id);
        if (user == null)
        {
            return NotFound();
        }
        return Ok(user);
    }

    // GET api/userLikedSongs/{id}
    [HttpGet("userLikedSongs/{id}")]
    public async Task<ActionResult<UserLikedSongs>> GetLikedSongById(string id)
    {
        var song = await _applicationDbContext.UserLikedSongs.FindAsync(id);
        if (song == null)
        {
            return NotFound();
        }
        return Ok(song);
    }

    // GET api/userHistory/{id}
    [HttpGet("userHistory/{id}")]
    public async Task<ActionResult<UserHistory>> GetHistoryById(string id)
    {
        var hist = await _applicationDbContext.UserHistory.FindAsync(id);
        if (hist == null)
        {
            return NotFound();
        }
        return Ok(hist);
    }

    // POST api/songs
    [HttpPost("songs")]
    public async Task<ActionResult<Songs>> CreateSong([FromBody] Songs newSong)
    {
        if (newSong == null)
        {
            return BadRequest("Song data is null.");
        }

        // Check if the song already exists based on its ID
        var existingSong = await _applicationDbContext.Songs
            .FirstOrDefaultAsync(t => t.sId == newSong.sId);

        if (existingSong != null)
        {
            return Ok("Song with the same ID already exists.");
        }

        // Insert the new track into the database
        _applicationDbContext.Songs.Add(newSong);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSongById), new { id = newSong.sId }, newSong);
    }

    // POST api/users
    [HttpPost("users")]
    public async Task<ActionResult<Users>> CreateUser([FromBody] Users newUser)
    {
        if (newUser == null)
        {
            return BadRequest("User data is null.");
        }

        // Check if the song already exists based on its ID
        var existingUser = await _applicationDbContext.Users
            .FirstOrDefaultAsync(t => t.uId == newUser.uId);

        if (existingUser != null)
        {
            return Ok("User with the same ID already exists.");
        }

        // Insert the new user into the database
        _applicationDbContext.Users.Add(newUser);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetUserById), new { id = newUser.uId }, newUser);
    }

    // POST api/userLikedSongs
    [HttpPost("userLikedSongs")]
    public async Task<ActionResult<UserLikedSongs>> CreateLikedSong([FromBody] UserLikedSongs newLikedSong)
    {
        if (newLikedSong == null)
        {
            return BadRequest("liked song data is null.");
        }

        // Check if the song already exists based on its ID
        var existingLiked = await _applicationDbContext.UserLikedSongs
            .FirstOrDefaultAsync(t => t.songId == newLikedSong.songId);

        if (existingLiked != null)
        {
            return Conflict("User already liked song.");
        }

        // Insert the new user into the database
        _applicationDbContext.UserLikedSongs.Add(newLikedSong);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLikedSongById), new { id = newLikedSong.songId }, newLikedSong);
    }

    // POST api/userHistory
    [HttpPost("userHistory")]
    public async Task<ActionResult<UserHistory>> CreateUserHistory([FromBody] UserHistory newHistory)
    {
        if (newHistory == null)
        {
            return BadRequest("history data is null.");
        }

        // Check if the song already exists based on its ID
        var existingHistory = await _applicationDbContext.UserHistory
            .FirstOrDefaultAsync(t => t.songId == newHistory.songId);

        if (existingHistory != null)
        {
            return Conflict("User already viewed song.");
        }

        // Insert the new user into the database
        _applicationDbContext.UserHistory.Add(newHistory);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetHistoryById), new { id = newHistory.songId }, newHistory);
    }

    // POST api/addFriends
    [HttpPost("users/addFriends")]
    public async Task<ActionResult<string[]>> CreateFriendship([FromBody] UserFriends friends)
    {
        if (friends == null)
        {
            return BadRequest("friend data is null.");
        }
        var friendOne = friends.userId;
        var friendTwo = friends.friendId;
        // Check if friends already exists based on IDs
        var existingFriends = await _applicationDbContext.UserFriends
            .FirstOrDefaultAsync(t => t.userId == friendOne && t.friendId == friendTwo);

        if (existingFriends != null)
        {
            return Conflict("Friendship already exists.");
        }

        // Insert the new user into the database
        _applicationDbContext.UserFriends.Add(new UserFriends { userId = friendOne, friendId = friendTwo });
        //_applicationDbContext.UserFriends.Add(new UserFriends { userId = friendTwo, friendId = friendOne });
        await _applicationDbContext.SaveChangesAsync();

    return CreatedAtAction(nameof(CreateFriendship), new { friendOne, friendTwo }, new { friendOne, friendTwo });
    }
}
