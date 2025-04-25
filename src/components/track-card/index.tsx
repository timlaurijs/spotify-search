// @flow
import * as React from "react";
import { SpotifyTrack } from "service/types";

export const TrackCard = ({
  name,
  release_date,
  artists,
  album,
}: SpotifyTrack) => {
  return (
    <div>
      <h2 className="text-lg font-bold">{name}</h2>
      <p>
        <span className="text-lg font-bold">
          {artists.length > 1 ? "Artists: " : "Artist: "}
        </span>
        {artists.map(({ name }, idx) => (
          <span key={idx}>
            {name}
            {idx < artists.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p>Release date: {release_date}</p>
      <p>Album: {album.name}</p>
    </div>
  );
};
