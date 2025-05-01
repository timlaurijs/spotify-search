import * as React from "react";
import { Suspense } from "react";
import { ArtistCard } from "components/artist-card";
import { AlbumCard } from "components/album-card";
import { TrackCard } from "components/track-card";
import { cachedSearchSpotify } from "service/spotify";

export async function SearchResult({ query }: { query: string }) {
  const results = await cachedSearchSpotify(query);

  return (
    <div className="grid grid-cols-3 gap-20">
      <div>
        <h1 className="text-2xl font-bold mb-4">Artists</h1>
        <div className="grid grid-cols-2 gap-2">
          {results.artists.items.map((artist) => (
            <ArtistCard key={artist.id} {...artist} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Albums</h1>
        <div className="grid grid-cols-2 gap-4">
          {results.albums.items.map((album) => (
            <AlbumCard key={album.id} {...album} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-bold mb-4">Tracks</h1>
        <div className="grid grid-cols-1 gap-4">
          {results.tracks.items.map((track) => (
            <TrackCard key={track.id} {...track} />
          ))}
        </div>
      </div>
    </div>
  );
}
