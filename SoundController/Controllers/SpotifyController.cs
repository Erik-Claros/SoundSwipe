using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace SoundController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SpotifyController : ControllerBase
    {
        // This is the request that calls the method to retrieve the information in Client CS

        [HttpGet("artist/{artistName}")]
        public async Task<IActionResult> GetArtist(string artistName)
        {
            var artistData = await SpotifyClient.GetArtist(artistName);

            if (artistData == null)
            {
                return NotFound($"Artist {artistName} not found.");
            }

            return Ok(artistData); 
        }

        [HttpGet("track/{id}")]
        public async Task<IActionResult> GetTrack(string id) 
        {
            try
            {
                var trackData = await SpotifyClient.GetTrackDetails(id); 

                if (trackData == null)
                {
                    return NotFound($"Track with ID {id} not found.");
                }

                return Ok(trackData); 
            }
            catch (Exception ex)
            {
                return BadRequest($"Error fetching track: {ex.Message}");
            }
        }

        [HttpGet("previewTrack/{id}")]
        public async Task<IActionResult> GetPreview(string id){
            try{
                var previewTrack = await SpotifyClient.GetTrackPreview(id);
                if (previewTrack == null)
                {
                    return NotFound($"Track with ID {id} not found.");
                }

                return Ok(previewTrack); 

            }
            catch (Exception ex){
                return BadRequest($"Error fetching track: {ex.Message}");
            }
        }

       [HttpGet("GetAllPreviewTracks")]
        public async Task<IActionResult> GetAllTracksWithPreviewUrl()
        {
            try
            {
                // Call the method to get all tracks with preview URLs
                var tracksWithPreview = await SpotifyClient.GetAllTracksWithPreview();

                // Check if any tracks were found
                if (tracksWithPreview == null || tracksWithPreview.Count == 0)
                {
                    return NotFound("No tracks with preview URLs found.");
                }

                // Return the list of track IDs
                return Ok(tracksWithPreview);
            }
            catch (Exception ex)
            {
                // Handle any exceptions and return a BadRequest response
                return BadRequest($"Error fetching tracks with previews: {ex.Message}");
            }
        }
    }
}
