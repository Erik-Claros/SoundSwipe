using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

public class FileReader {
    string filePath = "SoundController/Secrets-File/config.json";
   public static object fileReader() {
       string json = System.IO.File.ReadAllText(filePath);
       JObject jObject = JObject.Parse(json);

       console.WriteLine(jObject["clientID"]);
       console.WriteLine(jObject["clientSecret"]);
       console.WriteLine(jObject["scope"]); 
       return jObject;
   }    
}
namespace MyApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MyController : ControllerBase
    {
        // public IActionResult login () {
        //     string clientID = JsonReader.JsonReader()["clientID"];
        //     string clientSecret = JsonReader.JsonReader()["clientSecret"];

        //     string authURL = "https://accounts.spotify.com/authorize";
        //     string redirectURI = "http://localhost:5000/callback";
        //     return;
        // }    
    }
}
