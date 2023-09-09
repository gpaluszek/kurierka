import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp, UsersIcon } from "../../common/icons/icons";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const TableEmployee = () => {
  const [users, setUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
  };

  const updateUserStatus = async (id) => {
    setSelectedUserId(id);
    setShowConfirmation(true);
  };

  const handleConfirmStatus = async (status) => {
    try {
      await axios.patch(`http://localhost:5000/users/status/${selectedUserId}`, { status: status });
      setShowConfirmation(false);
      setSelectedUserId(null);
      getUsers(); // Aktualizacja listy użytkowników po zmianie statusu
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelStatus = () => {
    setShowConfirmation(false);
    setSelectedUserId(null);
  };

  const handleRowClick = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((row) => row !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div>
      <div className="table-model-container">
        <div className="table-header-panel">
        <UsersIcon className="table-header-panel-icon" />Tabela Pracowników: Zarządzaj Efektywnie Zespołem
        </div>
        <div className="table-header-panel">
        <p className="model-form-head-info " > Nasza "Tabela Pracowników" umożliwia łatwe zarządzanie zespołem. Możesz dodawać nowych pracowników, nadawać im uprawnienia i przypisywać kontrakty. To centralne miejsce, w którym śledzisz informacje o każdym członku zespołu </p>
        </div>
        <div className="table-header-panel">
          <NavLink className="options-button" to="/adduser">
            Dodaj użytkownika
          </NavLink>
        </div>
        <table className="table-main-content">
          <thead>
            <tr className="table-main-tr">
              <th>AV</th>
              
              <th>Imie Nazwisko</th>
              <th>Status</th>
              <th>Numer Telefonu</th>
              <th>Email</th>
              <th className="table-column-setting flex-left"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <React.Fragment key={user.id}>
                <tr
                  key={user.uuid}
                  className="table-main-tr"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="table-main-td">
                    {/* {user.id} */}
                    {user.sex === "Kobieta" ? (
                      <div className="circle-avatar-women">
                        {user &&
                          `${user.name.charAt(0).toUpperCase()}${user.surname
                            .charAt(0)
                            .toUpperCase()}`}
                      </div>
                    ) : (
                      <div className="circle-avatar-man">
                        {user &&
                          `${user.name.charAt(0).toUpperCase()}${user.surname
                            .charAt(0)
                            .toUpperCase()}`}
                      </div>
                    )}</td>
                  <td className="employee-profile table-main-td">
                    
                    {user && `${user.name} ${user.surname}`}
                  </td>
                  <td className="table-main-td">
                    {user.status === true ? "Aktywny" : "Nieaktywny"}
                  </td>
                  <td className="table-main-td">
                    {user && `${user.phoneNumber} `}
                  </td>
                  <td className="table-main-td">{user.email}</td>
                  <td className="table-main-td table-main-setting">
                    <button className="button-table">
                      {selectedRows.includes(index) ? (
                        <ArrowUp className="employee-icon" />
                      ) : (
                        <ArrowDown className="employee-icon" />
                      )}
                    </button>
                  </td>
                </tr>
                {selectedRows.includes(index) && (
                  <tr>
                    <td colSpan="6">
                      <div className="expanded-content">
                        <Link
                          to={`/users/edit/${user.id}`}
                          className="confirmation-button-style-submit"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/users/${user.id}`}
                          className="confirmation-button-style-submit"
                        >
                          Kontrakty
                        </Link>
                        <button
                          onClick={() => updateUserStatus(user.id)}
                          className="confirmation-button-style-delete"
                        >
                          Wyłącz konto
                        </button>
                      </div>
                      {showConfirmation && (
                        <div className="confirm-important">
                          <div className="confirmation-content">
                            <h3>Potwierdź</h3>
                           <p>Czy na pewno chcesz zmienić status użytkownika? <br />
                           Wybierz status</p>
                            
                            <div className="confirm-important-button-flex">
                              <button
                                className="confirm-important-button"
                                onClick={() => handleConfirmStatus(true)}
                              >
                                Aktywny
                              </button>
                              <button
                                className="confirmation-button-style-cancel"
                                onClick={() => handleConfirmStatus(false)}
                              >
                                Nieaktywny
                              </button>
                              <button
                                className="confirmation-button-style-cancel"
                                onClick={handleCancelStatus}
                              >
                                Anuluj
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableEmployee;
