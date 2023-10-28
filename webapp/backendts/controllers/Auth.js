import { PrismaClient } from '@prisma/client';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken'; // Dodaj import biblioteki jsonwebtoken

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
    const email = user.email;
    const role = user.role;
  
    console.log('Pomyślnie zalogowano:', email);
  
    // Wygeneruj token dostępu i zwróć go jako część odpowiedzi

    res.status(200).json({ uid, name, email, role });
  };

export const Me = async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ msg: "Proszę zalogować się na swoje konto!" });
    }
  
    const user = await prisma.user.findUnique({
      select: {
        name: true,
        surname: true,
        street: true,
        houseNumber: true,
        city: true,
        postCode: true,
        sex: true,
        phoneNumber: true,
        email: true,
        role: true,
        status: true,
        password: true,
      },
      where: {
        id: req.session.userId,
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