import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AddDocument } from "../../common/icons/icons.jsx";
import { AddUserIll } from "../../common/illustrastion/illustration.jsx";
import { format } from 'date-fns';

const FormAddContract = () => {
  const { id } = useParams();
  const [startContract, setStartContract] = useState("");
  const [endContract, setEndContract] = useState("");
  const [position, setPosition] = useState("");
  const [typeContract, setTypeContract] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  return (
    <div>
      <div className="model-form-add">
        {/* <p className="msg-error">{msg}</p> */}
        <div className="model-form-head">
        <AddDocument className="table-header-panel-icon" />Formularz Dodawania Kontraktu Pracownika
      </div>
      <div className="model-form-head">
      <p className="model-form-head-info"> Wypełnij prosty formularz, aby skonfigurować umowę, w tym daty rozpoczęcia i zakończenia. </p>
      </div>
        <div className="model-form-container">
          <form onSubmit={saveContract}>
          
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormAddContract;
