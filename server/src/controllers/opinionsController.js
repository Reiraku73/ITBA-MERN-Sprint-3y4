import { opiniones } from '../data/opiniones.js'

export const getOpiniones = (req, res) => {
  res.json(opiniones)
}
