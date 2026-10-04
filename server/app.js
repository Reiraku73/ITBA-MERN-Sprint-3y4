import express from "express"
import cors from "cors"
import logger from "./middleware/logger.js"
import router from "./routes/products.js"

const app = express()

app.use(cors())
app.use(logger)
app.use(express.json());
app.use('/api/productos', router)

export default app