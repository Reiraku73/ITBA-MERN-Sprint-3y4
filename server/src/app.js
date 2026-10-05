import express from "express";
import cors from "cors";
import logger from "./middleware/logger.js";
import router from "./routes/products.js";
import opinionesRouter from './routes/opinions.js';
import notFound from "./middleware/notFound.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(cors());
app.use(logger);

// Límite explícito para el cuerpo de las peticiones
app.use(express.json({ limit: '100kb' }));

// Rutas de la API
app.use('/api/productos', router);
app.use('/api/opiniones', opinionesRouter);

// Manejo de errores y rutas no encontradas (siempre al final)
app.use(notFound);
app.use(errorHandler);

export default app;