import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images/routes');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

export const addImage = upload.single('image');

export const saveImageToDatabase = async (req, res) => {
  const { filename } = req.file;

  try {
    const image = await prisma.checkpointImage.create({
      data: {
        imageUrl: filename,
        checkpoint: {
          connect: { id: req.body.checkpointId },
        },
      },
    });

    return res.status(200).json({ message: 'Plik graficzny dodany pomyślnie.', image });
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas dodawania pliku graficznego.' });
  }
};

export const getImages = async (req, res) => {
  try {
    const images = await prisma.checkpointImage.findMany();
    return res.status(200).json(images);
  } catch (error) {
    console.error('Błąd:', error);
    return res.status(500).json({ error: 'Wystąpił błąd podczas pobierania obrazów.' });
  }
};
