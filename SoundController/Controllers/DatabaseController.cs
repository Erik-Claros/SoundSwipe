using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class DatabaseController : Controller
{

    private readonly DatabaseAccess _databaseAccess;

    public DatabaseController()
    {
        _databaseAccess = new DatabaseAccess();
    }

    [HttpGet]
    public IActionResult GetData()
    {
        var data = _databaseAccess.GetData();
        return Ok(data);
    }
}
