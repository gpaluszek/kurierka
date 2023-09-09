import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  AvatarWoman,
  AvatarMan,
  SettingTwoIcon,
  AddUserIcon,
} from "../../common/icons/icons.jsx";
import { AddUserIll  } from "../../common/illustrastion/illustration.jsx";

const FormAddEmployee = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [sex, setSex] = useState("Kobieta"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/users", {
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
      {/* <p className="msg-error">{msg}</p> */}
      <div className="model-form-head">
        <AddUserIcon className="table-header-panel-icon" />Dodawanie Użytkowników: Tworzenie Nowych Kont
      </div>
      <div className="model-form-head">
      <p className="model-form-head-info"> Na stronie "Dodawanie Użytkowników" możesz szybko tworzyć nowe konta dla pracowników. Po utworzeniu konta, możesz nadać użytkownikowi uprawnienia pracownika poprzez przypisanie kontraktu. To pozwala na dostęp do specjalnych funkcji i zadań w naszym systemie. </p>
      </div>
        <div className="model-form-container">
        
        <form onSubmit={saveUser}>
         
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
       
          
          <button type="submit" className="model-from-input-submit">Dodaj użytkownika</button>
        </form>
        </div>
        
      </div>
    </div>
  );
};

export default FormAddEmployee;