using System.Net.Http.Headers;
using System.Text.Json;
using SoundController.Models;
using Newtonsoft.Json.Linq;  
public class SpotifyClient
{
    // Client Information. This is the project dash boards information
    private static readonly string clientId = "679cd174bbd94d81bcae6f01f918e576"; 
    private static readonly string clientSecret = "674b97ab088148f6bca207781f31d892"; 
    private static readonly string tokenEndpoint = "https://accounts.spotify.com/api/token";
    private static readonly string baseUrl = "https://api.spotify.com/v1/";

    // This method is dedicated to retriving the auth token used to access the Spotif's API. 
    private static async Task<string> GetSpotifyAccessToken()
    {
        using (var client = new HttpClient())
        {
            var credentials = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes($"{clientId}:{clientSecret}"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", credentials);

            var requestBody = new Dictionary<string, string>
            {
                { "grant_type", "client_credentials" }
            };

            var requestContent = new FormUrlEncodedContent(requestBody);
            var response = await client.PostAsync(tokenEndpoint, requestContent);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"Error fetching access token: {response.StatusCode}, {errorContent}");
            }

            var tokenResponseJson = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonSerializer.Deserialize<SpotifyTokenResponse>(tokenResponseJson);

#pragma warning disable CS8602 // Dereference of a possibly null reference.
            return tokenResponse.AccessToken;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        }
    }
    public static async Task<string> GetArtist(string artistName)
    {
        string token = await GetSpotifyAccessToken(); // Get access token
        token = token.Trim(); 

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            // Ensure the artistName is URL-encoded
            var encodedArtistName = Uri.EscapeDataString(artistName);
            var searchUrl = $"{baseUrl}search?q={encodedArtistName}&type=artist";

            // Log the request URL
            Console.WriteLine($"Request URL: {searchUrl}");

            var response = await client.GetAsync(searchUrl);

            // Check for success
            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error Content: {errorContent}"); 
                throw new Exception($"Error fetching artist: {response.StatusCode}, {errorContent}");
            }

            var artistData = await response.Content.ReadAsStringAsync();
            return artistData; 
        }
    }
    public static async Task<string> GetTrackDetails(string trackId)
    {
        string token = await GetSpotifyAccessToken();

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var trackUrl = $"{baseUrl}tracks/{trackId}"; 

            Console.WriteLine($"Request URL: {trackUrl}");

            var response = await client.GetAsync(trackUrl);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error Content: {errorContent}"); 
                throw new Exception($"Error fetching track details: {response.StatusCode}, {errorContent}"); 
            }

            var trackData = await response.Content.ReadAsStringAsync();
            return trackData;
        }
    }

    public static async Task<string> GetTrackPreview(string trackId)
    {
        string token = await GetSpotifyAccessToken();

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            var trackUrl = $"{baseUrl}tracks/{trackId}"; 
            Console.WriteLine($"Request URL: {trackUrl}");

            var response = await client.GetAsync(trackUrl);

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Error Content: {errorContent}"); 
                throw new Exception($"Error fetching track details: {response.StatusCode}, {errorContent}"); 
            }

            var trackData = await response.Content.ReadAsStringAsync();

            // Parse the JSON response to extract the preview_url
            var jsonResponse = JObject.Parse(trackData);
            var previewUrl = jsonResponse["preview_url"]?.ToString();

            if (string.IsNullOrEmpty(previewUrl))
            {
                Console.WriteLine("No preview available for this track.");
                return "No preview available.";
            }

            return previewUrl;  
        }
    }

   public static async Task<List<string>> GetAllTracksWithPreview()
    {
        var tracksWithPreview = new List<string>();
        string token = await GetSpotifyAccessToken();
        string? searchUrl = null; // Initialize search URL

        using (var client = new HttpClient())
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);

            // Define a list of keywords or genres to search for
            var searchKeywords = new List<string>
            {
                "pop", "hip-hop", "indie"
            };

            foreach (var keyword in searchKeywords)
            {
                searchUrl = $"{baseUrl}search?q={Uri.EscapeDataString(keyword)}&type=track&limit=50";

                while (!string.IsNullOrEmpty(searchUrl))
                {
                    var response = await client.GetAsync(searchUrl);

                    if (!response.IsSuccessStatusCode)
                    {
                        var errorContent = await response.Content.ReadAsStringAsync();
                        throw new Exception($"Error fetching tracks: {response.StatusCode}, {errorContent}");
                    }

                    var searchResultsJson = await response.Content.ReadAsStringAsync();
                    var jsonResponse = JObject.Parse(searchResultsJson);
                    var tracks = jsonResponse["tracks"]?["items"];

                    foreach (var track in tracks)
                    {
                        var previewUrl = track["preview_url"]?.ToString();
                        if (!string.IsNullOrEmpty(previewUrl))
                        {
                            tracksWithPreview.Add(track["id"]?.ToString()); 
                        }
                    }

                    // Check if there's a next page
                    searchUrl = jsonResponse["tracks"]?["next"]?.ToString(); 
                }
            }
        }

        return tracksWithPreview;
    }


}
