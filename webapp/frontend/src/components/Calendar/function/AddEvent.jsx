import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import "../../../common/style/CustomTimeLine.scss";

const FormAddEvent = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [formData, setFormData] = useState({
    date: "",
    title: "",
    description: "",
  });

  useEffect(() => {
    // Pobierz listę pracowników z serwera
    axios
      .get("http://localhost:5000/active-users")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania pracowników:", error);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Pobierz potrzebne dane z formularza
      const { date, title, description } = formData;

      // Pobierz ID pracownika
      const profileId = +selectedEmployee;

      // Wywołaj kontroler do dodania taska
      const response = await axios.post("http://localhost:5000/add-taskid", {
        profileId,
        date,
        tasks: [   {
            title: "Tytuł zadania",
            description: "Opis zadania",
            status: "SomeStatus",
          },
        ],
      });

      console.log("Dodano task:", response.data);

      // Wyczyszczenie formularza po dodaniu taska
      setFormData({
        date: "",
        title: "",
        description: "",
      });

      // Możesz dodać dodatkową logikę po dodaniu taska, np. odświeżenie widoku
      // ...

    } catch (error) {
      console.error("Błąd podczas dodawania taska:", error);
    }
  };

  return (
    <div className="custom-timeline">
      <form onSubmit={handleSubmit}>
        <select
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
        <input
          type="date"
          placeholder="Data"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Tytuł"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          placeholder="Opis"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        <input type="submit" value="Dodaj zadanie" />
      </form>
    </div>
  );
};

export default FormAddEvent;
