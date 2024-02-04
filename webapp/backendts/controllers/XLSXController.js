import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addDataToDatabaseXLSX = async (req, res) => {
  try {
    const { excelData } = req.body;

    for (let i = 1; i < excelData.length; i++) {
      let [postCode, city, address, oldRoute, newRoute] = excelData[i];

      // Sprawdź, czy mamy tylko 4 kolumny
      if (!newRoute) {
        // Przypisz nową trasę jako ostatnią kolumnę
        newRoute = oldRoute;
        oldRoute = undefined; // Opcjonalnie można to ustawić na undefined lub inną wartość
      }

      // Sprawdź istnienie punktu kontrolnego po nazwie
      const existingCheckpoint = await prisma.checkpoint.findFirst({
        where: { checkpointName: address.toLowerCase() },
      });

      if (!existingCheckpoint) {
        // Sprawdź istnienie trasy
        const existingTrail = await prisma.trail.findFirst({
          where: { name: newRoute.toLowerCase() },
        });

        if (!existingTrail) {
          // Dodaj trasę, jeśli nie istnieje
          await prisma.trail.create({
            data: {
              name: newRoute.toLowerCase(),
              description: "Dodaj tu opis swojej trasy",
              // Dodaj inne pola trasy, jeśli są
            },
          });
        }

        // Dodaj checkpoint z informacjami
        await prisma.checkpoint.create({
          data: {
            checkpointName: address.toLowerCase(), // Adres jako nazwa punktu kontrolnego
            postCode: postCode,
            city: city.toLowerCase(),
            order: 1,
            googleMapsAddress: "YourGoogleMapsAddress",
            description: "Dodaj tu opis swojego punktu kontrolnego",
            street: "YourStreet",
            houseNumber: "YourHouseNumber",
          },
        });

        // Dodaj ręcznie relację checkpointToTrails
        const checkpoint = await prisma.checkpoint.findFirst({
          where: { checkpointName: address.toLowerCase() },
        });

        const trail = await prisma.trail.findFirst({
          where: { name: newRoute.toLowerCase() },
        });

        if (checkpoint && trail) {
          // Sprawdź, czy taka relacja już nie istnieje
          const existingRelation = await prisma.checkpointToTrail.findFirst({
            where: {
              checkpointId: checkpoint.id,
              trailId: trail.id,
            },
          });

          if (!existingRelation) {
            // Dodaj relację
            await prisma.checkpointToTrail.create({
              data: {
                checkpointId: checkpoint.id,
                trailId: trail.id,
              },
            });
          }
        }
      }
    }

    res.status(200).json({ message: 'Dane zostały dodane do bazy danych.' });
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas dodawania danych do bazy danych." });
  }
};
