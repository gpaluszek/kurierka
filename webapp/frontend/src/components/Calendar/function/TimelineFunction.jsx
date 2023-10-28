
import axios from "axios"; // Dodaj ten import
import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/pl";
import "../../../common/style/CustomTimeLine.scss";

const CustomTimeline = () => {
  const [employees, setEmployees] = useState([]);



    return (
      <div className="custom-timeline">
        <table>
          <thead>
            <tr>
              <th>Imię i Nazwisko</th>
              <th>Stanowisko</th>
              <th>Ilość 1</th>
              <th>Ilość 2</th>
              <th>Ilość 3</th>
              <th>Ilość 4</th>
              <th>Ilość 5</th>
              <th>Ilość 6</th>
              <th>Ilość 7</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.position}</td>
                <td>{employee.amount1}</td>
                <td>{employee.amount2}</td>
                <td>{employee.amount3}</td>
                <td>{employee.amount4}</td>
                <td>{employee.amount5}</td>
                <td>{employee.amount6}</td>
                <td>{employee.amount7}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    
  );
};

export default CustomTimeline;
