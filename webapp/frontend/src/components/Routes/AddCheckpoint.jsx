import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import { QestionCircle } from "../../common/icons/icons";

const AddCheckpoint = () => {

  const navigate = useNavigate();

  const initialFormData = {
    checkpointName: "",
    order: 0,
    latitude: 0,
    longitude: 0,
    googleMapsAddress: "",
    description: "",
    city: "", // Dodaj puste pole miasto
    houseNumber: "", // Dodaj puste pole numer domu
    postCode: "", // Dodaj puste pole kod pocztowy
    street: "", // Dodaj puste pole ulica
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
    console.log("Próba wysłania formularza");
    try {
      const response = await axios.post(
        "http://localhost:5000/addCheckpoint",
        formData
      );
      const data = response.data;

      if (data.checkpoint) {
        setMsg("Punkt kontrolny dodany pomyślnie.");
        setFormData(initialFormData);
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
    <div className="main-container">
    <div className="model-form-add">
    <div className="model-form-head">
          <div className="model-form-head-panel">
            <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/users">Lista Pracowników</NavLink> &#62; <NavLink className="top-nav-dash-a">Dodaj punkt</NavLink>
          </div>
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1"> Dodaj Punkt </h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
      </div>
      <div className="model-form-container">
    
      {msg && <p>{msg}</p>}
          <form onSubmit={handleSubmit}>
          <div className="form-column-one">
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
           <label for="form-text-six">
                      Miasto
                    </label>
          <textarea className="model-form-input-text" id="form-text-six"
            placeholder="W jakim mieście znajduje się punkt"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
             <label for="form-text-six">
                      Ulica
                    </label>
          <textarea className="model-form-input-text" id="form-text-six"
            placeholder="Na jakiej ulicy znajduje się punkt"
            name="street"
            value={formData.street}
            onChange={handleChange}
          />
           <label for="form-text-six">
                      Numer domu
                    </label>
          <textarea className="model-form-input-text" id="form-text-six"
            placeholder="Jaki numer domu/lokalu ma punkt"
            name="houseNumber"
            value={formData.houseNumber}
            onChange={handleChange}
          />
           <label for="form-text-six">
                      Kod Pocztowy
                    </label>
          <textarea className="model-form-input-text" id="form-text-six"
            placeholder="Jaki kod pocztowy ma przypisany punkt"
            name="postCode"
            value={formData.postCode}
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
            placeholder="Dodatkowe informacje o punkcie"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          
          
          <button className="model-from-input-submit" type="submit">
              Dodaj punkt kontrolny
            </button>
            </div>
          </form>
          
        </div>
      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      Dodaj nowy punkt trasy kuriera, klikając poniższy przycisk. Wprowadź dokładne informacje dotyczące lokalizacji, abyśmy mogli zoptymalizować trasę dla efektywnego dostarczenia.
       </Tooltip>
    </div>
  );
};

export default AddCheckpoint;
