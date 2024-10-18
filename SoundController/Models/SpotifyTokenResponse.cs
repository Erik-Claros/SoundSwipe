using System.Text.Json.Serialization;

namespace SoundController.Models
{
    public class SpotifyTokenResponse
    {
        [JsonPropertyName("access_token")]
        public string AccessToken { get; set; }

        [JsonPropertyName("token_type")]
        public string TokenType { get; set; }

        [JsonPropertyName("expires_in")]
        public int ExpiresIn { get; set; }
    }

    public class TrackResponse
    {
        public TrackList Tracks { get; set; }
    }

    public class TrackList
    {
        public List<TrackItem> Items { get; set; }
    }

    public class TrackItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        // Add other properties as needed
    }

}
