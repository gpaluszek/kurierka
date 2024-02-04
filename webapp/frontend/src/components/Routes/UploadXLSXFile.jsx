import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import { Tooltip } from 'react-tooltip';
import { QestionCircle } from "../../common/icons/icons";


const EditableTable = ({ data, onDataChange }) => {
  const handleCellChange = (e, rowIndex, colIndex) => {
    const newData = [...data];
    newData[rowIndex][colIndex] = e.target.textContent;
    onDataChange(newData);
  };

  return (
    <table border="1" className="table-table-main">
      <thead className="table-table-thead">
        <tr>
          {data[0].map((cell, index) => (
            <th key={index}>{cell}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.slice(1).map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={colIndex}
                contentEditable
                onBlur={(e) => handleCellChange(e, rowIndex + 1, colIndex)}
                suppressContentEditableWarning
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const UploadXLSXFile = () => {
  const [excelData, setExcelData] = useState([]);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      const sheetNames = workbook.SheetNames;
      const jsonData = sheetNames.map((sheetName) =>
        XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 })
      );

      setExcelData(jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx",
  });

  const switchSheet = (index) => {
    setActiveSheetIndex(index);
  };

  const addDataToDatabase = async () => {
    try {
      const response = await fetch("http://localhost:5000/addDataToDatabaseXLSX", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ excelData: excelData[activeSheetIndex] }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error("Wystąpił problem podczas dodawania danych do bazy danych.");
      }
    } catch (error) {
      console.error("Wystąpił błąd sieci:", error);
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
        </div>

      <div className="xlsx-model" {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Upuść plik XLSX tutaj lub kliknij, aby wybrać plik.</p>
      </div>
      {excelData.length > 0 && (
        <div className="xlsx-table">
          <div className="xlsx-table-tables">
            {excelData.map((sheet, index) => (
              <button className="xlsx-table-tables-buttons" key={index} onClick={() => switchSheet(index)}>
                Arkusz {index + 1}
              </button>
            ))}
          </div>
          <EditableTable
            data={excelData[activeSheetIndex]}
            onDataChange={(newData) => {
              const updatedData = [...excelData];
              updatedData[activeSheetIndex] = newData;
              setExcelData(updatedData);
            }}
          />
          <button className="xlsx-button" onClick={addDataToDatabase}>Dodaj do bazy danych</button>
        </div>
      )}
      </div>
      <Tooltip anchorSelect="#not-clickable" place="bottom">
      Nasza "Tabela Pracowników" umożliwia łatwe zarządzanie zespołem.<br /> Możesz dodawać nowych pracowników, nadawać im uprawnienia i przypisywać kontrakty. <br />To centralne miejsce, w którym śledzisz informacje o każdym członku zespołu.
      </Tooltip>
    </div>
  );
};

export default UploadXLSXFile;
