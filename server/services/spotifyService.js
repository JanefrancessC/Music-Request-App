import axios from "axios";
import { getSpotifyAccessToken } from "../utils/spotifyAuth.js";

export const searchTrack = async (songName, artistName = "") => {
  const accessToken = await getSpotifyAccessToken();

  try {
    let query = songName;
    if (artistName) {
      query += ` artist:${artistName}`;
    }

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query
      )}&type=track&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const tracks = response.data.tracks.items;
    return tracks.length > 0 ? tracks[0] : null;
  } catch (error) {
    console.error("Error searching for track:", error.message);
    return null;
  }
};
