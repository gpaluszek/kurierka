import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import argon2 from "argon2";

export const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany({
        
        include: {
            profile: {
                include: {
                    contracts: true
                }
            }
            
                
            
        }
      });
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  };
  
  export const getUserById = async (req, res) => {
    const uid = parseInt(req.params.id);
    try {
      const response = await prisma.user.findUnique({
        where: {
          id: uid,
        },
        select: {
          id: true,
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
          profile: {
            include: {
              contracts: true,
            },
          },
        },
      });
      res.status(200).json(response);
    } catch (error) {
      console.log(error); // <- dodaj to wywołanie, aby wyświetlić błąd w konsoli
      res.status(500).json({ msg: error.message });
    }
  };
  

export const createUser = async (req, res) => {
 
  const {
    name,
    surname,
    street,
    houseNumber,
    city,
    postCode,
    sex,
    phoneNumber,
    email,
    role,
    password,
    confPassword,
  } = req.body;
  const status = Boolean(req.body.status);
  const existingUser = await prisma.user.findUnique({
    where: {
      email: email
    }
  });
  
  if (existingUser) {
    return res.status(400).json({ msg: "Konto z takim adresem email już istnieje" });
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Hasło i potwierdzenie hasła nie pasują do siebie" });

  const hashPassword = await argon2.hash(password);

  try {
    await prisma.user.create({
      data: {
        name,
        surname,
        street,
        houseNumber,
        city,
        postCode,
        sex,
        phoneNumber,
        email,
        role,
        status,
        password: hashPassword,
      },

    });

    res.status(201).json({ msg: "Rejestracja zakończona powodzeniem" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const uid = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  if (!user) return res.status(404).json({ msg: "Nie znaleziono użytkownika" });
  const {
    name,
    surname,
    street,
    houseNumber,
    city,
    postCode,
    sex,
    phoneNumber,
    email,
    role,
    status,
    password,
    confPassword,
  } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "Hasło i potwierdzenie hasła nie pasują do siebie" });
  try {
    await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        name: name,
        surname: surname,
        street: street,
        houseNumber: houseNumber,
        city: city,
        postCode: postCode,
        sex: sex,
        phoneNumber: phoneNumber,
        email: email,
        role: role,
        status: {
          set: status,
        },
        password: hashPassword,
      },
    });
    res.status(200).json({ msg: "Użytkownik zaktualizowany" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const uid = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  if (!user) return res.status(404).json({ msg: "Nie znaleziono użytkownika" });
  try {
    await prisma.user.delete({
      where: {
        id: uid,
      },
    });
    res.status(200).json({ msg: "Użytkownik usunięty" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

// update status true or false id uzytkownika
export const updateUserStatus = async (req, res) => {
  const uid = parseInt(req.params.id);
  const user = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });
  if (!user) return res.status(404).json({ msg: "Nie znaleziono użytkownika" });
  const { status } = req.body;
  try {
    await prisma.user.update({
      where: {
        id: uid,
      },
      data: {
        status,
      },
    });
    res.status(200).json({ msg: "Użytkownik zaktualizowany" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
