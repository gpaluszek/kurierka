import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';

const generatePDF = (employees, selectedEmployees, tasksForDays, weekDays, selectedStartDate, selectedEndDate) => {
  // Pętla po każdym pracowniku
  selectedEmployees.forEach((employeeId) => {
    const employee = employees.find((emp) => emp.id === employeeId);

    if (!employee) {
      console.error(`Pracownik o id ${employeeId} nie został znaleziony.`);
      return;
    }

    const pdf = new jsPDF();

    // Nagłówek
    pdf.text('Karta ewidencji pracy', pdf.internal.pageSize.width / 2, 15, { align: 'center' });
    pdf.text(`Okres czasu: ${moment(selectedStartDate).format('YYYY-MM-DD')} - ${moment(selectedEndDate).format('YYYY-MM-DD')}`, pdf.internal.pageSize.width / 2, 25, { align: 'center' });

    // Dodatkowe informacje o pracowniku
   // Dodatkowe informacje o pracowniku
const textMarginTop = pdf.autoTable.previous.finalY + 10;
pdf.text(`Pracownik: ${employee.name} ${employee.surname}`, 14, textMarginTop);
pdf.text(`Stanowisko: ${employee.position}`, 14, textMarginTop + 10);

    // Tabela
    pdf.autoTable({
      startY: 60,
      head: [['Zadania', ...weekDays.map(day => day.format('YYYY-MM-DD'))]],
      body: tasksForDays[employeeId] ? tasksForDays[employeeId].map(task => [task.title, ...task.statuses]) : [],
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    // Zapisanie PDF dla danego pracownika
    pdf.save(`raport_${employee.surname}_${moment().format('YYYYMMDD_HHmmss')}.pdf`);
  });

  // Zamknięcie okna modalnego

};

export default generatePDF;
