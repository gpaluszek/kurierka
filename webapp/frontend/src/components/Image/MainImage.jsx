import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    HeartFav,
    FsquareIcon
  } from "../../common/icons/icons.jsx";
  import { NavLink } from "react-router-dom";
const DisplayImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get("/api/getImages"); // Assuming your API endpoint is "/api/getImages"
      setImages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <div>
        <div className="table-header-panel">
        <FsquareIcon className="table-header-panel-icon" />Zarządzanie Trasami: Twoja Centrum Kontroli
        </div>
        <div className="table-header-panel">
          <NavLink className="options-button"  to="/addimage">Dodaj punkt </NavLink>
        </div>
      <h2>Wyświetlanie Zdjęć</h2>
      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <div className="image-list">
          {images.map((image) => (
            <div className="image-item" key={image.id}>
              <img src={`/images/${image.imageUrl}`} alt={`Image ${image.id}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayImages;
