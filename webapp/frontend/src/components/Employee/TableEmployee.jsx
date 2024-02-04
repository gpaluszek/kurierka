import React, { useState, useEffect } from "react";
import axios from "axios";
import { ArrowDown, ArrowUp, QestionCircle, AddUser, SearchIcon } from "../../common/icons/icons";
import { Link, NavLink } from "react-router-dom";
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

const TableEmployee = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'inactive'
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5000/users");
    setUsers(response.data);
    applyFilters(response.data);
  };

  const applyFilters = (data) => {
    let filteredData = data;

    // Filtruj po statusie
    if (filterStatus === 'active') {
      filteredData = filteredData.filter(user => user.status === true);
    } else if (filterStatus === 'inactive') {
      filteredData = filteredData.filter(user => user.status === false);
    }

    // Filtruj po wyszukiwaniu
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.filter(user =>
        user.name.toLowerCase().includes(query) || user.surname.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(filteredData);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    applyFilters(users);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setFilterStatus('all'); 
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      applyFilters(users);
    }, 150);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, users, filterStatus]);

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
    <div className="main-container">
      <div className="table-model-container">
        <div className="table-header-panel">
          <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/users">Lista Pracowników</NavLink>
        </div>
        <div className="table-header-panel last ">
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1">Lista Pracowników</h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
          
          <div className="table-header-panel-right">
            <NavLink className="options-button" to="/adduser">
              <AddUser className="icon-button-white"/> Dodaj użytkownika
            </NavLink>
          </div>
        </div>
        <div className="table-header-panel">
          <select className="table-select-filter" onChange={(e) => handleFilterChange(e.target.value)} value={filterStatus}>
            <option className="table-select-option" value="all">Wszyscy</option>
            <option className="table-select-option" value="active">Aktywni</option>
            <option className="table-select-option" value="inactive">Nieaktywni</option>
          </select>
          <div className="table-search-bar">
            <SearchIcon className="table-search-icon" />
            <input className="table-search-input"
              type="text"
              placeholder="Wyszukaj pracownika..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            
          </div>
          <button className="table-filter-reset-button" onClick={handleResetSearch}>
              Reset
            </button>
        </div>
       
        <table className="table-main-content">
          <thead>
            <tr className="table-main-tr">
              <th className="th-td-one">#</th>
              <th>Imie Nazwisko</th>
              <th>Status</th>
              <th>Numer Telefonu</th>
              <th>Email</th>
              <th className="table-column-setting flex-left"></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <React.Fragment key={user.id}>
                <tr
                  key={user.uuid}
                  className="table-main-tr"
                  onClick={() => handleRowClick(index)}
                >
                  <td className="table-main-td th-td-one" >
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
                    {user.status === true ? <div className="user-status-active">Aktywny</div> : <div className="user-status-inactive">Nieaktywny</div>}
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
                          className="confirmation-button-style-submit style-button"
                        >
                          Edit
                        </Link>
                        <Link
                          to={`/users/${user.id}`}
                          className="confirmation-button-style-submit style-button"
                        >
                          Kontrakty
                        </Link>
                        <button
                          onClick={() => updateUserStatus(user.id)}
                          className="confirmation-button-style-delete style-button"
                        >
                          Wyłącz konto
                        </button>
                      </div>
                      {showConfirmation && (
                        <div className="confirm-important">
                          <div className="confirmation-content">
                            <h1 className="confirmation-content-h1">Potwierdz działanie</h1>
                            <p className="confirmation-p">Czy na pewno chcesz zmienić status użytkownika? <br />
                              Po wykonaniu tej akcji, użytkowni utraci dostęp do platformy.</p>
                            
                              <div className="confirm-important-button-options">
                              <button
                                className="confirmation-button-style-cancel style-button"
                                onClick={handleCancelStatus}
                              >
                                Anuluj
                              </button>
                              <button
                                className="confirm-important-button style-button"
                                onClick={() => handleConfirmStatus(true)}
                              >
                                Status Aktywny
                              </button>
                              <button
                                className="confirm-important-button style-button"
                                onClick={() => handleConfirmStatus(false)}
                              >
                                Status Nieaktywny
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
      <Tooltip anchorSelect="#not-clickable" place="bottom">
        Nasza "Tabela Pracowników" umożliwia łatwe zarządzanie zespołem.<br /> Możesz dodawać nowych pracowników, nadawać im uprawnienia i przypisywać kontrakty. <br />To centralne miejsce, w którym śledzisz informacje o każdym członku zespołu.
      </Tooltip>
    </div>
  );
};

export default TableEmployee;
