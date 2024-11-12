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
        var friends = await _applicationDbContext.UserFriends
            .Where(uf => uf.userId == userId)
            .Select(uf => uf.friendId)
            .Union(
                _applicationDbContext.UserFriends
                    .Where(uf => uf.friendId == userId)
                    .Select(uf => uf.userId)
            )
            .ToListAsync();

        if (!friends.Any())
        {
            return NotFound("No friends found for this user.");
        }

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

    // GET api/user/friendRequests/{uId}
    [HttpGet("user/friendRequests/{uId}")]
    public async Task<ActionResult<FriendRequests>> GetFriendRequestsById(string id)
    {
        var user = await _applicationDbContext.FriendRequests.FindAsync(id);
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

    // GET api/song/{id}
    [HttpGet("previewTracks/{id}")]
    public async Task<ActionResult<PreviewTracks>> GetTrackById(string id)
    {
        var track = await _applicationDbContext.PreviewTracks.FindAsync(id);
        if (track == null)
        {
            return NotFound();
        }
        return Ok(track);
    }

    // POST api/songs
    [HttpPost("songs")]
    public async Task<ActionResult<Songs>> CreateSong([FromBody] Songs newSong)
    {
        if (newSong == null)
        {
            return BadRequest("Song data is null.");
        }

        var existingSong = await _applicationDbContext.Songs
            .FirstOrDefaultAsync(t => t.sId == newSong.sId);

        if (existingSong != null)
        {
            return Ok("Song with the same ID already exists.");
        }

        _applicationDbContext.Songs.Add(newSong);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSongById), new { id = newSong.sId }, newSong);
    }

    // POST api/previewTrack
    [HttpPost("previewTracks")]
    public async Task<ActionResult<PreviewTracks>> CreatePreviewTrack([FromBody] PreviewTracks newTrack)
    {
        if (newTrack == null)
        {
            return BadRequest("Track data is null.");
        }

        var existingSong = await _applicationDbContext.PreviewTracks
            .FirstOrDefaultAsync(t => t.spotifyId == newTrack.spotifyId);

        if (existingSong != null)
        {
            return Ok("Track with the same ID already exists.");
        }

        _applicationDbContext.PreviewTracks.Add(newTrack);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTrackById), new { id = newTrack.spotifyId }, newTrack);
    }

    [HttpGet("GetPreviewTracks")]
    public async Task<ActionResult<IEnumerable<PreviewTracks>>> GetAllPreviewTracks()
    {
        var tracks = await _applicationDbContext.PreviewTracks.ToListAsync();

        if (tracks == null || tracks.Count == 0)
        {
            return NotFound("No preview tracks found.");
        }

        return Ok(tracks);
    }

    [HttpGet("checkFromFriendRequests/{userId}")]
    public async Task<ActionResult<IEnumerable<string>>> CheckFromFriendRequests(string userId)
    {
        var requests = await _applicationDbContext.FriendRequests
            .Where(r => r.toId == userId)
            .Select(r => r.fromId)
            .ToListAsync();

        if (requests == null)
        {
            return NotFound();
        }
        return Ok(requests);
    }

    [HttpGet("checkToFriendRequests/{userId}")]
    public async Task<ActionResult<IEnumerable<string>>> CheckToFriendRequests(string userId)
    {
        var requests = await _applicationDbContext.FriendRequests
            .Where(r => r.fromId == userId)
            .Select(r => r.toId)
            .ToListAsync();

        if (requests == null)
        {
            return NotFound();
        }
        return Ok(requests);
    }

    // POST api/users
    [HttpPost("users")]
    public async Task<ActionResult<Users>> CreateUser([FromBody] Users newUser)
    {
        if (newUser == null)
        {
            return BadRequest("User data is null.");
        }

        var existingUser = await _applicationDbContext.Users
            .FirstOrDefaultAsync(t => t.uId == newUser.uId);

        if (existingUser != null)
        {
            return Ok("User with the same ID already exists.");
        }

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

        var existingLiked = await _applicationDbContext.UserLikedSongs
            .FirstOrDefaultAsync(t => t.songId == newLikedSong.songId);

        if (existingLiked != null)
        {
            return Conflict("User already liked song.");
        }

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

        var existingHistory = await _applicationDbContext.UserHistory
            .FirstOrDefaultAsync(t => t.songId == newHistory.songId);

        if (existingHistory != null)
        {
            return Conflict("User already viewed song.");
        }

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
        var existingFriends = await _applicationDbContext.UserFriends
            .FirstOrDefaultAsync(t => t.userId == friendOne && t.friendId == friendTwo);

        if (existingFriends != null)
        {
            return Conflict("Friendship already exists.");
        }

        _applicationDbContext.UserFriends.Add(new UserFriends { userId = friendOne, friendId = friendTwo });
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(CreateFriendship), new { friendOne, friendTwo }, new { friendOne, friendTwo });
    }

    // POST api/addFriendRequests
    [HttpPost("users/addFriendRequests")]
    public async Task<ActionResult<string[]>> CreatePendingFriendship([FromBody] FriendRequests newPending)
    {
        if (newPending == null)
        {
            return BadRequest("friend request data is null.");
        }

        var existingPending = await _applicationDbContext.FriendRequests
            .FirstOrDefaultAsync(t => t.fromId == newPending.fromId && t.toId == newPending.toId);

        if (existingPending != null)
        {
            return Conflict("Friendship already exists.");
        }

        _applicationDbContext.FriendRequests.Add(newPending);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(CreatePendingFriendship), new { newPending.fromId }, newPending);
    }

    // DELETE api/users/deleteFriendRequest
    [HttpDelete("users/deleteFriendRequest")]
    public async Task<ActionResult> DeleteFriendRequest([FromBody] FriendRequests requestToDelete)
    {
        if (requestToDelete == null)
        {
            return BadRequest("Request data is null.");
        }

        // Find the friend request based on fromId and toId
        var existingRequest = await _applicationDbContext.FriendRequests
            .FirstOrDefaultAsync(t => t.fromId == requestToDelete.fromId && t.toId == requestToDelete.toId);

        if (existingRequest == null)
        {
            return NotFound("Friend request not found.");
        }

        // Remove the request
        _applicationDbContext.FriendRequests.Remove(existingRequest);
        await _applicationDbContext.SaveChangesAsync();

        // Return a success response
        return NoContent(); // HTTP 204 No Content indicates successful deletion with no return data
    }

    // POST api/addFriendRequests
    [HttpPost("users/messages")]
    public async Task<ActionResult<string[]>> SendMessage([FromBody] UserMessages message)
    {
        if (message == null)
        {
            return BadRequest("friend request data is null.");
        }

        _applicationDbContext.UserMessages.Add(message);
        await _applicationDbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(SendMessage), new { message.senderId }, message);
    }

    [HttpGet("conversation/{toId}/{fromId}")]
    public async Task<ActionResult<IEnumerable<UserMessages>>> GetConversation(string toId, string fromId)
    {
        var conversation = await _applicationDbContext.UserMessages
            .Where(m => m.senderId == fromId && m.receiverId == toId)
            .Union(
                _applicationDbContext.UserMessages
                    .Where(m => m.senderId == toId && m.receiverId == fromId)
            )
            .OrderBy(m => m.timestamp)
            .ToListAsync();

        if (conversation == null)
        {
            return NotFound();
        }
        return Ok(conversation);
    }
}
