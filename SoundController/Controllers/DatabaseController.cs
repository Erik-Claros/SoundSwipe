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
    public async Task<ActionResult<IEnumerable<UserFriends>>> GetUserFriends(int userId)
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
    public async Task<ActionResult<IEnumerable<UserHistory>>> GetUserHistory(int userId)
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
    public async Task<ActionResult<IEnumerable<UserLikedSongs>>> GetUserLikedSongs(int userId)
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

    // POST api/users
    //[HttpPost("users")]
    // public async Task<ActionResult<Users>> CreateUser([FromBody] Users newUser)
    // {
    //     if (newUser == null)
    //     {
    //         return BadRequest("User data is null.");
    //     }

    //     // Optionally, validate the newUser object here

    //     _applicationDbContext.Users.Add(newUser);
    //     await _applicationDbContext.SaveChangesAsync();

    //     return CreatedAtAction(nameof(GetUserById), new { id = newUser.uID }, newUser);
    // }

    // Add any additional methods you need here
}
