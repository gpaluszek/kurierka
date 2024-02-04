import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
import { NavLink } from "react-router-dom";
import { QestionCircle } from "../../common/icons/icons";
import { AddUserIll } from "../../common/illustrastion/illustration.jsx";

const FormEditUser = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const [editedUserName, setEditedUserName] = useState("");
  const [editedUserSurname, setEditedUserSurname] = useState("");
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUserById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/users/${id}`);
        setName(response.data.name);
        setSurname(response.data.surname);
        setStreet(response.data.street);
        setHouseNumber(response.data.houseNumber);
        setCity(response.data.city);
        setPostCode(response.data.postCode);
        setSex(response.data.sex);
        setPhoneNumber(response.data.phoneNumber);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setConfPassword(response.data.confPassword);
        setRole(response.data.role);
        setStatus(response.data.status);

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

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        name: name,
        surname: surname,
        street: street,
        houseNumber: houseNumber,
        city: city,
        postCode: postCode,
        sex: sex,
        phoneNumber: phoneNumber,
        email: email,
        role: role,
        status: status,
        password: password,
        confPassword: confPassword,
      });
      navigate("/users");
    } catch (error) {
      if (error.response) {
        setMsg(error.response.data.msg);
      }
    }
  };

  return (
    <div className="main-container">
      <div className="model-form-add">
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
            
            {role === 'Uzytkownik' ? ' Użytkownik' : role === 'Admin' ? ' Admin' : ''}
          </div>
        </div>
        <div className="model-form-container">
          <form onSubmit={updateUser}>
          <div className="form-column-one">
          <label className="form-text-one">Imie*</label>
           
              
           <input id="form-text-one"
             type="text"
             className="model-form-input-text"
             value={name}
             onChange={(e) => setName(e.target.value)}
             placeholder="Imie" required
           />
        
      
       
         <label className="form-text-one">Nazwisko*</label>
        
           <input id="form-text-one"
             type="text"
             className="model-form-input-text"
             value={surname}
             onChange={(e) => setSurname(e.target.value)}
             placeholder="Nazwisko" required
           />
        
     
       
         <label className="form-text-one">Hasło*</label>
         
           <input id="form-text-one"
             type="password"
             className="model-form-input-text"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             placeholder="*****" required
           />
       
      
 
         <label className="form-text-one">Powtórz hasło*</label>
         
           <input id="form-text-one"
             type="password"
             className="model-form-input-text"
             value={confPassword}
             onChange={(e) => setConfPassword(e.target.value)}
             placeholder="Powtórz hasło" required
           />
         
     
  
         <label className="form-text-one">Płeć*</label>
         
           
           <select id="form-text-one"
             className="model-form-input-text"
             value={sex}
             onChange={(e) => setSex(e.target.value)}
             placeholder="Płeć" required
           >
             <option value="Kobieta">Kobieta</option>
             <option value="Mężczyzna">Mężczyzna</option>
           </select>
        
     
       
         <label className="form-text-one">Numer domu</label>
       
           <input id="form-text-one"
             type="text"
             className="model-form-input-text"
             value={houseNumber}
             onChange={(e) => setHouseNumber(e.target.value)}
             placeholder="Numer domu/mieszkania"
           />
        
       
     
         <label className="form-text-one">Ulica</label>
       
           <input id="form-text-one"
             type="text"
             className="model-form-input-text"
             value={street}
             onChange={(e) => setStreet(e.target.value)}
             placeholder="Ulica"
           />

          </div>
          <div className="form-column-two">
          <label className="form-text-one">Miasto</label>
      
      <input id="form-text-one"
        type="text"
        className="model-form-input-text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Miasto"
      />
  

  
    <label className="form-text-one">Kod pocztowy</label>
  
      <input id="form-text-one"
        type="text"
        className="model-form-input-text"
        value={postCode}
        onChange={(e) => setPostCode(e.target.value)}
        placeholder="Kod pocztowy"
      />
  

  
    <label className="form-text-one">Email*</label>

      <input id="form-text-one"
        type="email"
        className="model-form-input-text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email" required
      />


    <label className="form-text-one">Numer telefonu*</label>
 
      <input id="form-text-one"
        type="text"
        className="model-form-input-text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="+48 123 456 789" required
      />
 

    <label className="form-text-one">Poziom użytkownika w aplikacji</label>
   
      <select id="form-text-one"
        className="model-form-input-text"
        value={role} 
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="Uzytkownik">Użytkownik</option>
        <option value="Admin">Admin</option>
        
      </select>
    
  
    <label className="form-text-one">Status</label>
    
            <select
              id="form-text-one"
              className="model-form-input-text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              placeholder="Name"
            >
              <option value="Aktywny">Aktywny</option>
              <option value="Nieaktywny">Nieaktywny</option>
            </select>

            <label className="form-text-one">.</label>
            <button type="submit" className="model-from-input-submit">Zaktualizuj użytkownika</button>

          </div>
       
       
     
         
    </form>
        </div>
        
      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      W tym miejscu masz możliwość modyfikowania informacji dotyczących pracowników, takich jak hasła logowania oraz dane osobowe. <br />Dzięki prostemu interfejsowi możesz łatwo zarządzać i aktualizować dane pracowników, zapewniając tym samym bezpieczeństwo i skuteczność działania systemu. <br /> Wprowadź zmiany, aby dostosować informacje do bieżących potrzeb firmy i utrzymać pełną kontrolę nad dostępem do zasobów.
      </Tooltip>
    </div>
  );
};

export default FormEditUser;
