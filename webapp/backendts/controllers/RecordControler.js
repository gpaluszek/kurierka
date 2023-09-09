import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createRecord = async (req, res) => {
  const { userId, date, status, routeName } = req.body;

  try {
    // Sprawdzenie czy użytkownik istnieje
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });
    }

    // Tworzenie rekordu
    const record = await prisma.record.create({
      data: {
        date,
        status,
        profile: {
          connect: { userId },
        },
      },
    });

    // Sprawdzenie czy rekord trasy już istnieje dla danego dnia
    const existingRoute = await prisma.recordRout.findFirst({
      where: {
        AND: [
          { recordId: record.id },
          { nazwa: routeName }
        ],
      },
    });

    if (!existingRoute) {
      // Tworzenie trasy tylko jeśli jeszcze nie istnieje
      const route = await prisma.recordRout.create({
        data: {
          nazwa: routeName,
          record: {
            connect: { id: record.id },
          },
        },
      });
    }

    return res.status(200).json({ message: 'Rekord utworzony pomyślnie.', record });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas tworzenia rekordu.' });
  }
};
export const getRecordsByUserId = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: {
          include: {
            records: {
              include: {
                recordRout: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({ error: 'Użytkownik nie znaleziony.' });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania ewidencji użytkownika.' });
  }
};
