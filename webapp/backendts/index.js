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
import XLSXRoute from "./routes/XLSXRoute.js";

dotenv.config();
// const cors = require('cors');
const app = express();
const API_BASE_URL = 'http://<adres_IP_maszyny_hostującej>:5000';


app.use(express.json());

// app.use(cors({ origin: 'http://localhost:19006', credentials: true, }));
// app.use(cors({ origin: "*", credentials: true }));
// app.use(cors({ credentials: true }));
// app.use(cors({ origin: '*', credentials: true }));
// app.use(cors({ origin: "http://localhost:19006", credentials: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));


// Inicjalizacja klienta Prisma
const prisma = new PrismaClient();

app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    // saveUninitialized: false,
    cookie: {
      secure: "auto",
      // secure: "false",
    },
  })
);
// app.use((req, res, next) => {
//   console.log("Session ID:", req.sessionID);
//   console.log("Session Data:", req.session);
//   next();
// });


app.get('/test', (req, res) => {
  if (req.session.userId) {
    res.send(`Sesja jest aktywna dla użytkownika o ID: ${req.session.userId}`);
  } else {
    res.status(401).send('Brak aktywnej sesji');
  }
});

app.use(AuthRoute);
app.use(UserRoute);
app.use(ContractRoute);
app.use(RoutesRoute);
app.use(RecordRout);
app.use(ImageRoute);
app.use(CountRoute);
app.use(CommuniqueRoute);
app.use(WorkLogRoute);
app.use(XLSXRoute);

app.listen(process.env.APP_PORT, () => {
  console.log("Server up and running...");
});

app.get("/", (req, res) => {
  res.send("Witaj w aplikacji!");
});
