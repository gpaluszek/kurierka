import jsPDF from 'jspdf';
import React from "react";
// PdfRaport.jsx
import moment from "moment";

const generateReport = (selectedStartDate, selectedEndDate, weekDays, employees, tasksForDays, closeModal) => {
  if (!selectedStartDate || !selectedEndDate || !weekDays) {
    alert("Wybierz datę początkową i końcową");
    return;
  }

  const startDate = moment(selectedStartDate).startOf("isoWeek").format("YYYY-MM-DD");
  const endDate = moment(selectedEndDate).endOf("isoWeek").format("YYYY-MM-DD");

  console.log(`Generowanie raportu od ${startDate} do ${endDate}`);

  // Tworzenie PDF z raportem
  const pdf = new jsPDF();
  pdf.autoTable({
    head: [["Imię i Nazwisko", "Stanowisko", ...weekDays.map(day => day.format("YYYY-MM-DD"))]],
    body: employees.map(employee => {
      const rowData = [`${employee.name} ${employee.surname}`, employee.position];
      weekDays.forEach(day => {
        const formattedDate = day.format("YYYY-MM-DD");
        const tasks = tasksForDays[employee.id] ? tasksForDays[employee.id][formattedDate] : null;
        const taskSummary = tasks && tasks.length > 0 ? tasks.map(task => task.title).join("\n") : "Brak zadań";
        rowData.push(taskSummary);
      });
      return rowData;
    }),
  });

  // Zapisanie PDF lub inne operacje na nim
  pdf.save("raport.pdf");

  // Zamknięcie okna modalnego
  closeModal();
};

export default generateReport;
