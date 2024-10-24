using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : ControllerBase
{
    private readonly ApplicationDbContext _applicationDbContext;

    // Constructor injection for DatabaseAccess
    public DatabaseController(ApplicationDbContext applicationDbContext)
    {
        _applicationDbContext = applicationDbContext;
    }

    [HttpGet("data")]
    public IActionResult GetData()
     {
        var users = _applicationDbContext.GetDatabaseName();
        return Ok(users);
    }

    [HttpGet("database-name")]
    public IActionResult GetDatabaseName()
    {
        var dbName = _applicationDbContext.GetDatabaseName();
        if (string.IsNullOrEmpty(dbName))
        {
            return NotFound("Database name not found.");
        }
        return Ok(dbName);
    }
}
