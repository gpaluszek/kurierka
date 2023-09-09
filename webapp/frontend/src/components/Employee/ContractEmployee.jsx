import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, NavLink, useParams } from "react-router-dom";
import { ArrowDown, ArrowUp, DocumentIcon } from "../../common/icons/icons";

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
    <div>
      {user ? (
        <div className="table-model-container"> 
          <div className="table-header-panel">
            <DocumentIcon className="table-header-panel-icon" />Kontrakty pracownika - {user.name} {user.surname}
          </div>
          
          <div className="table-header-panel">
            <p className="model-form-head-info">Przeglądaj kontrakty zawarte przez konkretnego pracownika. Wyświetlaj informacje na temat stanowiska, daty rozpoczęcia i zakończenia kontraktu oraz rodzaju kontraktu.
          </p>
          </div>
          
          <div className="table-header-panel">
            <Link className="options-button" to={`/employee/${id}/contracts`}>
              Dodaj Umowe
            </Link>
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
                  <td colSpan="5">Brak danych</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ContractEmployeeMain;
