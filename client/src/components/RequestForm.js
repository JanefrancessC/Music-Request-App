import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const SERVER_URL =
  `${process.env.REACT_APP_API_URL}/twilio/sms` ||
  `${process.env.RENDER_APP_API_URL}/twilio/sms`;

const RequestForm = () => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(SERVER_URL, {
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
      // setMessage(`An error occurred. Please try again.`);
      console.error("Request failed:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      setMessage(
        error.response?.data?.message ||
          error.response?.data?.error ||
          error.message ||
          "An error occurred. Please try again.",
      );
    }
  };

  return (
    <div className="form-container">
      <h2>Request a Message</h2>
      <form onSubmit={handleRequest}>
        <div className="form-group">
          <label>Song Name: </label>
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
          <label>Phone Number: </label>
          <input
            type="tel"
            id="userPhone"
            value={userPhone}
            onChange={(e) => setUserPhone(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RequestForm;
