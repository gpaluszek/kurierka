import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import { ArrowDown, ArrowUp, QestionCircle, DocumentIcon, AddContract } from "../../common/icons/icons";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'
const ContractEmployeeMain = () => {
  const [user, setUser] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Błąd przy pobieraniu danych użytkownika:", error);
    }
  };

  const deleteContractHandler = async (contractId) => {
    try {
      await axios.delete(`http://localhost:5000/employee/${user.id}/contracts/${contractId}`);
      getUser(); // Odśwież dane użytkownika po usunięciu kontraktu
    } catch (error) {
      console.error("Błąd przy usuwaniu kontraktu:", error);
    }
  };

  return (
    <div className="main-container">
      {user ? (
        <div className="table-model-container"> 
         <div className="table-header-panel">
          <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/users">Lista Pracowników</NavLink> &#62; <NavLink className="top-nav-dash-a" to="">Kontrakty</NavLink>
        </div>
        <div className="table-header-panel last ">
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1">Kontrakty Pracownika</h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
          
          <div className="table-header-panel-right">
            <Link className="options-button" to={`/employee/${id}/contracts`}>
            <AddContract className="icon-button-white"/> Dodaj Umowe
            </Link>
          </div>
        </div>
          <div className="table-header-panel">
          Kontrakty pracownika - {user.name} {user.surname}
          </div>
        
          <table className="table-main-content">
            <thead>
              <tr className="table-main-tr">
                <th>Stanowisko</th>
                <th>Start Umowy</th>
                <th>Koniec Umowy</th>
                <th>Rodzaj Umowy</th>
                <th className="table-column-setting flex-left">Opcje</th>
              </tr>
            </thead>
            <tbody>
              {user.profile && user.profile.contracts.length > 0 ? (
                user.profile.contracts.map((contract, index) => (
                  <tr className="table-main-tr" key={index}>
                    <td className="table-main-td">{contract.position}</td>
                    <td className="table-main-td">
                      {new Date(contract.startContract).toLocaleDateString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="table-main-td">
                      {new Date(contract.endContract).toLocaleDateString("pl-PL", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="table-main-td">{contract.typeContract}</td>
                    <td className="table-main-td  table-main-setting">
                      <button className="confirmation-button-style-delete" onClick={() => deleteContractHandler(contract.id)}>Usuń</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="error-table-info" colSpan="5">Brak dostępnych danych, pojawił się błąd lub użytkownik nie ma przypisanych kontraktów.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      Przeglądaj kontrakty zawarte z konkretnym pracownikiem, wyświetlając informacje dotyczące stanowiska,<br /> daty rozpoczęcia i zakończenia kontraktu oraz rodzaju kontraktu.
      </Tooltip>
    </div>
  );
};

export default ContractEmployeeMain;
