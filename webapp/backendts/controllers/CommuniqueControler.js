import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getAllCommuniques = async (req, res) => {
  try {
    const communiques = await prisma.communique.findMany();
    res.status(200).json(communiques);
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania komunikatów:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania komunikatów' });
  }
};

export const getCommuniqueById = async (req, res) => {
  const { id } = req.params;
  try {
    const communique = await prisma.communique.findUnique({
      where: { id: parseInt(id) },
    });
    if (communique) {
      res.status(200).json(communique);
    } else {
      res.status(404).json({ error: 'Komunikat o podanym ID nie został znaleziony' });
    }
  } catch (error) {
    console.error('Wystąpił błąd podczas pobierania komunikatu:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas pobierania komunikatu' });
  }
};

export const createCommunique = async (req, res) => {
  const data = req.body;
  try {
    const communique = await prisma.communique.create({
      data,
    });
    res.status(201).json(communique);
  } catch (error) {
    console.error('Wystąpił błąd podczas dodawania komunikatu:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas dodawania komunikatu' });
  }
};

export const updateCommunique = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const communique = await prisma.communique.update({
      where: { id: parseInt(id) },
      data,
    });
    res.status(200).json(communique);
  } catch (error) {
    console.error('Wystąpił błąd podczas aktualizacji komunikatu:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas aktualizacji komunikatu' });
  }
};

export const deleteCommunique = async (req, res) => {
  const { id } = req.params;
  try {
    const communique = await prisma.communique.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    console.error('Wystąpił błąd podczas usuwania komunikatu:', error);
    res.status(500).json({ error: 'Wystąpił błąd podczas usuwania komunikatu' });
  }
};
