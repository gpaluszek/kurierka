import 'jspdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import React, { useState, useEffect, useCallback } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Modal from "react-modal";
import "../../../common/style/CustomTimeLine.scss";

const mapStatusToClassName = (status) => {
  switch (status.toLowerCase()) {
    case 'obecny':
      return 'obecny';
    case 'nieobecny':
      return 'nieobecny';
    case 'oczekuje':
      return 'oczekuje';
    case 'zwolnienie lekarskie':
      return 'l4';
    default:
      return status.toLowerCase();
  }
};

const TasksForDay = React.memo(({ tasks, error }) => {
  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {tasks && tasks.length > 0 ? (
        tasks.map((worklog) => (
          <div key={worklog.id}>
            {worklog.tasks.map((task) => (
              <div key={task.id}>
                <div className={mapStatusToClassName(task.status)}> {task.title || 'Brak tytułu'}</div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div>{tasks ? "Brak zadań na ten dzień" : "Pobieranie danych..."}</div>
      )}
    </div>
  );
});

const CustomTimeline = () => {
  const [selectedAll, setSelectedAll] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(moment().startOf("isoWeek"));
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [tasksForDays, setTasksForDays] = useState({});
  const [weekDays, setWeekDays] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSelectAll = () => {
    setSelectedAll(!selectedAll);
    setSelectedEmployees(selectedAll ? [] : employees.map(employee => employee.id));
  };

  const handleCheckboxChange = (employeeId) => {
    if (selectedEmployees.includes(employeeId)) {
      setSelectedEmployees((prevSelected) =>
        prevSelected.filter((id) => id !== employeeId)
      );
    } else {
      setSelectedEmployees((prevSelected) => [...prevSelected, employeeId]);
    }
  };

  const generateSelectedReports = () => {
    if (selectedEmployees.length === 0) {
      alert("Zaznacz co najmniej jednego pracownika do wygenerowania raportu");
      return;
    }

    // Tutaj możesz użyć selectedEmployees do wygenerowania raportu tylko dla zaznaczonych pracowników
    console.log("Generowanie raportu dla zaznaczonych pracowników:", selectedEmployees);

    // Zamknięcie okna modalnego
    closeModal();
  };

  const changeWeek = (forward) => {
    setCurrentWeek((prevWeek) =>
      forward ? prevWeek.clone().add(1, "weeks") : prevWeek.clone().subtract(1, "weeks")
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date, type) => {
    if (type === "start") {
      setSelectedStartDate(date);
    } else {
      setSelectedEndDate(date);
    }
  };

// ...

// ...

const generateReport = async () => {
  selectedEmployees.forEach(async (employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);

    if (!employee) {
      console.error(`Pracownik o id ${employeeId} nie został znaleziony.`);
      return;
    }

    const pdf = new jsPDF();

    // Nagłówek
// Nagłówek
pdf.setFont("helvetica", "bold").setFontSize(13);
pdf.text('Karta ewidencji pracy', pdf.internal.pageSize.width / 2, 15, { align: 'center' });

// Okres czasu
const periodText = `Okres czasu: ${moment(selectedStartDate).format('YYYY-MM-DD')} - ${moment(selectedEndDate).format('YYYY-MM-DD')}`;
pdf.setFont("helvetica").setFontSize(13);
pdf.text(pdf.internal.pageSize.width / 2, 15 + pdf.getTextDimensions(periodText).h, periodText, { align: 'center' });

// Dodatkowe informacje o pracowniku
const textMarginTop = pdf.autoTable.previous.finalY + 10;
pdf.setFont("helvetica").setFontSize(10);
pdf.text(14, textMarginTop, `Pracownik: ${employee.name} ${employee.surname}`);
pdf.text(14, textMarginTop + 10, `Stanowisko: ${employee.position}`);


    // Tabela
    const tasksTable = [];

    // Add headers (1 to 30)
    const headers = ['Zadania', ...Array.from({ length: 30 }, (_, i) => (i + 1).toString())];
    tasksTable.push(headers);

    // Pobierz zadania wykonane przez pracownika w wybranym okresie
    const startDate = moment(selectedStartDate);
    const endDate = moment(selectedEndDate);

    for (const day of weekDays) {
      const formattedDate = day.format('YYYY-MM-DD');
      const tasksForDay = tasksForDays[employeeId] ? tasksForDays[employeeId][formattedDate] : null;

      if (tasksForDay) {
        const tasksForReport = tasksForDay.tasks.filter(
          (task) => moment(task.date).isBetween(startDate, endDate, null, '[]') && task.status === 'done'
        );

        // Add task rows
        tasksForReport.forEach((task) => {
          const taskRow = [task.title, ...Array.from({ length: 30 }, (_, i) => '')];
          tasksTable.push(taskRow);
        });
      }
    }

    pdf.autoTable({
      startY: 60,
      head: [headers],
      body: tasksTable,
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    // Zapisanie PDF dla danego pracownika
    pdf.save(`raport_${employee.surname}_${moment().format('YYYYMMDD_HHmmss')}.pdf`);
  });

  // Zamknięcie okna modalnego
  closeModal();
};


// ...


// ...

  
  
  
  

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

  useEffect(() => {
    const weekDaysArray = [];
    for (let i = 0; i < 7; i++) {
      const day = currentWeek.clone().startOf("isoWeek").add(i, "days");
      weekDaysArray.push(day);
    }
    setWeekDays(weekDaysArray);
  }, [currentWeek]);

  const renderTableHeader = () => (
    <tr>
      <th key="selectAll">
        <input type="checkbox" onChange={handleSelectAll} checked={selectedAll} />
      </th>
      <th key="name">Imię i Nazwisko</th>
      <th key="position">Stanowisko</th>
      {weekDays.map((day, index) => (
        <th key={`header-${index}`}>{day.format("YYYY-MM-DD")}</th>
      ))}
    </tr>
  );

  const renderTableCells = () =>
    employees.map((employee, rowIndex) => (
      <tr key={employee.id}>
        <td key={`checkbox-${employee.id}`}>
          <input
            type="checkbox"
            checked={selectedEmployees.includes(employee.id)}
            onChange={() => handleCheckboxChange(employee.id)}
          />
        </td>
        <td key={`name-${employee.id}`}>{employee.name} {employee.surname}</td>
        <td key={`position-${employee.id}`}>{employee.position}</td>
        {weekDays.map((day, colIndex) => {
          const formattedDate = day.format("YYYY-MM-DD");
          const cellKey = `${employee.id}-${formattedDate}`;
          const tasks = tasksForDays[employee.id] ? tasksForDays[employee.id][formattedDate] : null;

          return (
            <td key={cellKey}>
              <TasksForDay tasks={tasks} />
            </td>
          );
        })}
      </tr>
    ));

  const fetchTasksForDay = useCallback(async (profileId, date) => {
    try {
      console.log(`Pobieranie zadań dla profileId: ${profileId}, data: ${date}`);
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const apiUrl = `http://localhost:5000/tasks/${profileId}?date=${formattedDate}`;
      const response = await axios.get(apiUrl);
      const tasksForDay = response.data;

      setTasksForDays((prevTasks) => ({
        ...prevTasks,
        [profileId]: {
          ...prevTasks[profileId],
          [formattedDate]: tasksForDay,
        },
      }));
    } catch (error) {
      console.error("Błąd podczas pobierania zadań:", error);
    }
  }, [setTasksForDays]);

  useEffect(() => {
    const fetchDataForAllEmployees = async () => {
      for (const employee of employees) {
        for (const day of weekDays) {
          const formattedDate = day.format("YYYY-MM-DD");
          await fetchTasksForDay(employee.id, formattedDate);
        }
      }
    };

    fetchDataForAllEmployees();
  }, [employees, weekDays, fetchTasksForDay]);

  return (
    <div className="custom-timeline">
      <div className="timeline-options">
        <NavLink className="timeline-setting-button" to="/timeline/addevent">
          Dodaj Aktywność
        </NavLink>
      </div>
      <div className="week-navigation">
        <button className="timeline-button-function" onClick={() => changeWeek(false)}>
          Poprzedni tydzień
        </button>
        <DatePicker
          className="data-center-picker"
          selected={selectedStartDate}
          onChange={(date) => handleDateChange(date, "start")}
          dateFormat="yyyy-MM-dd"
          locale="pl"
          placeholderText={moment().format("YYYY-MM-DD")}
          todayButton="Dzisiaj"
        />
        <button className="timeline-button-function" onClick={() => changeWeek(true)}>
          Następny tydzień
        </button>
        <button className="timeline-button-function" onClick={openModal}>
          Generuj Raport
        </button>
        <button className="timeline-button-function" onClick={generateSelectedReports}>
          Generuj Raport dla Zaznaczonych
        </button>
      </div>
      <table className="table-timeline">
        <thead className="table-timeline-thead">{renderTableHeader()}</thead>
        <tbody className="table-timeline-tbody">{renderTableCells()}</tbody>
      </table>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Wybierz zakres dat"
      >
        <h2>Wybierz zakres dat</h2>
        <DatePicker
          className="data-center-picker"
          selected={selectedStartDate}
          onChange={(date) => handleDateChange(date, "start")}
          dateFormat="yyyy-MM-dd"
          locale="pl"
          placeholderText="Data początkowa"
          todayButton="Dzisiaj"
        />
        <DatePicker
          className="data-center-picker"
          selected={selectedEndDate}
          onChange={(date) => handleDateChange(date, "end")}
          dateFormat="yyyy-MM-dd"
          locale="pl"
          placeholderText="Data końcowa"
          todayButton="Dzisiaj"
        />
        <button onClick={generateReport}>Generuj Raport</button>
        <button onClick={closeModal}>Anuluj</button>
      </Modal>
    </div>
  );
};

export default CustomTimeline;
