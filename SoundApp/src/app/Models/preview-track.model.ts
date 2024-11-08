export interface PreviewTrack {
  previewUrl: string;
}

export interface AllPreviewTracks {
  previewTracks: PreviewTrackAttributes[];
}

export interface PreviewTrackAttributes {
  spotifyId: string;
  genre?: string;
}
