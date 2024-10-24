import express from "express";
import "dotenv/config";
import cors from "cors";
import twilioRoutes from "./routes/twilio.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/twilio", twilioRoutes);

// console.log("SPOTIFY_CLIENT_ID:", process.env.SPOTIFY_CLIENT_ID);
// console.log("SPOTIFY_CLIENT_SECRET:", process.env.SPOTIFY_CLIENT_SECRET);
// console.log("SPOTIFY_REDIRECT_URI:", process.env.SPOTIFY_REDIRECT_URI);
// console.log("TWILIO_ACCOUNT_SID:", process.env.TWILIO_ACCOUNT_SID);
// console.log("TWILIO_AUTH_TOKEN:", process.env.TWILIO_AUTH_TOKEN);
// console.log("TWILIO_NUMBER:", process.env.TWILIO_NUMBER);

app.listen(port, () => console.log(`listening on port ${port}`));
