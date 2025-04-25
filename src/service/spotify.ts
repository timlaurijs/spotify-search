import { SpotifySearchResults } from "service/types";
import { mapSpotifySearchResults } from "service/map-spotify-search-results";

// Get cached Spotify token
export const getSpotifyToken = async () => {
  try {
    const res = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization:
          "Basic " +
          Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
          ).toString("base64"),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch Spotify token: ${res.statusText}`);
    }

    const data = await res.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify token:", error);
    throw error;
  }
};

// Get cached search results
export const searchSpotify = async (
  query: string,
): Promise<SpotifyApi.SearchResponse> => {
  try {
    const token = await getSpotifyToken();
    console.log("Fetching Spotify search results for query:", query);

    const res = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track,artist,album&limit=10`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Spotify search failed: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error searching Spotify:", error);
    throw error;
  }
};

const cachedSearchResults: Record<string, SpotifySearchResults> = {};

export async function cachedSearchSpotify(query: string) {
  try {
    // Query to lowercase
    const key = query.trim().toLowerCase();

    // Check if the query is already cached
    if (cachedSearchResults[key]) {
      console.log("Cache hit for query:", key);
      return cachedSearchResults[key];
    }

    // Fetch results from Spotify API
    const results = await searchSpotify(key);
    const mappedResults = mapSpotifySearchResults(results);

    // Cache the results
    cachedSearchResults[key] = {
      albums: mappedResults.albums,
      tracks: mappedResults.tracks,
      artists: mappedResults.artists,
    };

    console.log("Updated cachedSearchResults:", cachedSearchResults);

    return cachedSearchResults[key];
  } catch (error) {
    console.error("Error in cachedSearchSpotify:", error);
    throw error;
  }
}
