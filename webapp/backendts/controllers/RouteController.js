import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

// controllers/RouteController.js





export const connectProfileToTrail = async (req, res) => {
  const { profileId, trailId } = req.body;

  try {
    const profile = await prisma.profile.findUnique({
      where: { id: profileId }
    });

    const trail = await prisma.trail.findUnique({
      where: { id: trailId }
    });

    if (!profile || !trail) {
      return res.status(404).json({ error: 'Profil lub trasa nie istnieje.' });
    }

    await prisma.$executeRaw`
      INSERT INTO _profiletotrail (a, b)
      VALUES (${profileId}, ${trailId})
    `;

    return res.status(200).json({ message: 'Przypisanie zakończone pomyślnie.' });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas przypisywania profilu do trasy.' });
  }
};


export const addCheckpoint = async (req, res) => {
  const { checkpointName, order, googleMapsAddress, description, city, houseNumber, postCode, street } = req.body;

  // Upewnij się, że "order" jest rzeczywiście liczbą całkowitą
  const orderInt = parseInt(order);

  if (isNaN(orderInt)) {
    return res.status(400).json({ error: "Nieprawidłowy numer punktu." });
  }

  try {
    const checkpoint = await prisma.checkpoint.create({
      data: {
        checkpointName,
        order: orderInt, // Użyj rzutowanej wartości "orderInt"
        googleMapsAddress,
        description,
        city,
        houseNumber,
        postCode,
        street
      }
    });

    return res.status(200).json({ message: 'Punkt kontrolny dodany pomyślnie.', checkpoint });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas dodawania punktu kontrolnego.' });
  }
};











// ROUTES



export const addTrail = async (req, res) => {
  const { name, description, categoryId } = req.body;

  try {
    const trail = await prisma.trail.create({
      data: {
        name,
        description,
        categoryId
      }
    });

    res.status(201).json({
      success: true,
      message: 'Trasa została dodana pomyślnie.',
      trail
    });
  } catch (error) {
    console.error('Błąd:', error);
    res.status(500).json({
      success: false,
      error: 'Wystąpił błąd podczas dodawania trasy.'
    });
  }
};




// Category



export const addCategory = async (req, res) => {
  const { name, description } = req.body;

  try {
    const category = await prisma.category.create({
      data: {
        name,
        description
      }
    });

    return res.status(201).json({ message: 'Kategoria trasy dodana pomyślnie.', category });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas dodawania kategorii trasy.' });
  }
};

// Pobieranie wszystkich kategorii tras
export const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania kategorii tras.' });
  }
};



export const getTrails = async (req, res) => {
  try {
    const trails = await prisma.trail.findMany({
      include: {
        category: true,
        checkpointToTrails: {
          include: {
            checkpoint: true,
          },
        },
      },
    });

    res.json(trails);
  } catch (error) {
    console.error("Błąd podczas pobierania tras:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas pobierania tras." });
  }
};

    






// Importuj PrismaClient i inne potrzebne moduły

export const getPointsCountForRoute = async (req, res) => {
  const { id } = req.params;

  try {
    const pointsCount = await prisma.checkpointToTrail.count({
      where: {
        trailId: parseInt(id),
      },
    });

    return res.status(200).json({ pointsCount });
  } catch (error) {
    console.error("Błąd:", error);
    return res
      .status(500)
      .json({ error: "Wystąpił błąd podczas zliczania punktów." });
  }
};


export const addCheckpointToTrail = async (req, res) => {
  const { trailId, checkpointIds } = req.body;

  try {
    // Sprawdź czy trasa istnieje
    const trail = await prisma.trail.findUnique({
      where: { id: trailId },
    });

    if (!trail) {
      return res.status(404).json({ error: 'Trasa nie istnieje.' });
    }

    const checkpointsToAdd = [];
    const existingCheckpoints = [];

    // Sprawdź, które punkty kontrolne istnieją i które są do dodania
    for (const checkpointId of checkpointIds) {
      const existingCheckpoint = await prisma.checkpointToTrail.findFirst({
        where: { trailId, checkpointId },
      });

      if (existingCheckpoint) {
        existingCheckpoints.push(existingCheckpoint);
      } else {
        checkpointsToAdd.push(checkpointId);
      }
    }

    // Dodaj powiązania punktów kontrolnych z trasą
    for (const checkpointId of checkpointsToAdd) {
      await prisma.checkpointToTrail.create({
        data: {
          checkpoint: { connect: { id: checkpointId } },
          trail: { connect: { id: trailId } },
        },
      });
    }

    const messages = [];

    for (const existingCheckpoint of existingCheckpoints) {
      messages.push(
        `Punkt kontrolny o ID ${existingCheckpoint.checkpointId} już istnieje w trasie.`
      );
    }

    return res.status(200).json({
      message: 'Operacja zakończona sukcesem.',
      skippedCheckpoints: messages,
    });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas dodawania punktów do trasy.' });
  }
};






