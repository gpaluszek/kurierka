import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/pl";
import axios from "axios";
import "../../../common/style/CustomTimeLine.scss";

const CustomTimeline = () => {
  const [employees, setEmployees] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf('isoWeek'));

  useEffect(() => {
    // Pobierz listę pracowników z aktywnym kontraktem z serwera
    axios.get('http://localhost:5000/active-users')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania pracowników:', error);
      });
  }, []);

  // Funkcja do przesuwania się w przód i w tył w tygodniach
  const changeWeek = (forward) => {
    if (forward) {
      setCurrentWeek(currentWeek.clone().add(1, 'weeks'));
    } else {
      setCurrentWeek(currentWeek.clone().subtract(1, 'weeks'));
    }
  };

  const renderTableHeader = () => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = currentWeek.clone().startOf('isoWeek').add(i, 'days');
      weekDays.push(day);
    }

    return weekDays.map((day, index) => (
      <th key={index}>{day.format('YYYY-MM-DD')}</th>
    ));
  };

  const renderTableCells = () => {
    return employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.name} {employee.surname}</td>
        <td>{employee.position}</td>
      </tr>
    ));
  };

  return (
    <div className="custom-timeline">
      <div className="week-navigation">
        <button onClick={() => changeWeek(false)}>Poprzedni tydzień</button>
        <button onClick={() => changeWeek(true)}>Następny tydzień</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Imię i Nazwisko</th>
            <th>Stanowisko</th>
            {renderTableHeader()}
          </tr>
        </thead>
        <tbody>
          {renderTableCells()}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTimeline;
