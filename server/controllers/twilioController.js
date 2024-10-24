import { sendSMS, makeCall } from "../services/twilioService.js";
import { searchTrack } from "../services/spotifyService.js";
import { twilioClient } from "../utils/twilioAuth.js";

export const handleSmsRequest = async (req, res) => {
  console.log("Received SMS request:", req.body);
  const { songName, userPhone } = req.body;

  try {
    const track = await searchTrack(songName);
    if (track) {
      const responseMessage = `Found: ${track.name} by ${track.artists[0].name}. Listen: ${track.external_urls.spotify}`;
      await sendSMS(userPhone, responseMessage);
      res.status(200).json({ message: `Request sent via SMS!` });
    } else {
      res.status(404).json({ message: `Song not found` });
    }
  } catch (error) {
    console.error("Error handling SMS request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const handleCallRequest = async (req, res) => {
  console.log("Received Call request:", req.body);
  const { songName, artistName, userPhone } = req.body;

  try {
    const track = await searchTrack(songName, artistName);
    if (track && track.preview_url) {
      const twiml = `<Response>
                    <Say voice="alice">Hi, this is a request from the Music Request App. Enjoy your song</Say>
                    <Play>${track.preview_url}</Play>
                     </Response>`;

      await twilioClient.calls.create({
        to: userPhone,
        from: process.env.TWILIO_NUMBER,
        twiml: twiml,
      });

      res.status(200).json({ message: "Song preview played via call!" });
    } else {
      res.status(404).json({ message: "No preview available for the track." });
    }
  } catch (error) {
    console.error("Error handling Call request:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