export const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });

    if (!category) {
      return res.status(404).json({ error: "Kategoria nie istnieje." });
    }

    await prisma.category.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Kategoria została usunięta pomyślnie." });
  } catch (error) {
    console.error("Błąd:", error);
    return res
      .status(500)
      .json({ error: "Wystąpił błąd podczas usuwania kategorii." });
  }
};
export const deleteTrail = async (req, res) => {
  const { id } = req.params;

  try {
    const trail = await prisma.trail.findUnique({
      where: { id: parseInt(id) },
    });

    if (!trail) {
      return res.status(404).json({ error: "Trasa nie istnieje." });
    }

    // Usuń powiązania punktów kontrolnych z trasą
    await prisma.checkpointToTrail.deleteMany({
      where: { trailId: parseInt(id) },
    });

    // Usuń trasę
    await prisma.trail.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: "Trasa została usunięta pomyślnie." });
  } catch (error) {
    console.error("Błąd:", error);
    return res
      .status(500)
      .json({ error: "Wystąpił błąd podczas usuwania trasy." });
  }
};


export const getAllPoints = async (req, res) => {
  try {
    const points = await prisma.checkpoint.findMany();
    return res.status(200).json(points);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).json({ error: "Wystąpił błąd podczas pobierania punktów." });
  }
};
export const getAvailableCheckpoints = async (req, res) => {
  const { trailId } = req.params;

  try {
    // Pobierz punkty kontrolne, które nie zostały jeszcze przypisane do trasy (do dostępnych punktów)
    const availableCheckpoints = await prisma.checkpoint.findMany({
      where: {
        NOT: {
          checkpointToTrails: {
            some: {
              trailId: parseInt(trailId),
            },
          },
        },
      },
    });

    return res.status(200).json(availableCheckpoints);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).json({
      error: "Wystąpił błąd podczas pobierania dostępnych punktów kontrolnych.",
    });
  }
};



// Kontroler z dynamicznym trailId
export const getExistingCheckpoints = async (req, res) => {
  const { trailId } = req.params;

  console.log("Przekazany trailId:", trailId);

  if (!trailId || !/^\d+$/.test(trailId)) {
    return res.status(400).json({ error: "Nieprawidłowy identyfikator trasy." });
  }

  try {
    const existingCheckpoints = await prisma.checkpoint.findMany({
      where: {
        checkpointToTrails: {
          some: {
            trailId: parseInt(trailId), // Użyj trailId jako liczby całkowitej
          },
        },
      },
    });

    console.log("Istniejące punkty kontrolne:", existingCheckpoints);

    return res.status(200).json(existingCheckpoints);
  } catch (error) {
    console.error("Błąd:", error);
    return res.status(500).json({
      error: "Wystąpił błąd podczas pobierania istniejących punktów kontrolnych.",
    });
  }
};



export const removeCheckpointFromTrail = async (req, res) => {
  const { trailId } = req.params; // Zmieniono to na req.params.trailId
  const { checkpointIds } = req.body;
  const parsedTrailId = parseInt(trailId, 10);
  try {
    // Sprawdź, czy trasa istnieje
    console.log('Znaleziona trasa przed:', trailId);
    const trail = await prisma.trail.findUnique({
      where:  { id: parsedTrailId  }
    });
    console.log('Znaleziona trasa:', trail); // Dodaj ten wiersz

    if (!trail) {
      return res.status(404).json({ error: 'Trasa nie istnieje.' });
    }

    // Sprawdź, czy punkty kontrolne istnieją
    const existingCheckpoints = await prisma.checkpoint.findMany({
      where: {
        id: {
          in: checkpointIds,
        },
      },
    });
    console.log('Istniejące punkty kontrolne:', existingCheckpoints); // Dodaj ten wiersz

    if (existingCheckpoints.length !== checkpointIds.length) {
      const nonExistingCheckpointIds = checkpointIds.filter(
        (id) => !existingCheckpoints.map((checkpoint) => checkpoint.id).includes(id)
      );
      console.log('Nieistniejące punkty kontrolne:', nonExistingCheckpointIds); // Dodaj ten wiersz
      return res.status(404).json({
        error: 'Niektóre punkty kontrolne nie istnieją.',
        nonExistingCheckpointIds,
      });
    }

    // Usuń powiązania punktów kontrolnych z trasą
    for (const checkpointId of checkpointIds) {
      await prisma.checkpointToTrail.deleteMany({
        where: {
          checkpointId,
          trailId:parsedTrailId,
        },
      });
    }

    return res.status(200).json({ message: 'Punkty kontrolne usunięte z trasy pomyślnie.' });
  } catch (error) {
    console.error('Błąd:', error);
    return res
      .status(500)
      .json({ error: 'Wystąpił błąd podczas usuwania punktów z trasy.' });
  }
};


