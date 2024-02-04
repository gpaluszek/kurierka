// RenderTableHeader.jsx
import React from "react";
import TasksForDay from "./TasksForDay";  // Import komponentu TasksForDay

export const renderTableHeader = (weekDays) => (
  <tr>
    <th key="checkbox">Wybierz</th>
    <th key="name">Imię i Nazwisko</th>
    <th key="position">Stanowisko</th>
    {weekDays.map((day, index) => (
      <th key={`header-${index}`}>{day.format("YYYY-MM-DD")}</th>
    ))}
  </tr>
);

export const renderTableCells = (employees, selectedEmployees, handleCheckboxChange, weekDays, tasksForDays) =>
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
