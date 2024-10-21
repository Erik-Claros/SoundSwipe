// track.model.ts
export interface Image {
  url: string;
  width: number;
  height: number;
}

export interface Album {
  album_type: string;
  id: string;
  name: string; 
  images: Image[]; 
  release_date: string; 
}

export interface Artist {
  name: string; 
}

export interface Track {
  id: string;
  name: string; 
  artists: Artist[];
  album: Album;
  duration_ms: number;
  explicit: boolean;
  external_urls: { spotify: string };
  preview_url: string; 
}
