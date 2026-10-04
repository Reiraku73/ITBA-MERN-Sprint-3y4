// Se registra DESPUÉS de todas las rutas: si ninguna respondió, la ruta no existe.
export default function notFound(req, res) {
  res.status(404).json({
    data: null,
    error: { message: `Ruta no encontrada: ${req.originalUrl}`, code: 'NOT_FOUND' },
  });
}
