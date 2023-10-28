import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams, Link } from "react-router-dom";

const MeProfile = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Pobierz dane użytkownika z kontrolera "Me"
    axios
      .get(`http://localhost:5000/me`)
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych użytkownika:", error);
      });
  }, []);

  return (
    <div className="profile-main">
      {userData ? (
        <div>
          <h2>Mój profil</h2>
          <div>
            {userData.sex === "Kobieta" ? (
              <div className="circle-avatar-women">
                {`${userData.name.charAt(0).toUpperCase()}${userData.surname.charAt(0).toUpperCase()}`}
              </div>
            ) : (
              <div className="circle-avatar-man">
                {`${userData.name.charAt(0).toUpperCase()}${userData.surname.charAt(0).toUpperCase()}`}
              </div>
            )}
            <p>Imię: {userData.name}</p>
            <p>Nazwisko: {userData.surname}</p>
            <p>Adres: {userData.street} {userData.houseNumber}, {userData.city}, {userData.postCode}</p>
            <p>Płeć: {userData.sex}</p>
            <p>Numer telefonu: {userData.phoneNumber}</p>
            <p>Email: {userData.email}</p>
            <p>Rola: {userData.role}</p>
            <p>Status: {userData.status}</p>
            {/* Dodaj linki do zmiany hasła, kontraktów i "Moje trasy" */}
            <Link to="/me/changepassword">Zmień hasło</Link>
            <Link to="/my-contracts">Moje kontrakty</Link>
            <Link to="/my-routes">Moje trasy</Link>
          </div>
        </div>
      ) : (
        <p>Ładowanie...</p>
      )}
    </div>
  );
};

export default MeProfile;
