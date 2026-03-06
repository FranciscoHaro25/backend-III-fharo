import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import { dirname } from "path";
import { fileURLToPath } from "url";

import usersRouter from "./routes/users.router.js";
import petsRouter from "./routes/pets.router.js";
import adoptionsRouter from "./routes/adoption.router.js";
import sessionsRouter from "./routes/sessions.router.js";
import mocksRouter from "./routes/mocks.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error conectando a MongoDB:", err));

// swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Adoptme API",
      description: "Documentacion de la API de adopciones",
      version: "1.0.0",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

app.use("/api/users", usersRouter);
app.use("/api/pets", petsRouter);
app.use("/api/adoptions", adoptionsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocks", mocksRouter);

// para que no levante el server cuando corro los tests
if (process.argv[1].includes("app.js")) {
  app.listen(PORT, () => console.log(`Listening on ${PORT}`));
}

export default app;
