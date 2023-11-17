import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../../common/style/CustomTimeLine.scss";

const TasksForDay = ({ profileId, date, tasks, fetchTasksForDay }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profileId && date && !tasks.length) {
          const formattedDate = moment(date).format("YYYY-MM-DD");
          await fetchTasksForDay(profileId, formattedDate);
        }
      } catch (error) {
        console.error("Błąd podczas pobierania zadań:", error);
        setError("Wystąpił błąd. Spróbuj ponownie później.");
      }
    };

    fetchData();
  }, [profileId, date, tasks, fetchTasksForDay]);

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {tasks.length > 0 ? (
        tasks.map((worklog) => (
          <div key={worklog.id}>
            {worklog.tasks.map((task) => (
              <div key={task.id}>
                <div>Tytuł: {task.title || 'Brak tytułu'}</div>
                <div>Opis: {task.description || 'Brak opisu'}</div>
                <div>Status: {task.status || 'Brak statusu'}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>Brak zadań na ten dzień</div>
      )}
    </div>
  );
};

const CustomTimeline = () => {
  const [employees, setEmployees] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek"));
  const [tasksForDays, setTasksForDays] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:5000/active-users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pracowników:", error);
      });
  }, []);

  const changeWeek = (forward) => {
    if (forward) {
      setCurrentWeek(currentWeek.clone().add(1, "weeks"));
    } else {
      setCurrentWeek(currentWeek.clone().subtract(1, "weeks"));
    }
  };

  const fetchTasksForDay = async (profileId, date) => {
    try {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const apiUrl = `http://localhost:5000/tasks/${profileId}?date=${formattedDate}`;
      const response = await axios.get(apiUrl);
      const tasksForDay = response.data;
      setTasksForDays((prevTasks) => ({
        ...prevTasks,
        [formattedDate]: tasksForDay,
      }));
    } catch (error) {
      console.error("Błąd podczas pobierania zadań:", error);
    }
  };

  const renderTableHeader = () => {
    const weekDays = [];

    for (let i = 0; i < 7; i++) {
      const day = currentWeek.clone().startOf("isoWeek").add(i, "days");
      weekDays.push(day);
    }

    return weekDays.map((day, index) => (
      <th key={index}>{day.format("YYYY-MM-DD")}</th>
    ));
  };

  const renderTableCells = () => {
    return employees.map((employee) => (
      <tr key={employee.id}>
        <td>{employee.name} {employee.surname}</td>
        <td>{employee.position}</td>
        {renderTableHeader().map((day, index) => {
          const formattedDate = moment(day).format("YYYY-MM-DD");
          return (
            <td key={index}>
              <TasksForDay
                tasks={tasksForDays[formattedDate] || []}
                profileId={employee.id}
                date={formattedDate}
                fetchTasksForDay={fetchTasksForDay}
              />
            </td>
          );
        })}
      </tr>
    ));
  };

  return (
    <div className="custom-timeline">
      <div className="timeline-options">
        <NavLink to="/timeline/addevent">DODAJ ZADANIE</NavLink>
      </div>
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
        <tbody>{renderTableCells()}</tbody>
      </table>
    </div>
  );
};

export default CustomTimeline;
