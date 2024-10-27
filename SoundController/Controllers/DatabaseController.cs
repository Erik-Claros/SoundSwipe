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
    public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
    {
        var users = await _applicationDbContext.Users.ToListAsync();
        return Ok(users);
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
    public async Task<ActionResult<IEnumerable<UserFriends>>> GetUserFriends(string userId)
    {
        var friends = await _applicationDbContext.UserFriends
            .Where(uf => uf.userId == userId)
            .ToListAsync();

        if (!friends.Any())
        {
            return NotFound("No friends found for this user.");
        }

        return Ok(friends);
    }

    // GET api/users/{userId}/history
    [HttpGet("users/{userId}/history")]
    public async Task<ActionResult<IEnumerable<UserHistory>>> GetUserHistory(string userId)
    {
        var history = await _applicationDbContext.UserHistory
            .Where(uh => uh.userId == userId)
            .ToListAsync();

        if (!history.Any())
        {
            return NotFound("No history found for this user.");
        }

        return Ok(history);
    }

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
            return Conflict("Song with the same ID already exists.");
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
            return Conflict("User with the same ID already exists.");
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
}
