import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

const MePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else if (name === "confirmNewPassword") {
      setConfirmNewPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setMessage("Nowe hasło i potwierdzenie hasła nie pasują.");
      return;
    }

    axios
      .post("http://localhost:5000/changePassword", {
        currentPassword,
        newPassword,
      })
      .then((response) => {
        setMessage(response.data.msg);
      })
      .catch((error) => {
        setMessage("Błąd podczas zmiany hasła.");
        console.error(error);
      });
  };

  return (
    <div className="profile-main">
      <h2>Zmień hasło</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="currentPassword">Aktualne hasło:</label>
          <input
            type="password"
            id="currentPassword"
            name="currentPassword"
            value={currentPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="newPassword">Nowe hasło:</label>
          <input
            type="password"
            id="newPassword"
            name="newPassword"
            value={newPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmNewPassword">Potwierdź nowe hasło:</label>
          <input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            value={confirmNewPassword}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Zmień hasło</button>
      </form>
    </div>
  );
};

export default MePassword;
