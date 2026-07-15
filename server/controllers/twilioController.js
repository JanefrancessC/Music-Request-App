import { sendSMS, makeCall } from "../services/twilioService.js";
import { searchTrack } from "../services/spotifyService.js";
import { twilioClient } from "../utils/twilioAuth.js";
import { response } from "express";

export const handleSmsRequest = async (req, res) => {
  console.log("Received SMS request:", req.body);
  const { songName, artistName, userPhone } = req.body;

  try {
    const track = await searchTrack(songName, artistName);

    if (!track) {
      return res.status(404).json({
        error: `Track not found.`,
      });
    }

    if (track) {
      const responseMessage = `Hi Janefrancess sent you ${track.name} by ${track.artists[0].name}. Listen: ${track.external_urls.spotify}`;
      await sendSMS(userPhone, responseMessage);
      res.status(200).json({ message: `Request sent via SMS!` });
    } else {
      res.status(404).json({ message: `Song not found` });
    }
  } catch (error) {
    const spotifyMessage = error.response?.data;
    console.error("Error handling SMS request:", {
      name: error?.name,
      message: error?.message,
      code: error?.code,
      status: error?.status,
      moreInfo: error?.moreInfo,
      details: error,
    });

    return res.status(500).json({
      error: "Unable to process the SMS request",
      details: error?.message ?? "Unknown error",
    });

    // console.error("Error handling SMS request:", spotifyMessage);
    
    // return res.status(503).json({
    //   error: "Music search is temporarily unavailable",
    //   details:
    //     typeof spotifyMessage === "string"
    //       ? spotifyMessage
    //       : "Spotify service request failed",
    // });
  }
};

export const handleCallRequest = async (req, res) => {
  console.log("Received Call request:", req.body);
  const { songName, artistName, userPhone } = req.body;

  try {
    const track = await searchTrack(songName, artistName);
    console.log("Spotify track object:", JSON.stringify(track, null, 2));
    if (track && track.uri) {
      const twiml = `
        <Response>
          <Say voice="alice">Hey Amy, I know things have been tough. Remember this? Close your eyes and let the music take you back. </Say>
          <Play>${track.uri}</Play>
        </Response>`;

      // await twilioClient.calls.create({
      //   to: userPhone,
      //   from: process.env.TWILIO_NUMBER,
      //   twiml: twiml,
      // });
      await makeCall(userPhone, twiml);

      res.status(200).json({ message: "Song preview played via call!" });
    } else {
      res.status(404).json({ message: "No preview available for the track." });
    }
  } catch (error) {
    console.error("Error handling Call request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
