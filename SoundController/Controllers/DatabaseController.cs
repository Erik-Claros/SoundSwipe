[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly DatabaseContext _dbContext;

    public UsersController()
    {
        _dbContext = new DatabaseContext("Data Source=mydatabase.db");
    }

    [HttpGet]
    public ActionResult<List<User>> Get()
    {
        // Assuming you have a method to fetch users from the database
        var users = _dbContext.GetUsers();
        return Ok(users);
    }
}
