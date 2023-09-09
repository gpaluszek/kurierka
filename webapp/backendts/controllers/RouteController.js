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
  const { checkpointName, order, latitude, longitude, googleMapsAddress, description } = req.body;

  try {
    const checkpoint = await prisma.checkpoint.create({
      data: {
        checkpointName,
        order,
        latitude,
        longitude,
        googleMapsAddress,
        description,
        
  }});

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
  const { trailId, checkpointId } = req.body;

  try {
    // Sprawdź czy trasa istnieje
    const trail = await prisma.trail.findUnique({
      where: { id: trailId },
    });

    if (!trail) {
      return res.status(404).json({ error: 'Trasa nie istnieje.' });
    }

    // Sprawdź czy punkt kontrolny istnieje
    const checkpoint = await prisma.checkpoint.findUnique({
      where: { id: checkpointId },
    });

    if (!checkpoint) {
      return res.status(404).json({ error: 'Punkt kontrolny nie istnieje.' });
    }

    // Dodaj powiązanie punktu kontrolnego z trasą
    await prisma.checkpointToTrail.create({
      data: {
        checkpoint: { connect: { id: checkpointId } },
        trail: { connect: { id: trailId } },
      },
    });

    return res.status(200).json({ message: 'Punkt kontrolny dodany do trasy pomyślnie.' });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas dodawania punktu do trasy.' });
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