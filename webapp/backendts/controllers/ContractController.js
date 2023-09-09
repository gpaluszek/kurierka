import {PrismaClient} from "@prisma/client";
import { DateTime } from 'luxon';
const prisma = new PrismaClient();



export const createContractGlobal = async (req, res) => {
  const { startContract, endContract, position, typeContract} = req.body;
  const employeeId = parseInt(req.params.employeeId); // Upewnij się, że to employeeId

  try {
      const startContractDate = DateTime.fromFormat(startContract, "dd.MM.yyyy").toISO();
      const endContractDate = DateTime.fromFormat(endContract, "dd.MM.yyyy").toISO();

      let profile = await prisma.profile.findUnique({
          where: { userId: employeeId }
      });

      // Jeśli profil nie istnieje, utwórz go
      if (!profile) {
          profile = await prisma.profile.create({
              data: {
                  user: { connect: { id: employeeId } }
              }
          });
      }

      // Teraz możesz utworzyć kontrakt
      const contract = await prisma.contract.create({
          data: {
              startContract: startContractDate,
              endContract: endContractDate,
              position: position,
              typeContract: typeContract,
              profile: {
                  connect: { id: profile.id } // Użyj istniejącego lub nowo utworzonego profilu
              }
          },
      });

      console.log("Utworzony kontrakt:", contract);
      res.status(201).json(contract);
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
};



export const deleteContract = async (req, res) => {
  const contractId = parseInt(req.params.contractId);

  try {
      const deletedContract = await prisma.contract.delete({
          where: {
              id: contractId
          }
      });

      console.log("Usunięty kontrakt:", deletedContract);
      res.status(200).json({ msg: "Kontrakt został usunięty" });
  } catch (error) {
      res.status(400).json({ msg: error.message });
  }
};

  
  