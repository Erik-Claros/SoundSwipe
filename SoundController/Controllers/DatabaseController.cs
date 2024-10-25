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
            .Where(uf => uf.UserId == userId)
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
            .Where(uh => uh.UserId == userId)
            .ToListAsync();

        if (!history.Any())
        {
            return NotFound("No history found for this user.");
        }

        return Ok(history);
    }

    // GET api/users/{userId}/liked-songs
    [HttpGet("users/{userId}/liked-songs")]
    public async Task<ActionResult<IEnumerable<UserLikedSongs>>> GetUserLikedSongs(string userId)
    {
        var likedSongs = await _applicationDbContext.UserLikedSongs
            .Where(uls => uls.UserId == userId)
            .ToListAsync();

        if (!likedSongs.Any())
        {
            return NotFound("No liked songs found for this user.");
        }

        return Ok(likedSongs);
    }

    // GET api/tracks/{id}
    [HttpGet("tracks/{id}")]
    public async Task<ActionResult<Songs>> GetSongById(string id)
    {
        var song = await _applicationDbContext.Songs.FindAsync(id);
        if (song == null)
        {
            return NotFound();
        }
        return Ok(song);
    }

    // POST api/tracks
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

}
