// track.model.ts
export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Album {
  album_type: string;
  id: string;
  name: string; // The name of the album
  images: Image[]; // The album images
  release_date: string; // Add this property for the release date
  // Add any other relevant properties for album here
}

export interface Artist {
  name: string; // Adjust based on the structure of the artist object
  // Add any other relevant properties for artists here
}

export interface Track {
  id: string;
  name: string; // Change from title to name
  artists: Artist[];
  album: Album;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  preview_url: string; // This might be the same as what you're fetching in PreviewTrack
  // Add any other relevant properties here
}
