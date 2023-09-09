import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  FsquareIcon
} from "../../common/icons/icons.jsx";

const AddImages = () => {
  const navigate = useNavigate();

  const [selectedImage, setSelectedImage] = useState(null);
  const [msg, setMsg] = useState("");

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://localhost:5000/saveImageToDatabase", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data = response.data;

      if (data.image) {
        setMsg("Plik graficzny dodany pomyślnie.");
        setSelectedImage(null); // Clear selected image after successful upload
      } else {
        setMsg("Wystąpił błąd podczas dodawania pliku graficznego.");
      }
    } catch (error) {
        console.error("Błąd:", error);
        if (error.response) {
          console.error("Odpowiedź z serwera:", error.response.data);
        }
        setMsg("Wystąpił błąd podczas dodawania pliku graficznego.");
      }
      
  };

  return (
    <div>
      <div className="model-form-add">
        <div className="model-form-head">
          <FsquareIcon className="table-header-panel-icon" />Dodawanie Zdjęć
        </div>
        <div className="model-form-container">
          {msg && <p>{msg}</p>}
          <input type="file" onChange={handleImageChange} />
          <button onClick={handleImageUpload}>Dodaj zdjęcie</button>
        </div>
      </div>
    </div>
  );
};

export default AddImages;
