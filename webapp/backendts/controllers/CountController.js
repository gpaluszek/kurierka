import { PrismaClient } from "@prisma/client";



const prisma = new PrismaClient();


export const countRoutes = async (req, res) => {
  try {
    const routesCount = await prisma.trail.count();
    res.status(200).json({ numberOfRoutes: routesCount });
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas zliczania tras." });
  }
};


export const countCheckpoints = async (req, res) => {
  try {
    const checkpointsCount = await prisma.checkpoint.count();
    res.status(200).json({ numberOfCheckpoints: checkpointsCount });
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas zliczania punktów kontrolnych." });
  }
};


export const countEmployees = async (req, res) => {
  try {
    const employeesCount = await prisma.profile.count();
    res.status(200).json({ numberOfEmployees: employeesCount });
  } catch (error) {
    console.error("Błąd:", error);
    res.status(500).json({ error: "Wystąpił błąd podczas zliczania pracowników." });
  }
};
