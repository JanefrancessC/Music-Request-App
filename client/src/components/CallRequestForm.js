import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const CallRequestForm = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(`http://localhost:3000/twilio/call`, {
        songName,
        artistName,
        userPhone,
      });
      setMessage(response.data.message);
      setArtistName("");
      setSongName("");
      setUserPhone("");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      setMessage(error.response?.data?.message || `An error occurred!`);
    }
  };

  return (
    <div className="form-container">
      <h2>Request a Call</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="songName">Song Name: </label>
          <input
            type="text"
            id="songName"
            value={songName}
            onChange={(e) => setSongName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="artistName">Artist Name: </label>
          <input
            type="text"
            id="artistName"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userPhone">Phone Number: </label>
          <input
            type="tel"
            id="userPhone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Request Call</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CallRequestForm;
