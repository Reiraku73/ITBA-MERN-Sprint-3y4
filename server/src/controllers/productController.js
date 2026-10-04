import { productos } from '../data/productos.js'
import { ApiError } from '../middleware/errorHandler.js'

export function getProductos (req, res) {
    res.status(200).json(productos)
}

export function getProducto(req, res) {
    const { id } = req.params;

    const producto = productos.find((producto) => producto.id === id);
    // El 404 sale por el manejador de errores central, así tiene el mismo
    // formato { data: null, error: { message, code } } que cualquier otro error.
    if (!producto) throw new ApiError(404, "No hay productos con ese ID");

    res.json({ data: producto, error: null });
}
