export interface SpotifyPaging {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export interface SpotifyImage {
  height?: number;
  url: string;
  width?: number;
}

export interface SpotifyArtist {
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  followers: number;
}
export interface SpotifyAlbum {
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  artists: SpotifyArtist[];
}
export interface SpotifyTrack {
  id: string;
  name: string;
  release_date: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
}

export interface SpotifySearchResults {
  artists: SpotifyPaging & {
    items: SpotifyArtist[];
  };
  albums: SpotifyPaging & {
    items: SpotifyAlbum[];
  };
  tracks: SpotifyPaging & {
    items: SpotifyTrack[];
  };
}
