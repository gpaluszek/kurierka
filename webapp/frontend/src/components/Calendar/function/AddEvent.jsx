import React, { useState, useEffect } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import { Tooltip } from 'react-tooltip';
import { NavLink } from "react-router-dom";
import { QestionCircle } from "../../../common/icons/icons.jsx";

// Zarejestruj tłumaczenie dla języka polskiego
registerLocale("pl", pl);

const FormAddEvent = () => {
  const TASK_STATUSES = ["Obecny", "Nieobecny", "Oczekuje", "Zwolnienie Lekarskie"];
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [tasks, setTasks] = useState([
    {
      startDate: "",
      endDate: "",
      title: "",
      customTitle: "", // Dodaj customTitle do stanu
      description: "",
      status: "",
    },
  ]);
  const [routes, setRoutes] = useState([]);
  const [errors, setErrors] = useState({
    employee: "",
    tasks: [{ startDate: "", endDate: "", title: "", customTitle: "", status: "" }],
  });
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/active-users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pracowników:", error);
      });

    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/trails");
      const routesData = response.data.map((route) => ({
        id: route.id,
        name: route.name,
      }));
      setRoutes(routesData);
    } catch (error) {
      console.error("Błąd podczas pobierania tras:", error);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
  
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      [name]: value,
    };
  
    setErrors({
      ...errors,
      tasks: errors.tasks.map((taskError, i) =>
        i === index ? { ...taskError, [name]: "" } : taskError
      ),
    });

    if (name === "title" && value === "Inny") {
      newTasks[index] = {
        ...newTasks[index],
        description: "",
        status: "",
        // Nie zeruj customTitle
      };
    }

    setTasks(newTasks);
  };

  const handleStartDateChange = (date, index) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      startDate: date,
    };
    setTasks(newTasks);

    setErrors({
      ...errors,
      tasks: errors.tasks.map((taskError, i) =>
        i === index ? { ...taskError, startDate: "" } : taskError
      ),
    });
  };

  const handleEndDateChange = (date, index) => {
    const newTasks = [...tasks];
    newTasks[index] = {
      ...newTasks[index],
      endDate: date,
    };
    setTasks(newTasks);

    setErrors({
      ...errors,
      tasks: errors.tasks.map((taskError, i) =>
        i === index ? { ...taskError, endDate: "" } : taskError
      ),
    });
  };

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      { startDate: "", endDate: "", title: "", customTitle: "", description: "", status: "" },
    ]);

    setErrors({
      ...errors,
      tasks: [...errors.tasks, { startDate: "", endDate: "", title: "", customTitle: "", status: "" }],
    });
  };

  const handleRemoveTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    setErrors({
      ...errors,
      tasks: errors.tasks.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const profileId = +selectedEmployee;
  
      const isValid = tasks.every((task, index) => {
        const { startDate, endDate, title, status, customTitle } = task;
        const taskErrors = { startDate: "", endDate: "", title: "", status: "", customTitle: "" };
  
        if (!startDate) {
          taskErrors.startDate = "Proszę wybrać datę początkową.";
        }
  
        if (!endDate) {
          taskErrors.endDate = "Proszę wybrać datę końcową.";
        }
  
        if (!title.trim() && title !== "Inny") {
          taskErrors.title = "Proszę uzupełnić tytuł.";
        }
  
        if (title === "Inny" && !customTitle.trim()) {
          taskErrors.customTitle = "Proszę uzupełnić inny tytuł.";
        }
  
        if (!status.trim()) {
          taskErrors.status = "Proszę uzupełnić status.";
        }
  
        setErrors({
          ...errors,
          tasks: errors.tasks.map((taskError, i) =>
            i === index ? taskErrors : taskError
          ),
        });
  
        return !Object.values(taskErrors).some(Boolean);
      });
  
      if (!isValid) {
        return;
      }
  
      const requests = tasks.map(async (task) => {
        const { startDate, endDate, title, description, status, customTitle } = task;
        const dates = getDates(startDate, endDate);
  
        const response = await axios.post("http://localhost:5000/add-tasksid", {
          profileId,
          dates,
          tasks: [
            {
              title: title === "Inny" ? customTitle : title,
              description,
              status,
            },
          ],
        });
  
        console.log("Dodano zadania:", response.data);
      });
  
      await Promise.all(requests);
  
      setTasks([
        {
          startDate: "",
          endDate: "",
          title: "",
          customTitle: "",
          description: "",
          status: "",
        },
      ]);
  
      setErrors({
        employee: "",
        tasks: [{ startDate: "", endDate: "", title: "", customTitle: "", status: "" }],
      });
    } catch (error) {
      console.error("Błąd podczas dodawania zadań:", error);
      setErrors({
        ...errors,
        tasks: errors.tasks.map((taskError) => ({
          ...taskError,
          general: "Błąd podczas dodawania zadań. Spróbuj ponownie.",
        })),
      });
    }
  };
  

  const getDates = (startDate, endDate) => {
    const dates = [];
    let currentDate = moment(startDate);
    const endMoment = moment(endDate);
  
    while (currentDate.isSameOrBefore(endMoment, "day")) {
      dates.push(currentDate.format("YYYY-MM-DD"));
      currentDate.add(1, "day");
    }
  
    return dates;
  };

  return (
    <div className="main-container">
      <div className="model-form-add">
        <div className="model-form-head">
          <div className="model-form-head-panel">
            <NavLink className="top-nav-dash-a first" to="/dashboard">Dashboard</NavLink> &#62; <NavLink className="top-nav-dash-a" to="/calendar">Kalendarz</NavLink> &#62; <NavLink className="top-nav-dash-a">Dodaj aktywność</NavLink>
          </div>
          <div className="table-header-panel-left">
            <h1 className="teable-header-h1">Dodaj Aktywność </h1>
            <div className="nothing" id="not-clickable" > <QestionCircle /></div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          {errors.employee && <p style={{ color: "red" }}>{errors.employee}</p>}
          <select
            className="event-select"
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
          >
            <option value="">Wybierz pracownika</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name} {employee.surname}
              </option>
            ))}
          </select>
          {tasks.map((task, index) => (
            <div className="event-event" key={index}>
              <div className="event-date">
                <div className="event-date-column">
                  {errors.tasks[index].startDate && (
                    <p style={{ color: "red" }}>{errors.tasks[index].startDate}</p>
                  )}
                  <label>Data początkowa:</label>
                  <DatePicker
                    className="model-event-input-text"
                    selected={task.startDate}
                    onChange={(date) => handleStartDateChange(date, index)}
                    placeholderText="Wybierz datę początkową"
                    dateFormat="yyyy-MM-dd"
                    locale="pl"
                  />
                  {errors.tasks[index].endDate && (
                    <p style={{ color: "red" }}>{errors.tasks[index].endDate}</p>
                  )}
                </div>
                <div className="event-date-column">
                  <label>Data końcowa:</label>
                  <DatePicker
                    className="model-event-input-text"
                    selected={task.endDate}
                    onChange={(date) => handleEndDateChange(date, index)}
                    placeholderText="Wybierz datę końcową"
                    dateFormat="yyyy-MM-dd"
                    locale="pl"
                  />
                </div>
              </div>
              {errors.tasks[index].title && (
                <p style={{ color: "red" }}>{errors.tasks[index].title}</p>
              )}
              <label>Tytuł zadania:</label>
              <select
                className="model-event-input-text"
                name="title"
                value={task.title}
                onChange={(e) => handleInputChange(e, index)}
              >
                <option value="">Wybierz tytuł</option>
                {routes.map((route) => (
                  <option key={route.id} value={route.name}>
                    {route.name}
                  </option>
                ))}
                <option value="Inny">
                  Inny
                </option>
              </select>
              {task.title === "Inny" && (
                <>
                  <label>Wpisz inny tytuł:</label>
                  <input
                    className="model-event-input-text"
                    type="text"
                    placeholder="Wpisz inny tytuł"
                    name="customTitle"
                    value={task.customTitle}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                  {errors.tasks[index].customTitle && (
                    <p style={{ color: "red" }}>{errors.tasks[index].customTitle}</p>
                  )}
                </>
              )}
              <label>Opis zadania:</label>
              <input
                className="model-event-input-text"
                type="text"
                placeholder="Opis"
                name="description"
                value={task.description}
                onChange={(e) => handleInputChange(e, index)}
              />
              <label>Status zadania:</label>
              <select
                className="model-event-input-text"
                name="status"
                value={task.status}
                onChange={(e) => handleInputChange(e, index)}
              >
                <option value="">Wybierz status</option>
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              {errors.tasks[index].status && (
                <p style={{ color: "red" }}>{errors.tasks[index].status}</p>
              )}
              <button
                className="event-input-remove"
                type="button"
                onClick={() => handleRemoveTask(index)}
              >
                Usuń to zadanie
              </button>
            </div>
          ))}
          <div className="event-input-zone">
            <button className="event-input" type="button" onClick={handleAddTask}>
              Dodaj kolejne zadanie
            </button>
            <input className="event-input" type="submit" value="Dodaj zadania" />
          </div>
        </form>
      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
        Wypełnij poniższy formularz, aby przypisać zadania dla pracowników na konkretne dni. <br /> Możesz dodawać zadania na pojedyncze dni lub w zakresie dat. <br /> Pamiętaj, aby wybrać pracownika z listy, określić daty oraz podać tytuł, opis i status zadania.
      </Tooltip>
    </div>
  );
};

export default FormAddEvent;
