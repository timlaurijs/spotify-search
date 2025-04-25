// @flow
import * as React from "react";
import { SpotifyArtist } from "service/types";

export const ArtistCard = ({
  images,
  name,
  followers,
  popularity,
}: SpotifyArtist) => {
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
      <p>{followers} followers</p>
      <p>Popularity: {popularity}</p>
    </div>
  );
};
