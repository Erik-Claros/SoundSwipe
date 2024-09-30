using Microsoft.AspNetCore.Mvc;

namespace MyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get()
        {
            return Ok("Hello from MyController!");
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok($"You requested item {id}");
        }
    }
}
