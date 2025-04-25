// @flow
import * as React from "react";
import { SpotifyAlbum } from "service/types";

export const AlbumCard = ({
  images,
  name,
  release_date,
  artists,
}: SpotifyAlbum) => {
  const imageUrl = images[0]?.url;

  return (
    <div>
      <div
        className={`w-54 h-54 rounded-lg flex items-center justify-center ${
          imageUrl ? "" : "bg-yellow-500"
        }`}
        style={{
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {!imageUrl && (
          <span
            className="text-black font-bold text-8xl"
            style={{ fontFamily: "'Old English Text MT', 'Gothic', serif" }}
          >
            ??
          </span>
        )}{" "}
      </div>
      <h2 className="text-lg font-bold">{name}</h2>
      <p>
        {artists.length > 1 ? "Artists: " : "Artist: "}
        {artists.map(({ name }, idx) => (
          <span key={idx}>
            {name}
            {idx < artists.length - 1 && ", "}
          </span>
        ))}
      </p>
      <p>Release date: {release_date}</p>
    </div>
  );
};
