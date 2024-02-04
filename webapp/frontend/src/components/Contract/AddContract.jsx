import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AddDocument } from "../../common/icons/icons.jsx";

import { format } from 'date-fns';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { NavLink } from "react-router-dom";
import { QestionCircle } from "../../common/icons/icons";

const FormAddContract = () => {
  const { id } = useParams();
  const [startContract, setStartContract] = useState("");
  const [endContract, setEndContract] = useState("");
  const [position, setPosition] = useState("");
  const [typeContract, setTypeContract] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [editedUserName, setEditedUserName] = useState("");  // Define these variables
  const [editedUserSurname, setEditedUserSurname] = useState("");  // Define these variables


  const saveContract = async (e) => {
    e.preventDefault();
    try {
      const formattedStartContract = format(new Date(startContract), 'dd.MM.yyyy');
      const formattedEndContract = format(new Date(endContract), 'dd.MM.yyyy');
  
      await axios.post(`http://localhost:5000/employee/${id}/contracts`, {
        startContract: formattedStartContract,
        endContract: formattedEndContract,
        position: position,
        typeContract: typeContract
      });
      navigate(`/users/${id}`);
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  
  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
      
        // Dodane przypisanie imienia, nazwiska, stanowiska i roli do nowych stanów
        setEditedUserName(response.data.name);
        setEditedUserSurname(response.data.surname);
        setPosition(
          response.data.profile && response.data.profile.contracts.length > 0
            ? response.data.profile.contracts[0].position
            : 'Brak stanowiska'
        );
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.msg);
        }
      }
    };
    getUserById();
  }, [id]);
  
  return (
    <div className="main-container">
      <div className="model-form-add">
        {/* <p className="msg-error">{msg}</p> */}
        <div className="model-form-head">
          <div className="model-form-head-panel">
            <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/users">Lista Pracowników</NavLink> &#62; <NavLink className="top-nav-dash-a">Edytuj pracownika</NavLink>
          </div>
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1">Edytuj Pracownika </h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
          <div className="edit-more-info">
            Edytujesz użytkownika: {editedUserName} {editedUserSurname},  Stanowisko: {position} 
            
      
          </div>
        </div>
        <div className="model-form-container">
          <form onSubmit={saveContract}>
          <div className="form-column-one">
          
              <label className="form-text-one">Start umowy</label>
              
                <input id="form-text-one"
                  type="date"
                  className="model-form-input-text"
                  value={startContract}
                  onChange={(e) => setStartContract(e.target.value)}
                  placeholder="Start umowy"
                  required
                />
            
          
              <label className="form-text-one">Koniec umowy</label>
           
                <input id="form-text-one"
                  type="date"
                  className="model-form-input-text"
                  value={endContract}
                  onChange={(e) => setEndContract(e.target.value)}
                  placeholder="Koniec umowy"
                  required
                />
        
              <label className="form-text-one">Stanowisko</label>
             
                <input id="form-text-one"
                  type="text"
                  className="model-form-input-text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  placeholder="Stanowisko"
                  required
                />
         
              <label className="form-text-one">Rodzaj umowy</label>
             
                <input id="form-text-one"
                  type="text"
                  className="model-form-input-text"
                  value={typeContract}
                  onChange={(e) => setTypeContract(e.target.value)}
                  placeholder="Rodzaj umowy"
                  required
                />
          
            <button type="submit" className="model-from-input-submit">
              Dodaj umowę
            </button>
            </div>
          </form>
        </div>
      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      Wypełnij poniższy formularz, by spersonalizować swoją umowę. Podaj precyzyjne daty rozpoczęcia i zakończenia, abyśmy mogli dostosować dokument do Twoich potrzeb.
      </Tooltip>
    </div>
  );
};

export default FormAddContract;
