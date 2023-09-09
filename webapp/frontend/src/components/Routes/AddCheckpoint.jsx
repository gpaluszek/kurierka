import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AvatarWoman,
  AvatarMan,
  SettingTwoIcon,
  AddUserIcon,
  FsquareIcon
} from "../../common/icons/icons.jsx";
import { AddUserIll  } from "../../common/illustrastion/illustration.jsx";

const AddCheckpoint = () => {

  const navigate = useNavigate();

  const initialFormData = {
    checkpointName: "",
    order: 0,
    latitude: 0,
    longitude: 0,
    googleMapsAddress: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/addCheckpoint", formData); // Assuming your API endpoint is "/api/addCheckpoint"
      const data = response.data;

      if (data.checkpoint) {
        setMsg("Punkt kontrolny dodany pomyślnie.");
        setFormData(initialFormData); // Clear form after successful submission
      } else {
        setMsg("Wystąpił błąd podczas dodawania punktu kontrolnego.");
      }
    } catch (error) {
      console.error("Błąd:", error);
      setMsg("Wystąpił błąd podczas dodawania punktu kontrolnego.");
    }
  };

  

  //   const dispatch = useDispatch();
  //   const navigate = useNavigate();
  //   const { isError
  //   //,user
  //   } = useSelector((state) => state.auth);

  //   useEffect(() => {
  //     dispatch(getMe());
  //   }, [dispatch]);

  //   useEffect(() => {
  //     if (isError) {
  //       navigate("/");
  //     }
  //     // if(user && user.role !== "admin"){
  //     //   navigate("/dashboard");
  //     // }
  //     // opcja dostępu inny niz admin do dashboard
  //   }, [isError,
  //     //user,

  //     navigate]);
  return (
    <div>
    <div className="model-form-add">
      <div className="model-form-head">
        <FsquareIcon className="table-header-panel-icon" />Zarządzanie Trasami: Twoja Centrum Kontroli
      </div>
      <div className="model-form-container">
        <form onSubmit={handleSubmit}>
            <label for="form-text-one">
                      Nazwa punktu kontrolnego
           </label>
          <input id="form-text-one"
            className="model-form-input-text"
            type="text"
            placeholder="Nazwa punktu kontrolnego"
            name="checkpointName"
            value={formData.checkpointName}
            onChange={handleChange}
          />
           <label for="form-text-two">
                      Numer punktu
            </label>
          <input id="form-text-two"
             className="model-form-input-text"
            type="number"
            placeholder="Kolejność"
            name="order"
            value={formData.order}
            onChange={handleChange}
          />
           <label for="form-text-three">
                      Szerokość Google
                    </label>
          <input id="form-text-three"
          className="model-form-input-text"
            type="text"
            placeholder="Szerokość geograficzna"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
           <label for="form-text-four">
                      Długość Google
                    </label>
          <input id="form-text-four"
          className="model-form-input-text"
            type="text"
            placeholder="Długość geograficzna"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
           <label for="form-text-five">
                      Adress Google
                    </label>
          <input id="form-text-five"
          className="model-form-input-text"
            type="text"
            placeholder="Adres Google Maps"
            name="googleMapsAddress"
            value={formData.googleMapsAddress}
            onChange={handleChange}
          />
           <label for="form-text-six">
                      Opis
                    </label>
          <textarea className="model-form-input-text" id="form-text-six"
            placeholder="Opis"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          
          <button className="model-from-input-submit" type="submit">Dodaj punkt kontrolny</button>
        </form>
      </div>
    </div>
  </div>
  
  );
};

export default AddCheckpoint;
