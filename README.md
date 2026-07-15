# 🎵 MusicRequest App

A full-stack music request application that allows users to search for songs using the Spotify Web API and receive confirmations via SMS or automated voice calls using Twilio.

The project demonstrates third-party API integration, RESTful backend development, asynchronous programming, and service-oriented architecture using Node.js and Express.

---

## ✨ Features

- 🎵 Search for songs using the Spotify Web API
- 📱 Send SMS confirmations via Twilio
- 🌐 RESTful API built with Express
- ⚡ Fast and responsive React frontend
- 🔐 Secure environment variable configuration
- 🏗️ Modular backend architecture

---

## 🛠️ Tech Stack

### Frontend

- React
- JavaScript
- HTML5
- CSS3
- Fetch API

### Backend

- Node.js
- Express
- Axios

### Third-Party APIs

- Spotify Web API
- Twilio Programmable SMS
- Twilio Voice API

---

## 📁 Project Structure

```text
musicRequest/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── index.js
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/JanefrancessC/Music-Request-App.git

cd musicRequest
```

### Install dependencies

```bash
npm install
```

---

## ⚙️ Environment Variables

Create a `.env` file in the project root.

```env
PORT=3001

SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
SPOTIFY_REDIRECT_URI=http://localhost:3000/callback

TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_NUMBER=YOUR_TWILIO_PHONE_NUMBER
```

---

## ▶️ Running the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm start
```

The server runs on:

```
http://localhost:3001
```

---

## 📡 API Endpoints

### Send SMS Music Request

```http
POST /twilio/sms
```

Example Request

```json
{
  "songName": "Fix You",
  "artistName": "Coldplay",
  "userPhone": "+447********"
}
```

---

### Make Voice Call

```http
POST /twilio/call
```

Example Request

```json
{
  "songName": "Paradise",
  "artistName": "Coldplay",
  "userPhone": "+447*********"
}
```

---

## 🏗️ Architecture

```text
                 React Frontend
                       │
                       │ HTTP Request
                       ▼
              Express REST API
                       │
         ┌─────────────┴─────────────┐
         │                           │
         ▼                           ▼
 Spotify Search API             Twilio API
         │                           │
         ▼                           ▼
 Song Information         SMS / Voice Call
```

---

## 🚀 Deployment

This application is designed to be deployed on **Render**.

### Backend

- Runtime: Node
- Build Command

```bash
npm install
```

- Start Command

```bash
npm start
```

---

## 🔮 Future Improvements

- User authentication
- Request history
- Playlist generation
- Queue management
- Apple Music integration
- Better validation
- Unit and integration testing
- Docker support
- Rate limiting
- Logging and monitoring

---

## 📝 Lessons Learned

Building this project provided hands-on experience with:

- REST API design
- Environment variable management
- Third-party API integration
- Handling asynchronous operations with async/await
- Error handling across external services
- Working with Spotify and Twilio APIs
- Managing API authentication and access tokens

---

## 👩🏽‍💻 Author

**Chioma Janefrancess Okeke**

Software Engineer

- GitHub: https://github.com/JanefrancessC
- LinkedIn: https://www.linkedin.com/in/chiomajokeke
