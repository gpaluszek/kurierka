import { PrismaClient } from '@prisma/client';
import moment from "moment";
const prisma = new PrismaClient();

export const addtask = async (req, res) => {
  try {
    // Zmiana destrukturyzacji z 'date' i 'tasks' na 'title' i 'description'
const { profileId, date, title, description } = req.body;

// ... (pozostała część kodu bez zmian)


    // Sprawdź, czy istnieje profil o danym ID
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    if (!existingProfile) {
      return res.status(404).json({ error: 'Profil pracownika nie istnieje.' });
    }

    // Konwersja daty na obiekt JavaScript
    const workDate = new Date(date);

    // Sprawdzenie, czy istnieje już taki dzień pracy
    const existingWorkDay = await prisma.workLog.findFirst({
      where: {
        profileId: profileId,
        date: workDate,
      },
    });

    if (existingWorkDay) {
      // Dzień pracy istnieje, więc dodaj nowe zadania
      const updatedWorkDay = await prisma.workLog.update({
        where: { id: existingWorkDay.id },
        data: {
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              description: task.description,
              status: task.status,
            })),
          },
        },
        include: {
          tasks: true,
        },
      });

      return res.status(200).json(updatedWorkDay);
    } else {
      // Dzień pracy nie istnieje, więc utwórz nowy
      const newWorkDay = await prisma.workLog.create({
        data: {
          profile: { connect: { id: profileId } },
          date: workDate,
          status: 'Obecny',
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              description: task.description,
              status: task.status,
            })),
          },
        },
        include: {
          tasks: true,
        },
      });

      return res.status(201).json(newWorkDay);
    }
  } catch (error) {
    console.error('Błąd podczas tworzenia dnia pracy:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia dnia pracy.', details: error.message });
  }
};

// Importowanie PrismaClient


















// Kontroler do dodawania zadania
// Kontroler do dodawania zadania
export const addTaskId = async (req, res) => {
  try {
    // Destrukturyzacja danych z zapytania
    const { profileId, date, tasks } = req.body;

    // Sprawdzenie, czy istnieje profil o danym ID
    const existingProfile = await prisma.profile.findUnique({
      where: { id: profileId },
    });

    // Jeśli profil nie istnieje, zwróć błąd
    if (!existingProfile) {
      return res.status(404).json({ error: 'Profil pracownika nie istnieje.' });
    }

    // Konwersja daty na obiekt JavaScript
    const workDate = new Date(date);

    // Sprawdzenie, czy istnieje już taki dzień pracy
    const existingWorkDay = await prisma.workLog.findFirst({
      where: {
        profileId: profileId,
        date: workDate,
      },
    });

    // Jeśli dzień pracy istnieje, dodaj nowe zadanie
    if (existingWorkDay) {
      const updatedWorkDay = await prisma.workLog.update({
        where: { id: existingWorkDay.id },
        data: {
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              description: task.description,
              status: task.status,
            })),
          },
        },
        include: {
          tasks: true,
        },
      });

      return res.status(200).json(updatedWorkDay);
    } else {
      // Jeśli dzień pracy nie istnieje, utwórz nowy dzień pracy z zadaniami
      const newWorkDay = await prisma.workLog.create({
        data: {
          profile: { connect: { id: profileId } },
          date: workDate,
          status: 'Obecny',
          tasks: {
            create: tasks.map((task) => ({
              title: task.title,
              description: task.description,
              status: task.status,
            })),
          },
        },
        include: {
          tasks: true,
        },
      });

      return res.status(201).json(newWorkDay);
    }
  } catch (error) {
    console.error('Błąd podczas tworzenia dnia pracy:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia dnia pracy.', details: error.message });
  }
};
















// Kontroler do pobierania zadań dla danego pracownika
export const getTasksForEmployee = async (req, res) => {
  try {
    // Pobieramy id pracownika z parametrów żądania
    const { id } = req.params;

    // Sprawdzamy, czy pracownik istnieje w bazie danych
    const employee = await prisma.profile.findUnique({
      where: { id: parseInt(id) },
    });

    // Jeśli pracownik nie istnieje, zwracamy błąd 404
    if (!employee) {
      return res.status(404).json({ error: 'Pracownik nie istnieje.' });
    }

    // Pobieramy z bazy danych zadania dla danego pracownika
    const tasks = await prisma.task.findMany({
      where: { workLogs: { some: { profileId: parseInt(id) } } },
    });

    // Zwracamy zadania w odpowiedzi
    return res.status(200).json(tasks);
  } catch (error) {
    console.error('Błąd podczas pobierania zadań dla pracownika:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zadań.', details: error.message });
  }
};

















export const getTasksForProfileAndDate = async (req, res) => {
  try {
    const { profileId } = req.params;
    const { date } = req.query;

    const tasksForProfileAndDate = await prisma.profile.findUnique({
      where: { id: parseInt(profileId) },
      include: {
        workLogs: {
          where: { date: new Date(date) },
          include: {
            tasks: true,
          },
        },
      },
    });

    if (!tasksForProfileAndDate) {
      return res.status(404).json({ error: "Nie znaleziono profilu lub zadań dla podanych parametrów." });
    }

    return res.json(tasksForProfileAndDate.workLogs);
  } catch (error) {
    console.error("Błąd podczas pobierania zadań:", error);
    return res.status(500).json({ error: "Wystąpił błąd podczas pobierania zadań." });
  }
};
