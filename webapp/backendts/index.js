import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client"; // Importuj klienta Prisma
import UserRoute from "./routes/UserRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import ContractRoute from "./routes/ContractRoute.js";
import RoutesRoute from "./routes/RoutesRoute.js";
import RecordRout from "./routes/RecordRoute.js";
import ImageRoute from "./routes/ImageRoute.js";
import CountRoute from "./routes/CountRoute.js";
import CommuniqueRoute from "./routes/CommuniqueRoute.js";
import WorkLogRoute from "./routes/WorkLogRoute.js";

dotenv.config();

const app = express();

app.use(express.json());

// Inicjalizacja klienta Prisma
const prisma = new PrismaClient();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      secure: "auto",
    },
  })
);

app.get('/test', (req, res) => {
  if (req.session.userId) {
    res.send(`Sesja jest aktywna dla użytkownika o ID: ${req.session.userId}`);
  } else {
    res.status(401).send('Brak aktywnej sesji');
  }
});

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(AuthRoute);
app.use(UserRoute);
app.use(ContractRoute);
app.use(RoutesRoute);
app.use(RecordRout);
app.use(ImageRoute);
app.use(CountRoute);
app.use(CommuniqueRoute);
app.use(WorkLogRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});

app.get("/", (req, res) => {
  res.send("Witaj w aplikacji!");
});
