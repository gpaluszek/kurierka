import React from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

const UploadXLSXFile = () => {
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    // Odczytaj zawartość pliku XLSX
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });

      // Pobierz arkusze z pliku XLSX
      const sheetName = workbook.SheetNames[0]; // Załóżmy, że dane znajdują się na pierwszym arkuszu
      const sheet = workbook.Sheets[sheetName];

      // Konwertuj dane na JSON
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      // Przetwórz dane lub prześlij do serwera
      console.log("Dane z pliku XLSX:", jsonData);
    };

    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx",
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Upuść plik XLSX tutaj lub kliknij, aby wybrać plik.</p>
    </div>
  );
};

export default UploadXLSXFile;
