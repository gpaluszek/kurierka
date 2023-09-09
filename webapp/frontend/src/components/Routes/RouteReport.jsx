import React from 'react';
import { Page, Text, Document, PDFViewer } from '@react-pdf/renderer';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
const handleGenerateReport = (selectedRoute) => {
    const docDefinition = {
      content: [
        { text: "Raport trasy", style: "header" },
        { text: "Wygenerowano: " + new Date().toLocaleDateString() },
        { text: `Trasa: ${selectedRoute.name}`, style: "routeTitle" },
        { text: `Opis: ${selectedRoute.description}` },
        { text: `Ilość punktów: ${selectedRoute.pointsCount}` },
        { text: `Kategoria: ${selectedRoute.category || "Brak kategorii"}` },
        { text: "Punkty trasy:", style: "subheader" },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        routeTitle: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };
  
    selectedRoute.checkpoints.forEach((checkpoint, checkpointIndex) => {
      docDefinition.content.push(
        { text: `Punkt ${checkpointIndex + 1}: ${checkpoint.checkpointName}` }
      );
    });
  
    pdfMake.createPdf(docDefinition).download("raport_trasy.pdf");
  };

export default handleGenerateReport;
