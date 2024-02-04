import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'; // Dodaj import biblioteki jsonwebtoken
import moment from 'moment';
const prisma = new PrismaClient();

export const Login = async (req, res) => {
  console.log('Próba logowania użytkownika:', req.body.email);

  const user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });

  if (!user) {
    console.log('Użytkownik nie został znaleziony');
    return res.status(404).json({ msg: 'Użytkownik nie został znaleziony' });
  }

  const match = await argon2.verify(user.password, req.body.password);
  if (!match) {
    console.log('Błędne hasło');
    return res.status(400).json({ msg: 'Błędne hasło' });
  }

  req.session.userId = user.id;
  await req.session.save();

  const uid = user.id;
  const name = user.name;
  const surname = user.surname;
  const email = user.email;
  const role = user.role;

  console.log('Pomyślnie zalogowano:', email);
  console.log('Session ID:', req.sessionID);

  // Zwróć identyfikator sesji w treści odpowiedzi JSON
  res.status(200).json({ uid, name, surname, email, role, sessionId: req.sessionID });

};




export const Me = async (req, res) => {
  console.log('ID sesji przekazywane do endpointa /me:', req.sessionID);
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Proszę zalogować się na swoje konto!" });
    }
  
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.userId,
      },
      include: {
        profile: {
          include: {
            contracts: true,
          },
        },
      },
    });
  
    if (!user) {
      return res.status(404).json({ msg: "Użytkownik nie został znaleziony" });
    }
  

  
    res.status(200).json(user);
  };
  
  


export const logOut = (req, res) => {
    req.session.destroy((err)=>{
        if(err) return res.status(400).json({msg: "Nie można się wylogować"});
        res.status(200).json({msg: "Zostałeś wylogowany"});
    });
}


export const changePassword = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Proszę zalogować się na swoje konto!" });
  }

  const { currentPassword, newPassword } = req.body;
  const userId = req.session.userId;

  // Pobierz użytkownika z bazy danych
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "Użytkownik nie został znaleziony" });
  }

  // Sprawdź, czy podane aktualne hasło jest poprawne
  const isPasswordValid = await argon2.verify(user.password, currentPassword);

  if (!isPasswordValid) {
    return res.status(400).json({ msg: "Błędne aktualne hasło" });
  }

  // Zaszyfruj nowe hasło przed zapisem
  const hashedPassword = await argon2.hash(newPassword);

  // Zaktualizuj hasło użytkownika w bazie danych
  await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      password: hashedPassword,
    },
  });

  res.status(200).json({ msg: "Hasło zostało zmienione pomyślnie" });
};


export const getUserContracts = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Proszę zalogować się na swoje konto!" });
  }

  const userId = req.session.userId;

  // Pobierz kontrakty użytkownika z bazy danych
  const contracts = await prisma.contract.findMany({
    where: {
      profileId: userId,
    },
  });

  res.status(200).json(contracts);
};














////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////



export const getTasksForToday = async (req, res) => {
  try {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Proszę zalogować się na swoje konto!" });
    }

    const userId = req.session.userId;

    // Pobierz zadania na dzisiaj dla danego użytkownika
    const todayStart = moment().startOf('day').toDate(); // Początek dnia w strefie czasowej serwera
    const todayEnd = moment().endOf('day').toDate();     // Koniec dnia w strefie czasowej serwera

    const tasksForToday = await prisma.task.findMany({
      where: {
        workLogs: {
          some: {
            date: {
              gte: todayStart, // Zakłada, że todayStart to pełna data i czas początku dnia
            },
            profileId: userId,
          },
        },
      },
    });
    

    return res.status(200).json(tasksForToday);
  } catch (error) {
    console.error('Błąd podczas pobierania zadań:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zadań' });
  }
};






export const CheckSession = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Brak zalogowanego użytkownika" });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: req.session.userId,
    },
  });

  if (!user) {
    return res.status(404).json({ msg: "Użytkownik nie został znaleziony" });
  }

  const uid = user.id;
  const name = user.name;
  const email = user.email;
  const role = user.role;

  res.status(200).json({ uid, name, email, role });
};