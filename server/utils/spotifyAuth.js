import axios from "axios";
import "dotenv/config";

let accessToken = null;
let tokenExpiry = null;

export const getSpotifyAccessToken = async () => {
  try {
    console.log("Requesting Spotify access token...");
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
          ).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("Spotify Access Token: ", response.data.access_token);
    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching Spotify access token:", error.message);
    throw error;
  }
};
