import express from "express"
import cors from "cors"
import logger from "./middleware/logger.js"
import router from "./routes/products.js"
import notFound from "./middleware/notFound.js"
import errorHandler from "./middleware/errorHandler.js"

const app = express()

app.use(cors())
app.use(logger)
// Límite explícito: ninguna ruta de esta API necesita cuerpos grandes.
app.use(express.json({ limit: '100kb' }));
app.use('/api/productos', router)
app.use(notFound)
app.use(errorHandler)

export default app