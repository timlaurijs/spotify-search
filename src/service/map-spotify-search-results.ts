import {
  SpotifySearchResults,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrack,
  SpotifyImage,
  SpotifyPaging,
} from "./types";

const defaultSpotifyPaging = {
  href: "",
  limit: 0,
  next: null,
  offset: 0,
  previous: null,
  total: 0,
  items: [],
};

export function mapSpotifySearchResults(
  apiResponse: SpotifyApi.SearchResponse,
): SpotifySearchResults {
  const mapImages = (images: SpotifyApi.ImageObject[]): SpotifyImage[] =>
    images.map((image) => ({
      height: image.height,
      url: image.url,
      width: image.width,
    }));

  const mapArtists = (
    artists: SpotifyApi.ArtistObjectFull[],
  ): SpotifyArtist[] =>
    artists.map((artist) => ({
      id: artist.id,
      images: artist.images ? mapImages(artist.images) : [],
      name: artist.name,
      popularity: artist.popularity || 0,
      followers: artist.followers?.total || 0,
    }));

  const mapAlbums = (
    albums: SpotifyApi.AlbumObjectSimplified[],
  ): SpotifyAlbum[] =>
    albums.map((album) => ({
      id: album.id,
      images: mapImages(album.images),
      name: album.name,
      release_date: album.release_date,
      artists: mapArtists(album.artists as SpotifyApi.ArtistObjectFull[]),
    }));

  const mapTracks = (tracks: SpotifyApi.TrackObjectFull[]): SpotifyTrack[] =>
    tracks.map((track) => ({
      id: track.id,
      name: track.name,
      release_date: track.album?.release_date || "",
      artists: mapArtists(track.artists as SpotifyApi.ArtistObjectFull[]),
      album: {
        id: track.album.id,
        images: mapImages(track.album.images),
        name: track.album.name,
        release_date: track.album.release_date,
        artists: mapArtists(
          track.album.artists as SpotifyApi.ArtistObjectFull[],
        ),
      },
    }));

  const mapPaging = <T, U>(
    paging: SpotifyApi.PagingObject<T>,
    mapItems: (items: T[]) => U[],
  ): SpotifyPaging & { items: U[] } => ({
    href: paging.href,
    limit: paging.limit,
    next: paging.next,
    offset: paging.offset,
    previous: paging.previous,
    total: paging.total,
    items: mapItems(paging.items),
  });

  return {
    artists: apiResponse.artists
      ? mapPaging(apiResponse.artists, mapArtists)
      : defaultSpotifyPaging,
    albums: apiResponse.albums
      ? mapPaging(apiResponse.albums, mapAlbums)
      : defaultSpotifyPaging,
    tracks: apiResponse.tracks
      ? mapPaging(apiResponse.tracks, mapTracks)
      : defaultSpotifyPaging,
  };
}
